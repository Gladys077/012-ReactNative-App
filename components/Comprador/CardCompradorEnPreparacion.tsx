import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { Check } from "../icons";
import EstrellaReputacion from "../subcomponentes/EstrellaReputacion";
import LineaDivisoria from "../subcomponentes/LineaDivisoria";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";

interface CardCompradorEnPreparacionProps {
  vendedorNombre: string;
  rating: number;
  telefono?: string;
  direccion: string;
  fechaConfirmacion?: string;
  onVerPedido: () => void;
}

export default function CardCompradorEnPreparacion({
  vendedorNombre,
  rating,
  telefono,
  direccion,
  fechaConfirmacion,
  onVerPedido,
}: CardCompradorEnPreparacionProps) {
  const { colors, fonts } = useTheme();

  const fechaFormateada = fechaConfirmacion
    ? new Date(fechaConfirmacion).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

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

      {/* Pago confirmado */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.md,
          backgroundColor: colors.statusGreenBg,
          borderRadius: BorderRadius.md,
          padding: Spacing.lg,
          marginTop: Spacing.lg,
          marginBottom: Spacing.sm,
        }}
      >
        <Check width={28} height={28} fill={colors.success} />
        <View>
          <Text
            style={{
              fontFamily: fonts.robotoBold,
              fontSize: FontSizes.base,
              color: colors.textDefault,
            }}
          >
            Pago Confirmado
          </Text>
          {fechaFormateada && (
            <Text
              style={{
                fontFamily: fonts.robotoRegular,
                fontSize: FontSizes.sm,
                color: colors.textMuted,
              }}
            >
              Confirmado: {fechaFormateada}
            </Text>
          )}
        </View>
      </View>

      <LineaDivisoria />

      {/* Dirección */}
      <View style={{ gap: Spacing.xs }}>
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
            marginBottom: Spacing.md,
          }}
        >
          📍 Dirección de entrega
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: BorderRadius.md,
            padding: Spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: colors.textDefault,
            }}
          >
            {direccion}
          </Text>
        </View>
        <Text
          style={{
            fontSize: FontSizes.xs,
            color: colors.textMuted,
          }}
        >
          Tiempo de entrega máximo: 1 hora
        </Text>
      </View>

      <LineaDivisoria />

      {/* Contacto vendedor */}
      <View style={{ gap: Spacing.xs }}>
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
            marginBottom: Spacing.md,
          }}
        >
          📞 Contacto con el vendedor
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: BorderRadius.md,
            padding: Spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.sm,
              color: colors.textDefault,
            }}
          >
            {/* TODO: reemplazar por dato real de la BBDD */}
            Celular: {telefono ?? "No disponible"}
          </Text>
        </View>
      </View>
    </View>
  );
}
