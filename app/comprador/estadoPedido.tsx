import CardPedidoVerRespuestas from "@/components/Comprador/CardPedidoVerRespuestas";
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useBottomSheetVerPedido } from "@/context/BottomSheetVerPedidoContext";
import { useTheme } from "@/context/ThemeContext";
import { Pedido } from "@/types/pedidos";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import CardPedidoAResolver from "../../components/Comprador/CardPedidoAResolver";
import CardPedidoCompletado from "../../components/Comprador/CardPedidoCompletado";
import CardPedidoEnCamino from "../../components/Comprador/CardPedidoEnCamino";
import CardPedidoEnPreparacion from "../../components/Comprador/CardPedidoEnPreparacion";
import CardPedidoEnProceso from "../../components/Comprador/CardPedidoEnProceso";
import CardPedidoPagoEnRevision from "../../components/Comprador/CardPedidoPagoEnRevision";
import CardPedidoPagoYDireccion from "../../components/Comprador/CardPedidoPagoYDireccion";
import CardPedidoRecibido from "../../components/Comprador/CardPedidoRecibido";

const EstadoPedido = () => {
  const { colors } = useTheme();
  const { openBottomSheetVerPedido } = useBottomSheetVerPedido();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: VER CON LIO: Implementar fetch real a la API
  // useEffect(() => {
  // SECCIÓN: Fetch real (API)
  //-------------------------
  /*
    const fetchPedidos = async () => {
      try {
        const response = await fetch("https://api.com/pedidos");
        const data: Pedido[] = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      } 
    };

    fetchPedidos();
    */
  // -------------------------
  // FIN FETCH REAL (API)
  //-------------------------

  // ------------ Simulación de datos locales (mock) --------------
  useEffect(() => {
    const mockData: Pedido[] = [
      {
        id: 1,
        numeroPedido: 2548,
        direccionComprador: "Av. San Martín 1024",
        estado: "En proceso",
        respuestasRecibidas: 0,
        duracionCronometro: 60,
        textoPedido: `3 paltas (una madura y dos para comer ahora)
          1 kilo de pan casero integral
          1 litro de leche descremada`,
        fechaSeleccion: new Date().toISOString(),
      },
      {
        id: 2,
        numeroPedido: 2552,
        direccionComprador: "Av. SiempreViva 724",
        estado: "Ver respuestas",
        respuestasRecibidas: 2,
        duracionCronometro: 30,
        textoPedido: `Revisión de cañerías del baño. Traer soplete y materiales básicos.`,
        fechaSeleccion: new Date().toISOString(),
        respuestas: [
          {
            id: "v1",
            vendedorNombre: "Plomería Juan",
            alias: "plomerojuan",
            entidad: "Mercado Pago",
            titular: "Juan Pérez",
            rating: 4.0,
            precio: 4500,
            nota: "Puedo ir mañana temprano. El precio no incluye materiales si hubiera que cambiar algo.",
            duracionCronometro: 45,
          },
          {
            id: "v2",
            vendedorNombre: "Tienda María",
            alias: "TIENDAMARIA",
            entidad: "Mercado Pago",
            titular: "María Rodriguez",
            rating: 4.5,
            precio: 4250,
            nota: undefined,
            duracionCronometro: 30,
          },
        ],
        expandido: false,
      },
      {
        id: 3,
        numeroPedido: 2556,
        direccionComprador: "Calle 1, nro 933",
        estado: "Pago y dirección",
        respuestasRecibidas: 0,
        duracionCronometro: 30,
        textoPedido: `200 Sandwichs de miga de jamón y queso`,
        fechaSeleccion: new Date().toISOString(),
        respuestas: [
          {
            id: "v3",
            vendedorNombre: "Minimarket Pedro",
            alias: "SANDWICHERIAEXPRESS",
            entidad: "Mercado Pago",
            titular: "Pedro Pascal",
            rating: 4.8,
            precio: 25000,
            duracionCronometro: 0,
          },
        ],
      },
      {
        id: 4,
        numeroPedido: 2550,
        direccionComprador: "Calle 50, nro 90",
        estado: "En preparación",
        respuestasRecibidas: 0,
        duracionCronometro: 30,
        textoPedido: `200 Sandwichs de miga de jamón y queso`,
        fechaSeleccion: new Date().toISOString(),
        respuestas: [
          {
            id: "v3",
            vendedorNombre: "Minimarket Pedro",
            alias: "SANDWICHERIAEXPRESS",
            entidad: "Mercado Pago",
            titular: "Pedro Pascal",
            rating: 4.8,
            precio: 25000,
            duracionCronometro: 0,
          },
        ],
        respuestaSeleccionada: {
          id: "v3",
          vendedorNombre: "Minimarket Pedro",
          alias: "SANDWICHERIAEXPRESS",
          entidad: "Mercado Pago",
          titular: "Pedro Pascal",
          rating: 4.8,
          precio: 25000,
          duracionCronometro: 0,
        },
      },
      {
        id: 5,
        numeroPedido: 2560,
        direccionComprador: "Av. Corrientes 1234",
        estado: "A resolver",
        formaPago: "transferencia",
        problemaPago: {
          comprobante: true,
          direccion: false,
        },
        respuestasRecibidas: 0,
        textoPedido: "Pedido con problema en el pago",
        fechaSeleccion: new Date().toISOString(),
        respuestaSeleccionada: {
          id: "v5",
          vendedorNombre: "Minimarket Juan",
          alias: "MINIMARKETJUAN",
          entidad: "Mercado Pago",
          titular: "Juan Pérez",
          rating: 4.0,
          precio: 4150,
        },
      },

      {
        id: 6,
        numeroPedido: 2560,
        direccionComprador: "Av. Corrientes 1234",
        estado: "En camino",
        formaPago: "transferencia",
        problemaPago: {
          comprobante: true,
          direccion: false,
        },
        respuestasRecibidas: 0,
        textoPedido: "Pedido con problema en el pago",
        fechaSeleccion: new Date().toISOString(),
        respuestaSeleccionada: {
          id: "v5",
          vendedorNombre: "Minimarket Juan",
          alias: "MINIMARKETJUAN",
          entidad: "Mercado Pago",
          titular: "Juan Pérez",
          rating: 4.0,
          precio: 4150,
        },
      },

      {
        id: 7,
        numeroPedido: 2444,
        direccionComprador: "Av. Corrientes 1234",
        estado: "Pedido recibido",
        formaPago: "transferencia",
        problemaPago: {
          comprobante: true,
          direccion: false,
        },
        respuestasRecibidas: 0,
        textoPedido: "Pedido con problema en el pago",
        fechaSeleccion: new Date().toISOString(),
        respuestaSeleccionada: {
          id: "v5",
          vendedorNombre: "Minimarket Juan",
          alias: "MINIMARKETJUAN",
          entidad: "Mercado Pago",
          titular: "Juan Pérez",
          rating: 4.0,
          precio: 4150,
        },
      },
    ];

    setTimeout(() => {
      setPedidos(mockData);
      setLoading(false);
    }, 800); // Simula delay de red
  }, []);
  // -----------------------fin simulación de datos ------------------------

  // --------> HANDLERS <--------
  const handleVerPedido = (id: string | number) => {
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) return;

    openBottomSheetVerPedido({
      fechaSeleccion: pedido.fechaSeleccion,
      items: [{ id: "texto", label: pedido.textoPedido }],
    });
  };

  // Btn para cancelar el pedido completo (perdería todas las respuestas de los vendedores)
  const handleCancelarPedido = (id: number | string) => {
    //   Vibration.vibrate(300);
    //   Alert.alert(
    //     "Cancelar pedido",
    //     "¿Quieres cancelar este pedido?",
    //     [
    //       { text: "No", style: "cancel" },
    //       {
    //         text: "Sí",
    //         style: "destructive",
    //         onPress: () => confirmarCancelacion(id),
    //       },
    //     ],
    //     { cancelable: true },
    //   );
    // };

    // const confirmarCancelacion = (id: number | string) => {
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
    console.log(`Pedido ${id} cancelado correctamente`);
  };

  // -------> este lo uso con el componente CardPedidoEnProceso
  const handleFinishCronometro = (id: number | string) => {
    console.log(`El cronómetro del pedido ${id} finalizó.`);
  };

  const handleAceptarRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number,
  ) => {
    console.log(`Pedido ${pedidoId}: Respuesta ${respuestaId} aceptada`);

    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === pedidoId) {
          const respuestaSeleccionada = pedido.respuestas?.find(
            (r) => r.id === respuestaId,
          );
          return {
            ...pedido,
            estado: "Pago y dirección",
            respuestaSeleccionada,
            expandido: true, // Expande la card al aceptar una respuesta
            fechaSeleccion: new Date().toISOString(), // <---- LIO lo reemplazará (fecha/hora del momento en el q el comprador elije uno de los presupuestos)
          };
        }
        return pedido;
      }),
    );
  };

  // -------> Handler para cuando el comprador cancela una respuesta específica, dentro de la CardRespuestasVendedor
  const handleRechazarRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number,
  ) => {
    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === pedidoId && pedido.respuestas) {
          const nuevasRespuestas = pedido.respuestas.filter(
            (r) => r.id !== respuestaId,
          );

          return {
            ...pedido,
            respuestas: nuevasRespuestas,
            respuestasRecibidas: nuevasRespuestas.length,
          };
        }
        return pedido;
      }),
    );
    console.log(`Pedido ${pedidoId}: Respuesta ${respuestaId} cancelada`);
    // return updated;
  };

  // Handler para ver la nota del vendedor (abre bottom sheet)
  const handleVerNota = (nota: string) => {
    // TODO: Crear un bottom sheet específico para mostrar la nota o dejo el Alert?
    Alert.alert("Nota del vendedor", nota); // Temporal, reemplazar con bottom sheet
  };

  const handleFinishCronometroRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number,
  ) => {
    console.log(
      `Pedido ${pedidoId}: El cronómetro de la respuesta ${respuestaId} finalizó`,
    );
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.brandBuyer} />
      </View>
    );
  }

  const toggleExpandido = (pedidoId: number | string, valor: boolean) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === pedidoId ? { ...p, expandido: valor } : p)),
    );
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
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => {
            switch (pedido.estado) {
              case "Ver respuestas": {
                return (
                  <CardPedidoVerRespuestas
                    key={pedido.id} // solo para q React identifiq c/elemento dentro de una lista (.map) y optimice el renderizado -no se pasa como prop.
                    pedidoId={pedido.id} // prop del interior del componente
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
              }

              case "Pago y dirección": {
                const r = pedido.respuestaSeleccionada;
                if (!r) return null; // Evita error si aún no hay respuesta seleccionada

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
                      setPedidos((prev) =>
                        prev.map((p) =>
                          p.id === pedido.id
                            ? { ...p, estado: "Pago en revisión" }
                            : p,
                        ),
                      );
                    }}
                    onCancelarPedido={() => handleCancelarPedido(pedido.id)}
                  />
                );
              }

              case "Pago en revisión": {
                const r = pedido.respuestaSeleccionada;
                if (!r) return null; // Evita error si no hay respuesta seleccionada

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

              case "En preparación": {
                const r = pedido.respuestaSeleccionada;
                if (!r) return null;

                return (
                  <CardPedidoEnPreparacion
                    key={pedido.id}
                    pedidoId={pedido.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    fechaConfirmacion={pedido.fechaConfirmacion}
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
                    onCancelarPedido={() => handleCancelarPedido(pedido.id)} // ← agregar
                    onEnviarCorreccion={(data) => {
                      console.log("TODO: enviar corrección al backend", data);
                      // TODO: incluir mensajes cuando Lionel defina el sistema de mensajería
                      setPedidos((prev) =>
                        prev.map((p) =>
                          p.id === pedido.id
                            ? {
                                ...p,
                                estado: "Pago en revisión",
                                problemaPago: undefined,
                              }
                            : p,
                        ),
                      );
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
                      // Transicion a completado
                      setPedidos((prev) =>
                        prev.map((p) =>
                          p.id === pedido.id
                            ? { ...p, estado: "Completado" }
                            : p,
                        ),
                      );
                    }}
                  />
                );
              }

              case "Completado": {
                return (
                  <CardPedidoCompletado
                    key={pedido.id}
                    pedidoId={pedido.id}
                    fechaSeleccion={pedido.fechaSeleccion}
                    onDesaparecer={() =>
                      setPedidos((prev) =>
                        prev.filter((p) => p.id !== pedido.id),
                      )
                    }
                  />
                );
              }

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
