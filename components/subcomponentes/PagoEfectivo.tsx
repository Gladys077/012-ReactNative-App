import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { BorderRadius, FontSizes, Spacing } from "../../constants/Tokens";

interface Props {
  importe: string;
  onCambiarImporte: (valor: string) => void;
  errorImporte?: string;
}

const PagoEfectivo: React.FC<Props> = ({ importe, onCambiarImporte, errorImporte }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        marginTop: 4,
        padding: 12,
        backgroundColor: colors.cardBg,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text
        style={{
          color: colors.textDefault,
          fontSize: FontSizes.sm,
          marginBottom: Spacing.sm,
        }}
      >
        Si abona en efectivo, indique con cuánto abonará, así llevamos el vuelto. ¡Gracias!
      </Text>

      <TextInput
        value={importe}
        onChangeText={onCambiarImporte}
        placeholder="Importe"
        placeholderTextColor={colors.textMuted}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: errorImporte ? colors.textError : colors.textMuted,
          borderRadius: BorderRadius.md,
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.md,
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          backgroundColor: colors.background,
        }}
      />

      {/* Mensaje de error */}
      {errorImporte ? (
        <Text
          style={{
            marginTop: 6,
            color: colors.textError,
            fontSize: FontSizes.xs,
            fontFamily: "Roboto-Regular",
          }}
        >
          {errorImporte}
        </Text>
      ) : null}
    </View>
  );
};

export default PagoEfectivo;
