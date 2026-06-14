import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";

// ─── Props ────────────────────────────────────────────────────────────────────

interface AyudaReportarProps {
  /** Rol para el color del texto/ícono. Default: "buyer" */
  role?: "buyer" | "seller";
  /** Texto personalizable. Default: "¿Necesitás ayuda con este pedido?" */
  label?: string;
  onPress: () => void;
  style?: ViewStyle;
}

// ─── Componente ───────────────────────────────────────────────────────────────

const AyudaReportar: React.FC<AyudaReportarProps> = ({
  role = "buyer",
  label = "Ayuda",
  onPress,
  style,
}) => {
  const { colors, fonts } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        opacity: pressed ? 0.65 : 1,
        // paddingTop: Spacing.md,
        paddingHorizontal: Spacing.sm,

        alignSelf: "flex-end",
      })}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} //agranda el área táctil de un btn sin agrandarlo visualmente
    >
      <Text
        style={{
          fontFamily: fonts.robotoMedium,
          fontSize: FontSizes.sm,
          color: colors.textSecondaryBorder,
          textDecorationLine: "underline",
          textDecorationStyle: "dotted",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default AyudaReportar;

// ─── MODO DE USO ──────────────────────────────────────────────────────────────
//
// Se coloca dentro del `contenidoExpandible` de la CardPedidoBase,
// al final, luego de CardRespVendPedEnCamino (u otro contenido):
//
//   <AyudaReportar
//     role="buyer"
//     onPress={() => onAbrirAyuda?.()}
//   />
//
// Para el lado del vendedor:
//   <AyudaReportar
//     role="seller"
//     label="¿Tenés un problema con este pedido?"
//     onPress={() => onAbrirAyuda?.()}
//   />
