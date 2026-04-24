import { FontSizes, Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, Text } from "react-native";
import type { Pedido } from "../../../types/pedidos";
import CardPedidoNuevo from "../CardsVendedor/CardPedidoNuevo";

interface Props {
  pedidos: Pedido[];
}

const PedidosNuevos = ({ pedidos }: Props) => {
  const { colors } = useTheme();
  const { updateEstado, updatePedido, removePedido } = useOrders();

  const handleEnviarPresupuesto = (
    pedidoId: string | number,
    precio: number,
    nota?: string,
  ) => {
    // Guarda el presupuesto como respuesta del vendedor y cambia estado
    updatePedido(pedidoId, {
      estadoSistema: "presupuestado",
      respuestas: [
        {
          id: `v_${pedidoId}`,
          vendedorNombre: "Mi Tienda", // TODO: dejamos eso o reemplazamos con datos reales del vendedor
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
        pedidos.map((p) => (
          <CardPedidoNuevo
            key={p.id}
            pedidoId={p.id}
            fechaSeleccion={p.fechaSeleccion}
            compradorNombre={p.compradorNombre}
            compradorRating={p.compradorRating}
            textoPedido={p.textoPedido}
            estadoSistema={p.estadoSistema as "nuevo" | "presupuestado"}
            precioEnviado={p.respuestas?.[0]?.precio}
            notaEnviada={p.respuestas?.[0]?.nota}
            onEnviarPresupuesto={handleEnviarPresupuesto}
            onEliminarPedido={handleEliminarPedido}
          />
        ))
      )}
    </ScrollView>
  );
};

export default PedidosNuevos;
