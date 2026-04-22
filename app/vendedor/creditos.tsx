import React from "react";
import { Text, View } from "react-native";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

const Creditos = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
      }}
    >
      <Text>Creditos</Text>
    </View>
  );
};

export default Creditos;
