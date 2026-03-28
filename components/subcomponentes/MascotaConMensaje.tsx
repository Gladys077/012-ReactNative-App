import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Image, Text, View } from "react-native";

interface MascotaConMensajeProps {
  mensaje: string;
  varianteBg?: "message" | "attention" | "success"; // 3 colores de fondo
  posicion?: "left" | "right"; // Para poner la mascota a la derecha o izquierda
}

export default function MascotaConMensaje({
  mensaje,
  varianteBg = "message",
  posicion = "left",
}: MascotaConMensajeProps) {
  const { colors, fonts } = useTheme();

  // Mapeo de variantes a colores de fondo
  const bgColors = {
    message: colors.brandBuyerSoft,
    attention: colors.brandSellerSoft,
    success: colors.success,
  };

  // Color de texto según el fondo
  const textColors = {
    message: colors.textDefault,
    attention: colors.textDefault,
    success: colors.textDefault,
  };

  const isLeft = posicion === "left";

  return (
    <View
      style={{
        flexDirection: isLeft ? "row" : "row-reverse",
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
          // backgroundColor: bgColors[varianteBg],
          borderRadius: BorderRadius.md,
          borderColor: colors.brandCommon,
          borderWidth: 1,
          padding: Spacing.md,
          paddingHorizontal: Spacing.lg,
          position: "relative",
        }}
      >
        {/* Triangulito apuntando a la mascota */}
        <View
          style={{
            position: "absolute",
            [isLeft ? "left" : "right"]: -8,
            top: "50%",
            marginTop: -8,
            width: 0,
            height: 0,
            borderTopWidth: 8,
            borderTopColor: "transparent",
            borderBottomWidth: 8,
            borderBottomColor: "transparent",
            ...(isLeft
              ? { borderRightWidth: 8, borderRightColor: colors.brandCommon }
              : { borderLeftWidth: 8, borderLeftColor: colors.brandCommon }),
          }}
        />

        <Text
          style={{
            fontFamily: fonts.robotoRegular,
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

// MODO DE USO
// <MascotaConMensaje
//   mensaje="¡Tu pedido está en camino!"
//   varianteBg="primary"
//   posicion="left"
// />
// </USO>
