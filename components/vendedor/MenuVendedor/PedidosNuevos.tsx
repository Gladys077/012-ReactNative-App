import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { ScrollView, Text } from "react-native";
import type { Pedido } from "../../../types/pedidos";

interface Props {
  pedidos: Pedido[];
}

const PedidosNuevos = ({ pedidos }: Props) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: Spacing.md,
        paddingTop: Spacing.xl,
        gap: Spacing.lg,
        paddingBottom: Spacing.xl,
      }}
      showsVerticalScrollIndicator={false}
    >
      {pedidos.length === 0 ? (
        <Text
          style={{
            color: colors.textMuted,
            fontSize: FontSizes.md,
            textAlign: "center",
            marginTop: Spacing.xl,
          }}
        >
          No tenés pedidos nuevos.
        </Text>
      ) : (
        pedidos.map((p) => (
          <Text key={p.id} style={{ color: colors.textDefault }}>
            {p.compradorNombre} — {p.textoPedido.slice(0, 40)}...
          </Text>
        ))
      )}
    </ScrollView>
  );
};

export default PedidosNuevos;
