import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

interface NotaEnviadaProps {
  nota?: string;
}

export default function NotaEnviada({ nota }: NotaEnviadaProps) {
  if (!nota || nota.trim() === "") return null;

  const { colors, fonts } = useTheme();

  return (
    <View
      style={{
        borderLeftWidth: 3,
        borderLeftColor: colors.brandSeller,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        backgroundColor: colors.fondoPedidos,
        borderRadius: BorderRadius.sm,
      }}
    >
      <Text
        style={{
          fontSize: FontSizes.sm,
          fontFamily: fonts.robotoRegular,
          color: colors.textDefault,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            color: colors.textOnColor,
          }}
        >
          NOTA:{" "}
        </Text>
        {nota}
      </Text>
    </View>
  );
}
