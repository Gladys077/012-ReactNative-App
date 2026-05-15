import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

// ─── Props ────────────────────────────────────────────────────────────────────

interface AyudaPedidoTriggerProps {
  /** Rol para el color del texto/ícono. Default: "buyer" */
  role?: "buyer" | "seller";
  /** Texto personalizable. Default: "¿Necesitás ayuda con este pedido?" */
  label?: string;
  onPress: () => void;
  style?: ViewStyle;
}

// ─── Componente ───────────────────────────────────────────────────────────────

const AyudaPedidoTrigger: React.FC<AyudaPedidoTriggerProps> = ({
  role = "buyer",
  label = "Reportar un problema",
  onPress,
  style,
}) => {
  const { colors, fonts } = useTheme();

  const accentColor = role === "buyer" ? colors.brandBuyer : colors.brandSeller;

  const dividerColor =
    role === "buyer" ? colors.borderTopBottom : colors.borderTopBottomSeller;

  return (
    <View
      style={[
        {
          // marginTop: Spacing.xl,
          paddingTop: Spacing.lg,
          borderTopWidth: 1,
          borderTopColor: dividerColor + "40", // 25% opacidad
          alignItems: "center",
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          opacity: pressed ? 0.65 : 1,
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.md,
        })}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.sm,
            color: accentColor,
            textDecorationLine: "underline",
            textDecorationStyle: "dotted",
          }}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default AyudaPedidoTrigger;

// ─── MODO DE USO ──────────────────────────────────────────────────────────────
//
// Se coloca dentro del `contenidoExpandible` de la CardPedidoBase,
// al final, luego de CardRespVendPedEnCamino (u otro contenido):
//
//   <AyudaPedidoTrigger
//     role="buyer"
//     onPress={() => {
//       setAyudaVisible(true);
//       ayudaRef.current?.present();
//     }}
//   />
//
// Para el lado del vendedor:
//   <AyudaPedidoTrigger
//     role="seller"
//     label="¿Tenés un problema con este pedido?"
//     onPress={...}
//   />
