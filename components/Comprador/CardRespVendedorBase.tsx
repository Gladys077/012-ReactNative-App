import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import EstrellaReputacion from "../subcomponentes/EstrellaReputacion";

interface CardRespVendedorBaseProps {
  pedidoId?: string | number;
  respuestaId: string | number;
  vendedorNombre: string;
  rating: number;
  precio: number;
  nota?: string;
  tipoCronometro: "espera" | "elegir" | "pagar";
  duracionCronometro: number; //en minutos
  timestampRespuesta?: number; 

  children: React.ReactNode;

  onAceptar?: (respuestaId: string | number) => void;
  onRechazar?: (respuestaId: string | number) => void;
  onFinishCronometro?: (respuestaId: string | number) => void;
  onVerNota?: (nota: string) => void;
}

export default function CardRespVendedorBase({
  pedidoId,
  respuestaId,
  vendedorNombre,
  rating,
  precio,
  nota,
  duracionCronometro,
  timestampRespuesta,
  tipoCronometro,
  onAceptar,
  onRechazar,
  onFinishCronometro,
  onVerNota,
  children,
}: CardRespVendedorBaseProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.xxl,
        borderTopWidth: 1,
        borderBottomWidth: 4,
        borderColor: colors.borderTopBottom,
        elevation: 2,
        marginVertical: 8,
      }}
    >
      {/* Header: Nombre + Rating + Cronómetro */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.md,
        }}
      >
        {/* Datos del vendedor */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: FontSizes.md,
              color: colors.textDefault,
              marginBottom: 4,
            }}
          >
            {vendedorNombre}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <EstrellaReputacion rating={rating} size={14} />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: FontSizes.sm,
                color: colors.textMuted,
              }}
            >
              ({rating.toFixed(1)})
            </Text>
          </View>
        </View>

        {/* Cronómetro */}
        <Cronometro
          id={`respuesta_${respuestaId}`}
          tipo={tipoCronometro}
          duracionInicial={duracionCronometro}
          timestampInicio={timestampRespuesta} 
          onFinish={() => onFinishCronometro?.(respuestaId)}
        />
      </View>

      {/* Contenido variable (cada card específica lo pasa) */}
      <View style={{ marginTop: Spacing.xl }}>{children}</View>
    </View>
  );
}
