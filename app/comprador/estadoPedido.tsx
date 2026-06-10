import CardPedidoVerRespuestas from "@/components/Comprador/CardPedidoVerRespuestas";
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useBottomSheetVerPedido } from "@/context/BottomSheetVerPedidoContext";
import { useTheme } from "@/context/ThemeContext";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import CardPedidoAResolver from "../../components/Comprador/CardPedidoAResolver";
import CardPedidoCompletado from "../../components/Comprador/CardPedidoCompletado";
import CardPedidoEnCamino from "../../components/Comprador/CardPedidoEnCamino";
import CardPedidoEnPreparacion from "../../components/Comprador/CardPedidoEnPreparacion";
import CardPedidoEnProceso from "../../components/Comprador/CardPedidoEnProceso";
import CardPedidoPagoEnRevision from "../../components/Comprador/CardPedidoPagoEnRevision";
import CardPedidoPagoYDireccion from "../../components/Comprador/CardPedidoPagoYDireccion";
import CardPedidoRecibido from "../../components/Comprador/CardPedidoRecibido";
import BottomSheetIssueSelector from "../../components/subcomponentes/BottomSheetIssueSelector";
import UndoToast from "../../components/subcomponentes/UndoToast";
import { useOrders } from "../../context/OrdersContext";
import { useToast } from "../../context/ToastContext";
import { useUndoToast } from "../../hooks/useUndoToast";
import { estadoSistemaAComprador } from "../../types/pedidos";

const OPCIONES_AYUDA_BUYER = [
  "El pedido no llegó",
  "El pedido llegó incompleto",
  "El producto llegó en mal estado",
  "El vendedor no responde",
];

const EstadoPedido = () => {
  const { colors } = useTheme();
  const { isVisible, openBottomSheetVerPedido, closeBottomSheetVerPedido } =
    useBottomSheetVerPedido();
  const {
    pedidos,
    updateEstado,
    updatePedido,
    moverAHistorialComprador,
    removePedido,
  } = useOrders();
  const { toast, mostrar, cancelar, cerrar } = useUndoToast();
  const [pendienteId, setPendienteId] = useState<string | number | null>(null);
  const [ayudaVisible, setAyudaVisible] = useState(false);
  const { showToast } = useToast();

  useFocusEffect(
    useCallback(() => {
      return () => {
        closeBottomSheetVerPedido();
        setAyudaVisible(false);
      };
    }, [closeBottomSheetVerPedido]),
  );

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
    if (pendienteId !== null) removePedido(pendienteId);
    setPendienteId(id);
    mostrar("Pedido cancelado", () => {
      removePedido(id);
      setPendienteId(null);
    });
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
      estadoSistema: "aceptado_transferencia",
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

  const handleAyudaEnviada = (opcion: string, mensaje?: string) => {
    console.log("Ayuda enviada:", opcion, mensaje);
    setAyudaVisible(false);
    showToast("Tu reclamo fue enviado.");
  };

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
        {pedidos.filter((p) => p.id !== pendienteId).length > 0 ? (
          pedidos
            .filter((p) => p.id !== pendienteId)
            .map((pedido) => {
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
                      ratingCount={r.ratingCount ?? 0}
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
                      onAbrirAyuda={() => setAyudaVisible(true)}
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
                      ratingCount={r.ratingCount ?? 0}
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
                      vendedorNombre={r.vendedorNombre}
                      rating={r.rating}
                      ratingCount={r.ratingCount ?? 0}
                      telefono={r.telefono}
                      direccion={pedido.direccionComprador}
                      onVerPedido={handleVerPedido}
                      onAbrirAyuda={() => setAyudaVisible(true)}
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
                      ratingCount={r.ratingCount ?? 0}
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
                      ratingCount={r.ratingCount ?? 0}
                      telefono={r.telefono}
                      direccion={pedido.direccionComprador}
                      onVerPedido={handleVerPedido}
                      onAbrirAyuda={() => setAyudaVisible(true)}
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
                      ratingCount={r.ratingCount ?? 0}
                      telefono={r.telefono}
                      onVerPedido={handleVerPedido}
                      onEnviarCalificacion={(data) => {
                        updatePedido(pedido.id, {
                          calificacionVendedor: {
                            estrellas: data.estrellas,
                            comentario: data.comentario,
                          },
                          estadoSistema: "completado",
                        });
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
                      onDesaparecer={() => moverAHistorialComprador(pedido.id)}
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
                      onFinishCronometro={() =>
                        handleFinishCronometro(pedido.id)
                      }
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

      <BottomSheetIssueSelector
        isVisible={ayudaVisible}
        role="buyer"
        opciones={OPCIONES_AYUDA_BUYER}
        subtitulo={
          "Primero intenta resolverlo con el vendedor.\n" +
          "Si el problema continúa, selecciona lo ocurrido y revisaremos el caso."
        }
        onEnviar={handleAyudaEnviada}
        onCerrar={() => setAyudaVisible(false)}
      />

      <UndoToast
        visible={toast.visible}
        mensaje={toast.mensaje}
        onCancelar={() => {
          setPendienteId(null);
          cancelar();
        }}
        onCerrar={cerrar}
      />
    </View>
  );
};

export default EstadoPedido;
