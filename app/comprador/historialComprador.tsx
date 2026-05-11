import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { ScrollView, Text, View } from "react-native";
import CardPedidoHistorial from "../../components/Comprador/CardPedidoHistorial";
import { useOrders } from "../../context/OrdersContext";

export default function HistorialComprador() {
  const { colors } = useTheme();

  const { historialComprador, removeHistorialComprador } = useOrders();

  const handleEliminar = (id: string | number) => {
    removeHistorialComprador(id);
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
        {historialComprador.length > 0 ? (
          historialComprador.map((item) => {
            const r = item.respuestaSeleccionada;
            if (!r) return null;
            return (
              <CardPedidoHistorial
                key={item.id}
                pedidoId={item.id}
                vendedorNombre={r.vendedorNombre}
                precio={r.precio}
                fechaSeleccion={item.fechaSeleccion ?? ""}
                textoPedido={item.textoPedido}
                notaVendedor={r.nota}
                calificacionDada={item.calificacionVendedor}
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
