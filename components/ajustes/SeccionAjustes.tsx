import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

interface SeccionAjustesProps {
  titulo: string;
  children: React.ReactNode;
}

const SeccionAjustes = ({ titulo, children }: SeccionAjustesProps) => {
  const { colors, fonts } = useTheme();

  return (
    <View
      style={{
        width: "100%",
        paddingTop: Spacing.lg,
      }}
      accessibilityLabel={`Sección ${titulo}`}
    >
      <Text
        style={{
          fontFamily: fonts.robotoBold,
          color: colors.textMuted,
          fontSize: FontSizes.sm,
          marginBottom: Spacing.sm,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        {titulo}
      </Text>

      <View>{children}</View>
    </View>
  );
};

export default SeccionAjustes;
