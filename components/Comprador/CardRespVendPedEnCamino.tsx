import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Image, Text, View } from "react-native";
import { Telephone, Ubicacion } from "../icons";
import EstrellaReputacion from "../subcomponentes/EstrellaReputacion";
import LineaDivisoria from "../subcomponentes/LineaDivisoria";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";

interface CardRespVendPedEnCaminoProps {
  vendedorNombre: string;
  rating: number;
  telefono?: string;
  direccion: string;
  onVerPedido: () => void;
}

export default function CardRespVendPedEnCamino({
  vendedorNombre,
  rating,
  telefono,
  direccion,
  onVerPedido,
}: CardRespVendPedEnCaminoProps) {
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

      {/* GIF delivery */}
      <Image
        source={require("@/assets/images/delivery.gif")}
        style={{ width: "100%", height: 150, marginVertical: Spacing.md }}
        resizeMode="contain"
      />

      <LineaDivisoria />

      {/* Dirección */}
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
          <Text style={{ fontSize: 14, color: colors.textDefault }}>
            {direccion}
          </Text>
        </View>
      </View>

      <LineaDivisoria />

      {/* Contacto vendedor */}
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
              fontFamily: fonts.robotoBold,
              fontSize: FontSizes.sm,
              color: colors.textDefault,
            }}
          >
            Contacto con el vendedor
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
          <Text style={{ fontSize: 14, color: colors.textDefault }}>
            {/* TODO: reemplazar por dato real de la BBDD */}
            Celular: {telefono ?? "No disponible"}
          </Text>
        </View>
      </View>
    </View>
  );
}
