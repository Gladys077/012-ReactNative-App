import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const HomeVendedor = () => {
  const { colors, fonts } = useTheme();

  return (
    <View>
      <Text style={{ color: colors.textDefault }}>HomeVendedor</Text>
    </View>
  );
};

export default HomeVendedor;
