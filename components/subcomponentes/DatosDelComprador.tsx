// components/subcomponentes/DatosDelComprador.tsx

import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { Telephone, Ubicacion } from "../icons";

interface DatosDelCompradorProps {
  direccion?: string;
  celular?: number;
}

export default function DatosDelComprador({
  direccion,
  celular,
}: DatosDelCompradorProps) {
  const { colors, fonts } = useTheme();

  if (!direccion && !celular) return null;

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        gap: Spacing.sm,
      }}
    >
      <Text
        style={{
          fontSize: FontSizes.base,
          fontFamily: fonts.robotoBold,
          color: colors.textDefault,
        }}
      >
        Datos del comprador
      </Text>

      {direccion && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.sm,
          }}
        >
          <Ubicacion width={16} height={16} fill={colors.textDefault} />
          <Text
            style={{
              fontSize: FontSizes.sm,
              fontFamily: fonts.robotoRegular,
              color: colors.textDefault,
              flex: 1,
            }}
          >
            {direccion}
          </Text>
        </View>
      )}

      {celular && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.sm,
          }}
        >
          <Telephone width={16} height={16} fill={colors.textDefault} />
          <Text
            style={{
              fontSize: FontSizes.base,
              fontFamily: fonts.robotoRegular,
              color: colors.textDefault,
              flex: 1,
            }}
          >
            {celular}
          </Text>
        </View>
      )}
    </View>
  );
}
