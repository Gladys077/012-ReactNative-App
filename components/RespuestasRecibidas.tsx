import { FontSizes } from "@/constants/Tokens";
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Mail } from "./icons";

type Props = {
  cantidad?: number;
};

export default function RespuestasRecibidas({ cantidad = 0 }: Props) {
      const { colors } = useTheme();
    
  const hayRespuestas = cantidad > 0;

  return (
    <View
      className="flex-row items-center justify-between rounded-2xl px-4"
      style={{
        backgroundColor: colors.brandBuyerSoft,
        height: 48,
        width: 16
    }}
    >
      <View className="flex-row items-center">
        <Mail
          width={20}
          height={20}
          fill={colors.textDefault}
          style={{ marginRight: 8 }}
        />
        <Text
          style={{
            fontFamily: "robotoRegular",
            fontSize: FontSizes.base,
            color: colors.textDefault,
          }}
        >
          Respuestas recibidas
        </Text>
      </View>

      <Text
        style={{
          fontFamily: "robotoRegular",
          fontSize: 24,
          color: hayRespuestas
            ? colors.brandBuyer
            : colors.textDefault,
        }}
      >
        {cantidad}
      </Text>
    </View>
  );
}


// MODO DE USO
// <RespuestasRecibidas cantidad={pedido.respuestasRecibidas} />
