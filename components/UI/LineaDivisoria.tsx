import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View, ViewStyle } from "react-native";

interface LineaDivisoriaProps {
  color?: string;
  marginVertical?: number;
  style?: ViewStyle;
}

export default function LineaDivisoria({
  color,
  marginVertical = Spacing.md,
  style,
}: LineaDivisoriaProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          width: "100%",
          height: 1,
          backgroundColor: color || colors.textMuted,
          marginVertical,
        },
        style,
      ]}
    />
  );
}
