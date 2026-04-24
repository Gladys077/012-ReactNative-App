import { FontSizes } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text } from "react-native";

interface TiempoAceptacionProps {
  fechaSeleccion?: string;
}

const getTiempoTranscurrido = (fecha?: string): string => {
  if (!fecha) return "";
  const diff = Math.floor((Date.now() - new Date(fecha).getTime()) / 1000);

  if (diff < 60) return "Aceptado: hace un momento";
  if (diff < 3600) {
    const min = Math.floor(diff / 60);
    return `Aceptado: hace ${min} ${min === 1 ? "minuto" : "minutos"}`;
  }
  if (diff < 86400) {
    const hs = Math.floor(diff / 3600);
    return `Aceptado: hace ${hs} ${hs === 1 ? "hora" : "horas"}`;
  }
  const dias = Math.floor(diff / 86400);
  return `Aceptado: hace ${dias} ${dias === 1 ? "día" : "días"}`;
};

export default function TiempoAceptacion({
  fechaSeleccion,
}: TiempoAceptacionProps) {
  const { colors, fonts } = useTheme();

  return (
    <Text
      style={{
        fontSize: FontSizes.sm,
        fontFamily: fonts.robotoRegular,
        color: colors.textMuted,
      }}
    >
      {getTiempoTranscurrido(fechaSeleccion)}
    </Text>
  );
}
