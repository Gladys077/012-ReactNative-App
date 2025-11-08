import { FontSizes } from "@/constants/Tokens";
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Mail } from "../icons";

type Props = {
  cantidad?: number;
};

export default function RespuestasRecibidas({ cantidad = 0 }: Props) {
      const { colors } = useTheme();
    
  const hayRespuestas = cantidad > 0;

  return (
    <View
      className="flex-row items-center justify-between px-4 "
      style={{
        backgroundColor: colors.brandBuyerSoft,
        height: 48,
        marginBottom: 8,
    }}
    >
      <View className="flex-row items-center" style={{paddingTop: 2, justifyContent: 'center'}}>
        <Mail
          width={24}
          height={24}
          fill={colors.textDefault}
          style={{ marginRight: 8, marginTop: 2, 
            paddingTop: 0 }}
        />
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: FontSizes.base,
            color: colors.textDefault,
          }}
        >
          Respuestas recibidas
        </Text>
      </View>

      <Text
        style={{
          fontFamily: "Roboto-Medium",
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
