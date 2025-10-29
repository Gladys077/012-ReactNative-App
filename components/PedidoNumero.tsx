import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type PedidoNumeroProps = {
  numero: number | string;
  centered?: boolean; // opcional: si querés centrar el texto dentro del contenedor
};

const PedidoNumero = ({ numero, centered = false }: PedidoNumeroProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        centered && { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.textDefault,
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.base,
          },
        ]}
      >
        Pedido #{numero}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xs,
  },
  text: {
    letterSpacing: 0.2,
  },
});

export default PedidoNumero;


// MODO DE USO:
// <PedidoNumero numero={12345} />
// O CENTRADO:
// <PedidoNumero numero={12345} centered />
