import React from "react";
import { Text, View } from "react-native";
import { Spacing } from "../../constants/Tokens";

const Historial = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
      }}
    >
      <Text>Historial</Text>
    </View>
  );
};

export default Historial;
