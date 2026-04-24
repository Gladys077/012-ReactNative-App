import { FontSizes } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { Estrella100 } from "../icons";

interface EstrellaUnicaProps {
  rating: number;
  size?: number;
}

export default function EstrellaUnica({
  rating,
  size = 16,
}: EstrellaUnicaProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Estrella100
        width={size}
        height={size}
        fill={colors.brandSeller}
        stroke={colors.brandSeller}
      />
      <Text
        style={{
          fontSize: FontSizes.sm,
          fontFamily: fonts.robotoMedium,
          color: colors.textDefault,
        }}
      >
        {rating.toFixed(1)}
      </Text>
    </View>
  );
}
