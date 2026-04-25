import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { Telephone } from "../icons";
import CalificacionEstrellas from "../subcomponentes/CalificacionEstrellas";
import EstrellaReputacion from "../subcomponentes/EstrellaReputacion";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import LineaDivisoria from "../UI/LineaDivisoria";

interface CardRespVendPedRecibidoProps {
  vendedorNombre: string;
  rating: number;
  telefono?: string;
  onVerPedido: () => void;
  onEnviarCalificacion: (data: {
    estrellas: number;
    comentario: string;
  }) => void;
}

export default function CardRespVendPedRecibido({
  vendedorNombre,
  rating,
  telefono,
  onVerPedido,
  onEnviarCalificacion,
}: CardRespVendPedRecibidoProps) {
  const { colors, fonts } = useTheme();

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
        gap: Spacing.lg,
      }}
    >
      {/* Header: nombre + rating + ver pedido */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fonts.robotoMedium,
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
                fontFamily: fonts.robotoRegular,
                fontSize: FontSizes.sm,
                color: colors.textMuted,
              }}
            >
              ({rating.toFixed(1)})
            </Text>
          </View>
        </View>
        <VerBottomSheet onPress={onVerPedido} variant="buyer" />
      </View>

      {/* Teléfono */}
      <View style={{ gap: Spacing.xs }}>
        <View
          style={{
            flexDirection: "row",
            gap: Spacing.md,
            alignItems: "center",
          }}
        >
          <Telephone width={16} height={16} fill={colors.textDefault} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.robotoRegular,
              color: colors.textDefault,
            }}
          >
            {telefono ?? "No disponible"}
          </Text>
        </View>
        {/* <View
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: BorderRadius.md,
            padding: Spacing.md,
          }}
        >
          <Text style={{ fontSize: 14, color: colors.textDefault }}>
            Celular: {telefono ?? "No disponible"}
          </Text>
        </View> */}
      </View>

      <LineaDivisoria />

      {/* Calificación */}
      <CalificacionEstrellas onEnviar={onEnviarCalificacion} />
    </View>
  );
}
