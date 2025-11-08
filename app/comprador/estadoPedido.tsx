import CardPedidoEnProceso from "@/components/Comprador/CardPedidoEnProceso";
import CardPedidoPagar from "@/components/Comprador/CardPedidoPagar";
import CardPedidoVerRespuestas from "@/components/Comprador/CardPedidoVerRespuestas";
import CardRespuestaVendedor from "@/components/Comprador/CardRespuestasVendedor";
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useBottomSheetVerPedido } from "@/context/BottomSheetVerPedidoContext";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  Vibration,
  View,
} from "react-native";

const EstadoPedido = () => {
  const { colors } = useTheme();
  const { openBottomSheetVerPedido } = useBottomSheetVerPedido();

  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de datos
    const mockData = [
      {
        id: 1,
        numeroPedido: 2548,
        estado: "En Proceso",
        respuestasRecibidas: 0,
        duracionCronometro: 60,
        textoPedido: `3 paltas (una madura y dos para comer ahora)
        1 kilo de pan casero integral
        1 litro de leche descremada`,
      },
      {
        id: 2,
        numeroPedido: 2552,
        estado: "Ver Respuestas",
        respuestasRecibidas: 2,
        duracionCronometro: 30,
        textoPedido: `Revisión de cañerías del baño. 
Traer soplete y materiales básicos.`,
        respuestas: [
          {
            id: "v1",
            vendedorNombre: "Minimarket Juan",
            rating: 4.0,
            precio: 4500,
            nota: "Puedo ir mañana temprano. El precio no incluye materiales si hubiera que cambiar algo.",
            duracionCronometro: 45,
          },
          {
            id: "v2",
            vendedorNombre: "Tienda María",
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
        estado: "Pagar",
        respuestasRecibidas: 0,
        duracionCronometro: 30,
        textoPedido: `200 Sandwichs de miga de jamón y queso`,
      },
    ];

    setTimeout(() => {
      setPedidos(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // Handlers
  const handleVerPedido = (pedido: any) => {
    openBottomSheetVerPedido({
      numeroPedido: pedido.numeroPedido,
      items: [{ id: "texto", label: pedido.textoPedido }],
    });
  };

  const handleCancelarPedido = (id: number | string) => {
    Vibration.vibrate(300);
    Alert.alert(
      "Cancelar pedido",
      "¿Querés cancelar este pedido?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          style: "destructive",
          onPress: () => confirmarCancelacion(id),
        },
      ],
      { cancelable: true }
    );
  };

  const confirmarCancelacion = (id: number | string) => {
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
    console.log(`Pedido ${id} cancelado correctamente`);
  };

  const handleFinishCronometro = (id: number | string) => {
    console.log(`El cronómetro del pedido ${id} finalizó.`);
  };

  const handleAceptarRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number
  ) => {
    console.log(`Pedido ${pedidoId}: Respuesta ${respuestaId} aceptada`);

    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === pedidoId) {
          const respuestaSeleccionada = pedido.respuestas.find(
            (r: any) => r.id === respuestaId
          );
          return {
            ...pedido,
            estado: "Pagar",
            respuestaSeleccionada,
          };
        }
        return pedido;
      })
    );
  };

  const handleCancelarRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number
  ) => {
    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === pedidoId && pedido.respuestas) {
          return {
            ...pedido,
            respuestas: pedido.respuestas.filter(
              (r: any) => r.id !== respuestaId
            ),
            respuestasRecibidas: pedido.respuestas.length - 1,
          };
        }
        return pedido;
      })
    );
    console.log(`Pedido ${pedidoId}: Respuesta ${respuestaId} cancelada`);
  };

  const handleVerNota = (nota: string) => {
    Alert.alert("Nota del vendedor", nota);
  };

  const handleFinishCronometroRespuesta = (
    pedidoId: number | string,
    respuestaId: string | number
  ) => {
    console.log(
      `Pedido ${pedidoId}: El cronómetro de la respuesta ${respuestaId} finalizó`
    );
  };

  const toggleExpandido = (pedidoId: number | string, valor: boolean) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === pedidoId ? { ...p, expandido: valor } : p))
    );
  };

  if (loading) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <ActivityIndicator size="large" color={colors.brandBuyer} />
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: Spacing.md,
          paddingTop: Spacing.xl,
          gap: Spacing.xxl,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => {
            if (pedido.estado === "Ver Respuestas") {
              return (
                <View
                  key={pedido.id}
                  style={{
                    backgroundColor: colors.cardBg,
                    borderRadius: 12,
                    overflow: "hidden",
                    borderWidth: pedido.expandido ? 1.5 : 0,
                    borderColor: pedido.expandido
                      ? colors.brandBuyer
                      : "transparent",
                  }}
                >
                  <CardPedidoVerRespuestas
                    id={pedido.id}
                    numeroPedido={pedido.numeroPedido}
                    cantidadRespuestas={pedido.respuestas?.length || 0}
                    expandido={pedido.expandido || false}
                    setExpandido={(valor) =>
                      toggleExpandido(pedido.id, valor)
                    }
                    onVerPedido={() => handleVerPedido(pedido)}
                  />

                  {pedido.expandido && (
                    <View
                      style={{
                        paddingHorizontal: Spacing.md,
                        paddingBottom: Spacing.md,
                        gap: Spacing.md,
                      }}
                    >
                      {pedido.respuestas?.map((respuesta: any) => (
                        <CardRespuestaVendedor
                          key={respuesta.id}
                          id={respuesta.id}
                          vendedorNombre={respuesta.vendedorNombre}
                          rating={respuesta.rating}
                          precio={respuesta.precio}
                          nota={respuesta.nota}
                          duracionCronometro={respuesta.duracionCronometro}
                          onAceptar={(respuestaId) =>
                            handleAceptarRespuesta(pedido.id, respuestaId)
                          }
                          onCancelar={(respuestaId) =>
                            handleCancelarRespuesta(pedido.id, respuestaId)
                          }
                          onVerNota={handleVerNota}
                          onFinishCronometro={() =>
                            handleFinishCronometroRespuesta(
                              pedido.id,
                              respuesta.id
                            )
                          }
                        />
                      ))}
                    </View>
                  )}
                </View>
              );
            }

            if (pedido.estado === "Pagar") {
              return (
                <CardPedidoPagar
                  key={pedido.id}
                  id={pedido.id}
                  numeroPedido={pedido.numeroPedido}
                  estadoActual={pedido.estadoActual}
                  onVerPedido={handleVerPedido}
                />
              );
            }

            return (
              <CardPedidoEnProceso
                key={pedido.id}
                id={pedido.id}
                numeroPedido={pedido.numeroPedido}
                estado={pedido.estado}
                respuestasRecibidas={pedido.respuestasRecibidas}
                duracionCronometro={pedido.duracionCronometro}
                onVerPedido={() => handleVerPedido(pedido)}
                onCancelarPedido={() => handleCancelarPedido(pedido.id)}
                onFinishCronometro={() => handleFinishCronometro(pedido.id)}
              />
            );
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
