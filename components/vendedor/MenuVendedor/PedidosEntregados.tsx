import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, Text } from "react-native";
import type { Pedido } from "../../../types/pedidos";
import CardEntregado from "../CardsVendedor/CardEntregado";

interface Props {
  pedidos: Pedido[];
  onVerPedido: (id: string | number) => void;
  onVerNota?: (nota: string) => void;
  onCalificar?: () => void;
}

const PedidosEntregados = ({
  pedidos,
  onVerPedido,
  onVerNota,
  onCalificar,
}: Props) => {
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
          <CardEntregado
            key={p.id}
            pedidoId={p.id}
            fechaSeleccion={p.fechaSeleccion}
            compradorNombre={p.compradorNombre}
            compradorRating={p.compradorRating}
            textoPedido={p.textoPedido}
            nota={p.respuestaSeleccionada?.nota}
            precio={p.respuestaSeleccionada?.precio ?? 0}
            mensajes={p.mensajes}
            direccionComprador={p.direccionComprador}
            celularComprador={p.celularComprador}
            onVerPedido={onVerPedido}
            onVerNota={onVerNota}
            onCalificar={onCalificar}
          />
        ))
      )}
    </ScrollView>
  );
};

export default PedidosEntregados;
