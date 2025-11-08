import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Cancel, Clipboard } from "../icons";

interface PagoTransferenciaProps {
  alias: string;
  entidad: string;
  titular: string;
  comprobanteUri?: string | null;
  onCargarComprobante: () => void;
  onEliminarComprobante: () => void;
}

export default function PagoTransferencia({
  alias,
  entidad,
  titular,
  comprobanteUri,
  onCargarComprobante,
  onEliminarComprobante,
}: PagoTransferenciaProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.textSecondaryBg,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginTop: Spacing.sm,
      }}
    >
      <Text
        style={{
          fontFamily: "Roboto-Regular",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          marginBottom: 4,
        }}
      >
        Alias: <Text style={{ fontFamily: "Roboto-Medium" }}>{alias}</Text>
      </Text>
      <Text
        style={{
          fontFamily: "Roboto-Regular",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          marginBottom: 4,
        }}
      >
        Entidad: <Text style={{ fontFamily: "Roboto-Medium" }}>{entidad}</Text>
      </Text>
      <Text
        style={{
          fontFamily: "Roboto-Regular",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
        }}
      >
        Titular: <Text style={{ fontFamily: "Roboto-Medium" }}>{titular}</Text>
      </Text>

      <Pressable
        onPress={onCargarComprobante}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.brandBuyer,
          borderRadius: BorderRadius.sm,
          paddingVertical: Spacing.sm,
          marginTop: Spacing.md,
          gap: Spacing.xs,
        }}
      >
        <Clipboard width={18} height={18} fill={colors.cardBg} />
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            color: colors.cardBg,
            fontSize: FontSizes.sm,
          }}
        >
          {comprobanteUri ? "Comprobante cargado" : "Cargar comprobante de pago"}
        </Text>
        {comprobanteUri && (
          <Pressable onPress={onEliminarComprobante}>
            <Cancel width={18} height={18} stroke={colors.cardBg} />
          </Pressable>
        )}
      </Pressable>
    </View>
  );
}
