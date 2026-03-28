import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import {
  Billetera,
  Check,
  ClipboardSolid,
  EnCaminoSolid,
  Entregado,
  Lupa$,
} from "../icons";

type EstadoPedido =
  | "Pago"
  | "Verificacion"
  | "Preparacion"
  | "EnCamino"
  | "Entregado";

interface LineaEstadoPedidoProps {
  estadoActual: EstadoPedido;
}

const ESTADOS_ORDEN: EstadoPedido[] = [
  "Pago",
  "Verificacion",
  "Preparacion",
  "EnCamino",
  "Entregado",
];

export default function LineaEstadoPedido({
  estadoActual,
}: LineaEstadoPedidoProps) {
  const { colors, fonts } = useTheme();
  const estadoActualIndex = ESTADOS_ORDEN.indexOf(estadoActual);

  /**
   * Devuelve el ícono correspondiente según el estado
   */
  const obtenerIcono = (estado: EstadoPedido, index: number) => {
    const completado = index < estadoActualIndex;
    const activo = index === estadoActualIndex;
    const size = 28;

    if (completado) {
      return <Check width={size} height={size} fill={colors.textOnColor} />;
    }

    const color = activo ? colors.brandBuyer : colors.textMuted;

    switch (estado) {
      case "Pago":
        return <Billetera width={size} height={size} stroke={color} />;
      case "Verificacion":
        return <Lupa$ width={size} height={size} stroke={color} />;
      case "Preparacion":
        return <ClipboardSolid width={size} height={size} stroke={color} />;
      case "EnCamino":
        return <EnCaminoSolid width={30} height={30} stroke={color} />;
      case "Entregado":
        return <Entregado width={size} height={size} stroke={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ paddingVertical: Spacing.md }}>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Línea base */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: colors.textSecondaryBorder,
            top: 24,
          }}
        />

        {/* Línea de progreso */}
        <LinearGradient
          colors={[colors.fondoCirculo, colors.success]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{
            position: "absolute",
            height: 3,
            top: 24,
            left: 0,
            borderRadius: 2,
            width: `${(estadoActualIndex / (ESTADOS_ORDEN.length - 1)) * 100}%`,
          }}
        />

        {/* Estados */}
        {ESTADOS_ORDEN.map((estado, index) => {
          const completado = index < estadoActualIndex;
          const activo = index === estadoActualIndex;

          return (
            <View key={estado} style={{ alignItems: "center", zIndex: 2 }}>
              {/* Círculo */}
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  borderWidth: 2,
                  borderColor: completado
                    ? colors.brandBuyer
                    : activo
                      ? colors.brandBuyer
                      : colors.textSecondaryBorder,
                  backgroundColor: completado
                    ? colors.success
                    : activo
                      ? colors.fondoCirculoActivo
                      : colors.fondoCirculo,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {obtenerIcono(estado, index)}
              </View>

              {/* Label */}
              <Text
                style={{
                  fontFamily: fonts.robotoMedium,
                  fontSize: FontSizes.xxs,
                  color: colors.textDefault,
                  marginTop: Spacing.sm,
                  textAlign: "center",
                }}
              >
                {estado === "Verificacion"
                  ? "Verificación"
                  : estado === "Preparacion"
                    ? "Preparación"
                    : estado === "EnCamino"
                      ? "En Camino"
                      : estado}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

// USO:
// <LineaEstadoPedido estadoActual="Verificacion" />
