import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface FormaDePagoProps {
  metodo: "transferencia" | "efectivo";
  onChange: (nuevo: "transferencia" | "efectivo") => void;
}

export default function FormaDePago({ metodo, onChange }: FormaDePagoProps) {
  const { colors } = useTheme();

  const renderOpcion = (opcion: "transferencia" | "efectivo", label: string) => {
    const activo = metodo === opcion;
    return (
      <Pressable
        onPress={() => onChange(opcion)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: Spacing.lg,
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: activo ? colors.brandBuyer : colors.textMuted,
            alignItems: "center",
            justifyContent: "center",
            marginRight: Spacing.xs,
          }}
        >
          {activo && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.brandBuyer,
              }}
            />
          )}
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.sm,
            color: activo ? colors.textDefault : colors.textMuted,
          }}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{ marginTop: Spacing.md }}>
      <Text
        style={{
          fontFamily: "Roboto-Medium",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          marginBottom: Spacing.xs,
        }}
      >
        Forma de pago
      </Text>
      <View style={{ flexDirection: "row" }}>
        {renderOpcion("transferencia", "Transferencia")}
        {renderOpcion("efectivo", "Efectivo contra entrega")}
      </View>
    </View>
  );
}
