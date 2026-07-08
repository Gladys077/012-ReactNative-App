import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
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

// ─── Tipos ────────────────────────────────────────────────────────────────────

type EstadoPedido =
  | "Pago"
  | "Verificacion"
  | "Preparacion"
  | "EnCamino"
  | "Recibido";

interface LineaEstadoPedidoProps {
  estadoActual: EstadoPedido;
  todosCompletados?: boolean;
}

const ESTADOS_ORDEN: EstadoPedido[] = [
  "Pago",
  "Verificacion",
  "Preparacion",
  "EnCamino",
  "Recibido",
];

const LABELS: Record<EstadoPedido, string> = {
  Pago: "Pago",
  Verificacion: "Revisión",
  Preparacion: "Preparación",
  EnCamino: "EnCamino",
  Recibido: "Recibido",
};

// ─── Componente ───────────────────────────────────────────────────────────────

export default function LineaEstadoPedidoV2({
  estadoActual,
  todosCompletados,
}: LineaEstadoPedidoProps) {
  const { colors, fonts } = useTheme();
  const estadoActualIndex = ESTADOS_ORDEN.indexOf(estadoActual);

  const obtenerIcono = (estado: EstadoPedido, index: number) => {
    const completado = todosCompletados || index < estadoActualIndex;
    const activo = !todosCompletados && index === estadoActualIndex;
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
        return <EnCaminoSolid width={34} height={34} stroke={color} />;
      case "Recibido":
        return <Entregado width={size} height={size} stroke={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ paddingVertical: Spacing.md }}>
      {/* ── Fila de círculos + conectores ── */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {ESTADOS_ORDEN.map((estado, index) => {
          const completado = todosCompletados || index < estadoActualIndex;
          const activo = !todosCompletados && index === estadoActualIndex;

          // Color del conector que va DESPUÉS de este estado
          const connectorDone =
            todosCompletados || index < estadoActualIndex - 1;
          const connectorActive = index === estadoActualIndex - 1;

          return (
            <React.Fragment key={estado}>
              {/* Círculo */}
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    borderWidth: 2,
                    borderColor:
                      completado || activo
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
              </View>

              {/* Conector entre este círculo y el siguiente */}
              {index < ESTADOS_ORDEN.length - 1 && (
                <View
                  style={{
                    flex: 1,
                    height: 3,
                    backgroundColor:
                      connectorDone || connectorActive
                        ? colors.brandBuyer // completado / activo
                        : colors.textSecondaryBorder,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* ── Fila de labels ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: Spacing.sm,
        }}
      >
        {ESTADOS_ORDEN.map((estado, index) => (
          <React.Fragment key={estado}>
            <View style={{ alignItems: "center", width: 48 }}>
              <Text
                style={{
                  fontFamily: fonts.robotoLight,
                  fontSize: FontSizes.xs,
                  color: colors.textDefault,
                  textAlign: "center",
                  minWidth: 72,
                }}
              >
                {LABELS[estado]}
              </Text>
            </View>

            {/* Spacer invisible — mismo flex:1 que el conector de arriba */}
            {index < ESTADOS_ORDEN.length - 1 && <View style={{ flex: 1 }} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

// USO:
// <LineaEstadoPedidoV2 estadoActual="Verificacion" />
// <LineaEstadoPedidoV2 estadoActual="EnCamino" todosCompletados />
