import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

interface SeccionAjustesProps {
  titulo: string;
  children: React.ReactNode;
}

const SeccionAjustes = ({ titulo, children }: SeccionAjustesProps) => {
  const { colors } = useTheme();

  return (
    <View
      className="w-full"
      style={{
        paddingTop: Spacing.lg,
      }}
      accessibilityLabel={`Sección ${titulo}`}
    >
      <Text
        className="font-semibold"
        style={{
          color: colors.textMuted,
          fontSize: FontSizes.md,
          marginBottom: Spacing.sm,
        }}
      >
        {titulo}
      </Text>

      <View>{children}</View>
    </View>
  );
};

export default SeccionAjustes;
