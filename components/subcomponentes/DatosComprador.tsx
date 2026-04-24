import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { Telephone, Ubicacion } from "../icons";
import LineaDivisoria from "../UI/LineaDivisoria";

interface DatosCompradorProps {
  direccion?: string;
  telefono?: string;
}

export default function DatosComprador({
  direccion,
  telefono,
}: DatosCompradorProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ gap: Spacing.md }}>
      <LineaDivisoria />

      <Text
        style={{
          fontSize: FontSizes.sm,
          fontFamily: fonts.robotoMedium,
          color: colors.textDefault,
        }}
      >
        Datos del comprador
      </Text>

      {/* Dirección */}
      {direccion && (
        <View style={{ gap: Spacing.xs }}>
          <View
            style={{
              flexDirection: "row",
              gap: Spacing.md,
              alignItems: "center",
            }}
          >
            <Ubicacion width={16} height={16} fill={colors.textDefault} />
            <Text
              style={{
                fontFamily: fonts.robotoBold,
                fontSize: FontSizes.sm,
                color: colors.textDefault,
              }}
            >
              Dirección de entrega
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: BorderRadius.md,
              padding: Spacing.md,
            }}
          >
            <Text style={{ fontSize: FontSizes.sm, color: colors.textDefault }}>
              {direccion}
            </Text>
          </View>
        </View>
      )}

      {/* Teléfono */}
      {telefono && (
        <View
          style={{
            flexDirection: "row",
            gap: Spacing.md,
            alignItems: "center",
          }}
        >
          <Telephone width={16} height={16} fill={colors.textDefault} />
          <Text style={{ fontSize: FontSizes.sm, color: colors.textDefault }}>
            {telefono}
          </Text>
        </View>
      )}
    </View>
  );
}
