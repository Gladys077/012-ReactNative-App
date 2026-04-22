import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { ScrollView, Text } from "react-native";
import type { Pedido } from "../../../types/pedidos";

interface Props {
  pedidos: Pedido[];
}

const PedidosEntregados = ({ pedidos }: Props) => {
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
          No tenés pedidos entregados.
        </Text>
      ) : (
        pedidos.map((p) => (
          <Text key={p.id} style={{ color: colors.textDefault }}>
            {p.compradorNombre} — {p.estadoSistema}
          </Text>
        ))
      )}
    </ScrollView>
  );
};

export default PedidosEntregados;
