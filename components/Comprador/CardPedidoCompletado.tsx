import CardPedidoBase from "@/components/Comprador/CardPedidoBase";
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Text } from "react-native";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";

interface CardPedidoCompletadoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  onDesaparecer?: () => void;
}

const DURACION_MS = 10000;

export default function CardPedidoCompletado({
  pedidoId,
  fechaSeleccion,
  onDesaparecer,
}: CardPedidoCompletadoProps) {
  const { colors, fonts } = useTheme();
  const progreso = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progreso, {
      toValue: 0,
      duration: DURACION_MS,
      useNativeDriver: false,
    }).start(() => {
      onDesaparecer?.();
      // TODO: guardar en historial en backend
      router.push("/comprador/historialComprador");
    });
  }, []);

  const width = progreso.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "0%"],
  });

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion}
      estado="Completado"
      elevation={5}
    >
      <LineaEstadoPedido estadoActual="Recibido" todosCompletados={true} />

      <Text
        style={{
          fontFamily: fonts.robotoMedium,
          fontSize: FontSizes.base,
          color: colors.textDefault,
          textAlign: "center",
          marginTop: Spacing.lg,
          fontStyle: "italic",
        }}
      >
        ¡Misión cumplida!{"\n"}Tu opinión ayuda a que otros puedan elegir mejor.
      </Text>

      <Image
        source={require("@/assets/images/Listo.png")}
        style={{ width: "100%", height: 220, marginTop: Spacing.lg }}
        resizeMode="contain"
      />

      {/* Barra de progreso */}
      <Text
        style={{
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          textAlign: "center",
          marginTop: Spacing.lg,
        }}
      >
        Guardando en historial...
      </Text>
      <Animated.View
        style={{
          height: 4,
          borderRadius: 2,
          backgroundColor: colors.brandBuyer,
          width,
          marginTop: Spacing.xs,
        }}
      />
    </CardPedidoBase>
  );
}
