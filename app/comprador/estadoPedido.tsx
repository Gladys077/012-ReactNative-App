import CardPedidoEnProceso from "@/components/Comprador/CardPedidoEnProceso";
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

    // Muestra el diálogo nativo
    Alert.alert(
      "Cancelar pedido",
      "¿Querés cancelar este pedido?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          style: "destructive", // color rojo en Android e iOS
          onPress: () => confirmarCancelacion(id),
        },
      ],
      { cancelable: true }
    );
  };

  const confirmarCancelacion = (id: number | string) => {
    // Simulación de cancelación
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
    console.log(`Pedido ${id} cancelado correctamente`);
  };

  const handleFinishCronometro = (id: number | string) => {
    console.log(`El cronómetro del pedido ${id} finalizó.`);
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
          gap: Spacing.xl,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        

        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
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
          ))
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
