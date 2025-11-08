import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

interface NotaDelVendedorProps {
  nota?: string | null;
}

export default function NotaDelVendedor({ nota }: NotaDelVendedorProps) {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: Spacing.xs }}>
      <Text
        style={{
          fontFamily: "Roboto-Regular",
          fontSize: FontSizes.sm,
          color: colors.textMuted,
        }}
      >
        {nota && nota.trim() !== "" ? nota : "Sin nota del vendedor"}
      </Text>
    </View>
  );
}
