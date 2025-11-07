import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import EtiqEstadoDelPedido from "../EtiqEstadoDelPedido";
import PedidoNumero from "../PedidoNumero";
import { FlechaAbajo } from "../icons";
import LineaEstadoPedido from "./LineaEstadoPedido";

interface CardPedidoPagarProps {
  id: string | number;
  numeroPedido: number;
  estadoActual: "Pago" | "Verificacion" | "Preparacion" | "EnCamino" | "Entregado";
  onVerPedido?: (id: string | number) => void;
}

export default function CardPedidoPagar({
  id,
  numeroPedido,
  estadoActual,
  onVerPedido,
}: CardPedidoPagarProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);
  const [animacion] = useState(new Animated.Value(0));

  const toggleExpandir = () => {
    const toValue = expandido ? 0 : 1;

    Animated.timing(animacion, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpandido(!expandido);
  };

  const rotacion = animacion.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.md,
        padding: Spacing.xl,
        gap: Spacing.md,
        elevation: 5,
        borderWidth: expandido ? 2 : 0,
        borderColor: expandido ? colors.brandBuyer : "transparent",
      }}
    >
      {/* Header: Pedido número + etiqueta */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PedidoNumero numero={numeroPedido} />
        <EtiqEstadoDelPedido estado="Pagar" />
      </View>

      {/* Línea de tiempo del pedido */}
      <LineaEstadoPedido estadoActual={estadoActual} />

      {/* Separador */}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.textMuted,
          marginTop: Spacing.xs,
        }}
      />

      {/* Toggle para mostrar/ocultar detalles */}
      <Pressable
        onPress={toggleExpandir}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: Spacing.xs,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.sm,
            color: colors.brandBuyer,
            marginRight: 8,
          }}
        >
          {expandido ? "Ocultar detalles" : "Mostrar detalles"}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotacion }] }}>
          <FlechaAbajo width={18} height={18} stroke={colors.brandBuyer} />
        </Animated.View>
      </Pressable>

      {/* Contenido expandido - Aquí irá la card del vendedor */}
      {expandido && (
        <Animated.View
          style={{
            opacity: animacion,
            marginTop: Spacing.sm,
          }}
        >
          <Text style={{ color: colors.brandBuyer }}>
            {/* Aquí irá la nueva versión de CardVendedor */}
          </Text>
        </Animated.View>
      )}
    </View>
  );
}