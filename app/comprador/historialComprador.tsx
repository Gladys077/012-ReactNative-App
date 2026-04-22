import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { ScrollView, Text, View } from "react-native";
import CardPedidoHistorial from "../../components/Comprador/CardPedidoHistorial";
import { useOrders } from "../../context/OrdersContext";

export default function HistorialComprador() {
  const { colors } = useTheme();

  const { historial, removePedidoHistorial } = useOrders();

  const handleEliminar = (id: string | number) => {
    removePedidoHistorial(id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: Spacing.md,
          paddingTop: Spacing.xl,
          gap: Spacing.lg,
          paddingBottom: Spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {historial.length > 0 ? (
          historial.map((item) => {
            const r = item.respuestaSeleccionada;
            if (!r) return null;
            return (
              <CardPedidoHistorial
                key={item.id}
                id={item.id}
                vendedorNombre={r.vendedorNombre}
                precio={r.precio}
                fechaSeleccion={item.fechaSeleccion ?? ""}
                textoPedido={item.textoPedido}
                notaVendedor={r.nota}
                onEliminar={handleEliminar}
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
            No tenés pedidos en tu historial.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
