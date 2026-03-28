import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { FontSizes } from "../../constants/Tokens";

type Props = {
  tipo: "espera" | "pagar";
};

export default function BotonExtraTiempo({ tipo }: Props) {
  const { colors, fonts } = useTheme();

  const texto = tipo === "espera" ? "AÑADIR 1 HORA" : "AÑADIR 10 MIN";

  return (
    <View style={{ paddingTop: 5 }}>
      <Text
        style={{
          fontSize: FontSizes.xs,
          fontFamily: fonts.robotoBold,
          color: colors.textDefault,
        }}
      >
        {texto}
      </Text>
    </View>
  );
}
