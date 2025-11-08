import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface PagoEfectivoProps {
  importe?: string;
  onChangeImporte: (valor: string) => void;
}

export default function PagoEfectivo({ importe, onChangeImporte }: PagoEfectivoProps) {
  const { colors } = useTheme();

  return (
    <View style={{ marginTop: Spacing.sm }}>
      <Text
        style={{
          fontFamily: "Roboto-Regular",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          marginBottom: Spacing.xs,
        }}
      >
        Para pagos en efectivo, indique con cuánto pagará así llevamos cambio.
      </Text>

      <TextInput
        value={importe}
        onChangeText={onChangeImporte}
        keyboardType="numeric"
        placeholder="Importe"
        placeholderTextColor={colors.textMuted}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: BorderRadius.sm,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.xs,
          fontFamily: "Roboto-Regular",
          color: colors.textDefault,
        }}
      />
    </View>
  );
}
