import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import EstrellaReputacion from "../subcomponentes/EstrellaReputacion";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";

interface CardRespVendedorBaseProps {
    id: number;
  vendedorNombre: string;
  rating: number;
  children?: React.ReactNode;
  onVerPedido?: (id: number) => void;
  elevation?: number;
}

/**
 * Card base reutilizable para todas las respuestas del vendedor.
 * Proporciona estructura, estilos y encabezado común (nombre, rating, botón "Ver pedido").
 */
export default function CardRespVendedorBase({
  id,
  vendedorNombre,
  rating,
  children,
  onVerPedido,
  elevation = 2,
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
        elevation,
        marginHorizontal: 8,
        marginVertical: 8,
      }}
    >
      {/* Header: nombre + rating + "Ver pedido" */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: Spacing.md,
        }}
      >
        {/* Nombre + Rating */}
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

        {/* Ver pedido */}
       <VerBottomSheet onPress={() => onVerPedido?.(id)} variant="buyer"/>

      </View>

      {/* Contenido variable (pasa cada card específica) */}
      <View>{children}</View>
    </View>
  );
}
