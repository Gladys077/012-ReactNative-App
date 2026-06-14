// PedidosNuevos.tsx
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useOrders } from "@/context/OrdersContext";
import { useTheme } from "@/context/ThemeContext";
import React, { useRef, useState } from "react";
import { Animated, ScrollView, Text } from "react-native";
import type { Pedido } from "../../../types/pedidos";
import CardPedidoNuevo from "../CardsVendedor/CardPedidoNuevo";
import CardPresupuestado from "../CardsVendedor/CardPresupuestado";

interface Props {
  pedidos: Pedido[];
  onEliminarConToast: (
    pedidoId: string | number,
    onConfirm: () => void,
  ) => void;
}

const PedidosNuevos = ({ pedidos, onEliminarConToast }: Props) => {
  const { colors } = useTheme();
  const { updatePedido, removePedido } = useOrders();
  const [pendienteId, setPendienteId] = useState<string | number | null>(null);

  // Un Animated.Value por pedido, inicializado en 1
  const scaleAnims = useRef<Record<string | number, Animated.Value>>({});

  const getAnim = (id: string | number) => {
    if (!scaleAnims.current[id]) {
      scaleAnims.current[id] = new Animated.Value(1);
    }
    return scaleAnims.current[id];
  };

  const handleEnviarPresupuesto = (
    pedidoId: string | number,
    precio: number,
    nota?: string,
  ) => {
    const anim = getAnim(pedidoId);

    Animated.sequence([
      // 1. Card actual se achica
      Animated.timing(anim, {
        toValue: 0,
        duration: 520,
        useNativeDriver: true,
      }),
      // 2. Cambia el estado (en el valle de la animación)
      {
        start: (cb) => {
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
          cb?.({ finished: true });
        },
        stop: () => {},
        reset: () => {},
      },
      // 3. Nueva card crece desde 0
      Animated.timing(anim, {
        toValue: 1,
        duration: 520,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleEliminarPedido = (pedidoId: string | number) => {
    if (pendienteId !== null) removePedido(pendienteId);
    setPendienteId(pedidoId);
    onEliminarConToast(pedidoId, () => {
      removePedido(pedidoId);
      setPendienteId(null);
    });
  };

  const pedidosOrdenados = [...pedidos]
    .filter((p) => p.id !== pendienteId)
    .sort((a, b) => {
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
      {pedidos.filter((p) => p.id !== pendienteId).length === 0 ? (
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
        pedidosOrdenados.map((p) => {
          const anim = getAnim(p.id);
          return (
            <Animated.View key={p.id} style={{ transform: [{ scale: anim }] }}>
              {p.estadoSistema === "presupuestado" ? (
                <CardPresupuestado
                  pedidoId={p.id}
                  fechaSeleccion={p.fechaSeleccion}
                  compradorNombre={p.compradorNombre}
                  compradorRating={p.compradorRating}
                  compradorRatingCount={p.compradorRatingCount}
                  textoPedido={p.textoPedido}
                  precioEnviado={p.respuestas?.[0]?.precio ?? 0}
                  notaEnviada={p.respuestas?.[0]?.nota}
                  onCancelarPedido={() => handleEliminarPedido(p.id)}
                />
              ) : (
                <CardPedidoNuevo
                  pedidoId={p.id}
                  fechaSeleccion={p.fechaSeleccion}
                  compradorNombre={p.compradorNombre}
                  compradorRating={p.compradorRating}
                  compradorRatingCount={p.compradorRatingCount}
                  textoPedido={p.textoPedido}
                  onEnviarPresupuesto={handleEnviarPresupuesto}
                  onEliminarPedido={handleEliminarPedido}
                />
              )}
            </Animated.View>
          );
        })
      )}
    </ScrollView>
  );
};

export default PedidosNuevos;
