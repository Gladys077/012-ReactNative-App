import CardPedidoEnProceso from "@/components/Comprador/CardPedidoEnProceso";
import CardPedidoVerRespuestas from "@/components/Comprador/CardPedidoVerRespuestas";
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useBottomSheetVerPedido } from "@/context/BottomSheetVerPedidoContext";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, Vibration, View } from "react-native";

const EstadoPedido = () => {
  const { colors } = useTheme();
  const { openBottomSheetVerPedido } = useBottomSheetVerPedido();

  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: (VER CON LIO) Por ahora simula la carga 
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
        // Array de respuestas para este pedido
        respuestas: [
          {
            id: "v1",
            vendedorNombre: "Minimarket Juan",
            // vendedorAvatar: undefined,
            rating: 4.0,
            precio: 4250,
            nota: "Puedo ir mañana temprano. El precio no incluye materiales si hubiera que cambiar algo.",
            duracionCronometro: 45,
          },
          {
            id: "v2",
            vendedorNombre: "Tienda María",
            rating: 4.5,
            precio: 4245,
            nota: undefined,
            duracionCronometro: 30,
          },
        ],
      },
      {
        id: 3,
        numeroPedido: 2556,
        estado: "En Proceso",
        respuestasRecibidas: 0,
        duracionCronometro: 30,
        textoPedido: `200 Sandwichs de miga de jamón y queso`,
      },
    ];

    setTimeout(() => {
      setPedidos(mockData);
      setLoading(false);
    }, 800); // Simula delay de red
  }, []);

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

  // Handler para cuando el comprador acepta una respuesta
  const handleAceptarRespuesta = (pedidoId: number | string, respuestaId: string | number) => {
    console.log(`Pedido ${pedidoId}: Respuesta ${respuestaId} aceptada`);
    // TODO: Acá irá la lógica para enviar al backend y cambiar el estado del pedido a "Pagar"
  };

  // Handler para cuando el comprador cancela una respuesta específica
  const handleCancelarRespuesta = (pedidoId: number | string, respuestaId: string | number) => {
    setPedidos((prev) =>
      prev.map((pedido) => {
        if (pedido.id === pedidoId && pedido.respuestas) {
          return {
            ...pedido,
            respuestas: pedido.respuestas.filter((r: any) => r.id !== respuestaId),
            respuestasRecibidas: pedido.respuestas.length - 1,
          };
        }
        return pedido;
      })
    );
    console.log(`Pedido ${pedidoId}: Respuesta ${respuestaId} cancelada`);
  };

  // Handler para ver la nota del vendedor (abre bottom sheet)
  const handleVerNota = (nota: string) => {
    // TODO: Crear un bottom sheet específico para mostrar la nota
    Alert.alert("Nota del vendedor", nota); // Temporal, reemplazar con bottom sheet
  };

  // Handler para cuando termina el cronómetro de una respuesta
  const handleFinishCronometroRespuesta = (pedidoId: number | string, respuestaId: string | number) => {
    console.log(`Pedido ${pedidoId}: El cronómetro de la respuesta ${respuestaId} finalizó`);
    // TODO: Eliminar automáticamente esa respuesta
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
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
            // Condicional para renderizar la card correcta según el estado
            if (pedido.estado === "Ver Respuestas") {
              return (
                <CardPedidoVerRespuestas
                  key={pedido.id}
                  id={pedido.id}
                  numeroPedido={pedido.numeroPedido}
                  respuestas={pedido.respuestas || []}
                  onAceptarRespuesta={(respuestaId) => handleAceptarRespuesta(pedido.id, respuestaId)}
                  onCancelarRespuesta={(respuestaId) => handleCancelarRespuesta(pedido.id, respuestaId)}
                  onVerNota={handleVerNota}
                  onFinishCronometro={(respuestaId) => handleFinishCronometroRespuesta(pedido.id, respuestaId)}
                  onVerPedido={() => handleVerPedido(pedido)}
                />
              );
            }

            // Card original para estado "En Proceso"
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