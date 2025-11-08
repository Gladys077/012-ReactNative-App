import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Image, Text, View } from "react-native";

interface MascotaConMensajeProps {
  mensaje: string;
  varianteBg?: "primary" | "secondary" | "accent"; // Para los 3 colores que mencionaste
}

export default function MascotaConMensaje({
  mensaje,
  varianteBg = "primary",
}: MascotaConMensajeProps) {
  const { colors } = useTheme();

  // Mapeo de variantes a colores de fondo
  const bgColors = {
    primary: colors.brandBuyer,
    secondary: colors.brandSeller,
    accent: colors.brandBuyerSoft, // Ajustá según tus necesidades
  };

  // Color de texto según el fondo
  const textColors = {
    primary: "#FFFFFF",
    secondary: "#FFFFFF",
    accent: colors.textDefault,
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.md,
        marginVertical: Spacing.sm,
      }}
    >
      {/* Avatar circular con la mascota */}
      <View
        style={{
          width: 56,
          height: 56,
          // borderRadius: 28,
          // backgroundColor: colors.brandBuyerSoft,
          // borderWidth: 2,
          // borderColor: colors.border,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/mascota.gif")}
          style={{ width: 52, height: 52 }}
          resizeMode="cover"
        />
      </View>

      {/* Globo de diálogo */}
      <View
        style={{
          flex: 1,
          backgroundColor: bgColors[varianteBg],
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
          paddingHorizontal: Spacing.lg,
          position: "relative",
        }}
      >
        {/* Triangulito apuntando a la mascota */}
        <View
          style={{
            position: "absolute",
            left: -8,
            top: "50%",
            marginTop: -8,
            width: 0,
            height: 0,
            borderTopWidth: 8,
            borderTopColor: "transparent",
            borderBottomWidth: 8,
            borderBottomColor: "transparent",
            borderRightWidth: 8,
            borderRightColor: bgColors[varianteBg],
          }}
        />

        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: FontSizes.sm,
            color: textColors[varianteBg],
            lineHeight: 20,
          }}
        >
          {mensaje}
        </Text>
      </View>
    </View>
  );
}