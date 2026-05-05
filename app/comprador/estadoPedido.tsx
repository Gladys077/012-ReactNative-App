import CardPedidoVerRespuestas from "@/components/Comprador/CardPedidoVerRespuestas";
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useBottomSheetVerPedido } from "@/context/BottomSheetVerPedidoContext";
import { useTheme } from "@/context/ThemeContext";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import CardPedidoAResolver from "../../components/Comprador/CardPedidoAResolver";
import CardPedidoCompletado from "../../components/Comprador/CardPedidoCompletado";
import CardPedidoEnCamino from "../../components/Comprador/CardPedidoEnCamino";
import CardPedidoEnPreparacion from "../../components/Comprador/CardPedidoEnPreparacion";
import CardPedidoEnProceso from "../../components/Comprador/CardPedidoEnProceso";
import CardPedidoPagoEnRevision from "../../components/Comprador/CardPedidoPagoEnRevision";
import CardPedidoPagoYDireccion from "../../components/Comprador/CardPedidoPagoYDireccion";
import CardPedidoRecibido from "../../components/Comprador/CardPedidoRecibido";
import { useOrders } from "../../context/OrdersContext";
import { estadoSistemaAComprador } from "../../types/pedidos";

const EstadoPedido = () => {
  const { colors } = useTheme();
  const { isVisible, openBottomSheetVerPedido, closeBottomSheetVerPedido } =
    useBottomSheetVerPedido();
  const { pedidos, updateEstado, updatePedido, moverAHistorial } = useOrders();

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Se ejecuta cuando la screen PIERDE el foco (navegás a otra)
        closeBottomSheetVerPedido();
      };
    }, [closeBottomSheetVerPedido]),
  );

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleVerPedido = (id: string | number) => {
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) return;

    if (isVisible) {
      closeBottomSheetVerPedido();
      return;
    }

    openBottomSheetVerPedido({
      fechaSeleccion: pedido.fechaSeleccion,
      items: [{ id: "texto", label: pedido.textoPedido }],
    });
  };

  const handleCancelarPedido = (id: number | string) => {
    // TODO: reemplazar con updateEstado cuando haya estado "cancelado"
    console.log(`Pedido ${id} cancelado`);
  };

  const handleFinishCronometro = (id: number | string) => {
    console.log(`Cronómetro del pedido ${id} finalizado`);
  };

  const handleFinishCronometroRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number,
  ) => {
    console.log(
      `Pedido ${pedidoId}: cronómetro respuesta ${respuestaId} finalizado`,
    );
  };

  const handleAceptarRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number,
  ) => {
    const pedido = pedidos.find((p) => p.id === pedidoId);
    if (!pedido) return;
    const respuestaSeleccionada = pedido.respuestas?.find(
      (r) => r.id === respuestaId,
    );
    updatePedido(pedidoId, {
      estadoSistema: "aceptado_transferencia", // se actualizará cuando se elija forma de pago
      respuestaSeleccionada,
      expandido: true,
      fechaSeleccion: new Date().toISOString(),
    });
  };

  const handleRechazarRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number,
  ) => {
    const pedido = pedidos.find((p) => p.id === pedidoId);
    if (!pedido?.respuestas) return;
    const nuevasRespuestas = pedido.respuestas.filter(
      (r) => r.id !== respuestaId,
    );
    updatePedido(pedidoId, {
      respuestas: nuevasRespuestas,
      respuestasRecibidas: nuevasRespuestas.length,
    });
  };

  const handleVerNota = (nota: string) => {
    Alert.alert("Nota del vendedor", nota);
  };

  const toggleExpandido = (pedidoId: number | string, valor: boolean) => {
    updatePedido(pedidoId, { expandido: valor });
  };

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: Spacing.md,
          paddingTop: Spacing.xl,
          gap: Spacing.xxl,
          paddingBottom: Spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => {
            const estadoComprador =
              estadoSistemaAComprador[pedido.estadoSistema];

            switch (estadoComprador) {
              case "Ver respuestas":
                return (
                  <CardPedidoVerRespuestas
                    key={pedido.id}
                    pedidoId={pedido.id}
                    cantidadRespuestas={pedido.respuestas?.length || 0}
                    estado="Ver respuestas"
                    expandido={pedido.expandido || false}
                    onToggleExpandir={(valor) =>
                      toggleExpandido(pedido.id, valor)
                    }
                    onVerPedido={handleVerPedido}
                    onCancelarPedido={() => handleCancelarPedido(pedido.id)}
                    respuestas={pedido.respuestas}
                    onAceptarRespuesta={handleAceptarRespuesta}
                    onRechazarRespuesta={handleRechazarRespuesta}
                    onVerNota={handleVerNota}
                    onFinishCronometro={handleFinishCronometroRespuesta}
                  />
                );

              case "Pago en revisión": {
                const r = pedido.respuestaSeleccionada;
                if (!r) return null;
                return (
                  <CardPedidoPagoEnRevision
                    key={pedido.id}
                    pedidoId={pedido.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    precio={r.precio}
                    nombreNegocio={r.vendedorNombre}
                    rating={r.rating}
                    alias={r.alias ?? ""}
                    entidad={r.entidad ?? ""}
                    titular={r.titular ?? ""}
                    direccion={pedido.direccionComprador}
                    nota={r.nota}
                    duracionCronometro={r.duracionCronometro}
                    onVerPedido={() => handleVerPedido(pedido.id)}
                    onEditarDireccion={() => console.log("Editar dirección")}
                    onFinishCronometro={handleFinishCronometro}
                    respuestaId={""}
                    timestampRespuesta={0}
                    tieneProblema={false}
                    estado={"Pago y dirección"}
                  />
                );
              }

              case "Pago y dirección": {
                const r = pedido.respuestaSeleccionada;
                if (!r) return null;
                return (
                  <CardPedidoPagoYDireccion
                    key={pedido.id}
                    pedidoId={pedido.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    estado="Pago y dirección"
                    precio={r.precio}
                    nombreNegocio={r.vendedorNombre}
                    rating={r.rating}
                    alias={r.alias ?? ""}
                    entidad={r.entidad ?? ""}
                    titular={r.titular ?? ""}
                    direccion={pedido.direccionComprador}
                    nota={r.nota}
                    duracionCronometro={r.duracionCronometro}
                    onVerPedido={() => handleVerPedido(pedido.id)}
                    onEditarDireccion={() => console.log("Editar dirección")}
                    onFinishCronometro={handleFinishCronometro}
                    respuestaId={""}
                    timestampRespuesta={0}
                    onEnviarDatos={(payload) => {
                      console.log("TODO: enviar al backend", payload);
                      // La forma de pago determina el siguiente estado
                      const siguiente =
                        payload.formaPago === "efectivo"
                          ? "aceptado_efectivo"
                          : "pago_enviado";
                      updateEstado(pedido.id, siguiente);
                    }}
                    onCancelarPedido={() => handleCancelarPedido(pedido.id)}
                  />
                );
              }

              case "En preparación": {
                const r = pedido.respuestaSeleccionada;
                if (!r) return null;
                return (
                  <CardPedidoEnPreparacion
                    key={pedido.id}
                    pedidoId={pedido.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    // fechaConfirmacion={pedido.fechaConfirmacion}
                    vendedorNombre={r.vendedorNombre}
                    rating={r.rating}
                    telefono={r.telefono}
                    direccion={pedido.direccionComprador}
                    onVerPedido={handleVerPedido}
                  />
                );
              }

              case "A resolver": {
                const r = pedido.respuestaSeleccionada;
                if (!r || !pedido.formaPago || !pedido.problemaPago)
                  return null;
                return (
                  <CardPedidoAResolver
                    key={pedido.id}
                    pedidoId={pedido.id}
                    respuestaId={r.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    precio={r.precio}
                    nombreNegocio={r.vendedorNombre}
                    rating={r.rating}
                    alias={r.alias ?? ""}
                    entidad={r.entidad ?? ""}
                    titular={r.titular ?? ""}
                    direccion={pedido.direccionComprador}
                    nota={r.nota}
                    formaPagoInicial={pedido.formaPago}
                    problemaPago={pedido.problemaPago}
                    onVerPedido={() => handleVerPedido(pedido.id)}
                    onVerNota={handleVerNota}
                    onCancelarPedido={() => handleCancelarPedido(pedido.id)}
                    onEnviarCorreccion={(data) => {
                      console.log("TODO: enviar corrección al backend", data);
                      updatePedido(pedido.id, {
                        estadoSistema: "pago_enviado",
                        problemaPago: undefined,
                      });
                    }}
                  />
                );
              }

              case "En camino": {
                const r = pedido.respuestaSeleccionada;
                if (!r) return null;
                return (
                  <CardPedidoEnCamino
                    key={pedido.id}
                    pedidoId={pedido.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    vendedorNombre={r.vendedorNombre}
                    rating={r.rating}
                    telefono={r.telefono}
                    direccion={pedido.direccionComprador}
                    onVerPedido={handleVerPedido}
                  />
                );
              }

              case "Pedido recibido": {
                const r = pedido.respuestaSeleccionada;
                if (!r) return null;
                return (
                  <CardPedidoRecibido
                    key={pedido.id}
                    pedidoId={pedido.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    vendedorNombre={r.vendedorNombre}
                    rating={r.rating}
                    telefono={r.telefono}
                    onVerPedido={handleVerPedido}
                    onEnviarCalificacion={(data) => {
                      console.log("TODO: enviar calificación al backend", data);
                      updateEstado(pedido.id, "completado");
                    }}
                  />
                );
              }

              case "Completado":
                return (
                  <CardPedidoCompletado
                    key={pedido.id}
                    pedidoId={pedido.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    onDesaparecer={() => moverAHistorial(pedido.id)}
                  />
                );

              case "En proceso":
              default:
                return (
                  <CardPedidoEnProceso
                    key={pedido.id}
                    pedidoId={pedido.id}
                    estado="En proceso"
                    respuestasRecibidas={pedido.respuestasRecibidas}
                    duracionCronometro={60}
                    onVerPedido={() => handleVerPedido(pedido.id)}
                    onCancelarPedido={() => handleCancelarPedido(pedido.id)}
                    onFinishCronometro={() => handleFinishCronometro(pedido.id)}
                  />
                );
            }
          })
        ) : (
          <Text
            style={{
              color: colors.textMuted,
              fontSize: FontSizes.md,
              textAlign: "center",
              marginTop: Spacing.xl,
            }}
          >
            No tenés pedidos activos por el momento.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default EstadoPedido;
