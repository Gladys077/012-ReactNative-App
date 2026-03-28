// CronometroDisplay.tsx
import React from "react";
import { Text, View } from "react-native";
import { FontSizes, Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

type Props = {
  tipo: "espera" | "elegir" | "pagar";
  horas: string; // formateadas con 2 dígitos
  minutos: string; // formateadas con 2 dígitos
  textoColor: string;
};

export default function CronometroDisplay({
  tipo,
  horas,
  minutos,
  textoColor,
}: Props) {
  // Formato HH:MM para todas las variantes
  const formato = `${horas}:${minutos}`;

  const textoTitulo =
    tipo === "espera"
      ? null
      : tipo === "elegir"
        ? "Tiempo para elegir"
        : "Tiempo para pagar";

  const { fonts } = useTheme();

  return (
    <View style={{ alignItems: "center", paddingHorizontal: Spacing.lg }}>
      {/* Título  */}
      {textoTitulo && (
        <Text
          style={{
            color: textoColor,
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.xs,
            marginBottom: 2,
          }}
        >
          {textoTitulo}
        </Text>
      )}

      {/* Hora */}
      <Text
        style={{
          color: textoColor,
          fontFamily: "AlarmClock",
          fontSize: FontSizes.xl,
          marginHorizontal: Spacing.sm,
        }}
      >
        {formato}
      </Text>
    </View>
  );
}
