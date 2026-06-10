import { FontSizes, Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, Text } from "react-native";
import type { Pedido } from "../../../types/pedidos";
import CardPedidoNuevo from "../CardsVendedor/CardPedidoNuevo";
import CardPresupuestado from "../CardsVendedor/CardPresupuestado";

interface Props {
  pedidos: Pedido[];
}

const PedidosNuevos = ({ pedidos }: Props) => {
  const { colors } = useTheme();
  const { updatePedido, removePedido } = useOrders();

  const handleEnviarPresupuesto = (
    pedidoId: string | number,
    precio: number,
    nota?: string,
  ) => {
    updatePedido(pedidoId, {
      estadoSistema: "presupuestado",
      respuestas: [
        {
          id: `v_${pedidoId}`,
          vendedorNombre: "Mi Tienda",
          rating: 0,
          precio,
          nota,
        },
      ],
    });
  };

  const handleEliminarPedido = (pedidoId: string | number) => {
    removePedido(pedidoId);
  };

  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    if (a.estadoSistema === b.estadoSistema) return 0;
    if (a.estadoSistema === "nuevo") return -1;
    return 1;
  });

  return (
    <ScrollView
      contentContainerStyle={{
        padding: Spacing.md,
        paddingTop: Spacing.xl,
        gap: Spacing.lg,
        paddingBottom: Spacing.xl,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
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
        pedidosOrdenados.map((p) =>
          p.estadoSistema === "presupuestado" ? (
            <CardPresupuestado
              key={p.id}
              pedidoId={p.id}
              fechaSeleccion={p.fechaSeleccion}
              compradorNombre={p.compradorNombre}
              compradorRating={p.compradorRating}
              compradorRatingCount={p.compradorRatingCount}
              textoPedido={p.textoPedido}
              precioEnviado={p.respuestas?.[0]?.precio ?? 0}
              notaEnviada={p.respuestas?.[0]?.nota}
            />
          ) : (
            <CardPedidoNuevo
              key={p.id}
              pedidoId={p.id}
              fechaSeleccion={p.fechaSeleccion}
              compradorNombre={p.compradorNombre}
              compradorRating={p.compradorRating}
              compradorRatingCount={p.compradorRatingCount}
              textoPedido={p.textoPedido}
              onEnviarPresupuesto={handleEnviarPresupuesto}
              onEliminarPedido={handleEliminarPedido}
            />
          ),
        )
      )}
    </ScrollView>
  );
};

export default PedidosNuevos;
