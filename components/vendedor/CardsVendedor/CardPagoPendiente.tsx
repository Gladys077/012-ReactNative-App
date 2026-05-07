import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import CardVendedorBase from "./CardVendedorBase";

interface CardPagoPendienteProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  nota?: string;
  precio: number;
}

// Subcomponente interno: muestra el texto del pedido y nota opcional
const ContenidoExpandible = ({
  textoPedido,
  nota,
}: {
  textoPedido: string;
  nota?: string;
}) => {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ gap: Spacing.lg, marginTop: Spacing.md }}>
      {/* Texto del pedido */}
      <Text
        style={{
          fontSize: FontSizes.sm,
          fontFamily: fonts.robotoRegular,
          color: colors.textDefault,
          lineHeight: 22,
          backgroundColor: colors.bgSubMenuPendientes,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
        }}
      >
        {textoPedido}
      </Text>

      {/* Nota inline (solo en esta card) */}
      {nota && nota.trim() !== "" && (
        <View
          style={{
            borderLeftWidth: 3,
            borderLeftColor: colors.brandSeller,
            paddingLeft: Spacing.md,
            paddingVertical: Spacing.xs,
            backgroundColor: colors.textSecondaryBg,
            borderRadius: BorderRadius.sm,
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.sm,
              fontFamily: fonts.robotoRegular,
              color: colors.textDefault,
            }}
          >
            <Text style={{ fontFamily: fonts.robotoBold }}>Nota: </Text>
            {nota}
          </Text>
        </View>
      )}
    </View>
  );
};

const ESTADO: EtiqEstadoType = "Pago pendiente";

export default function CardPagoPendiente({
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  nota,
  precio,
}: CardPagoPendienteProps) {
  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      precio={precio}
      contenidoExpandible={
        <ContenidoExpandible textoPedido={textoPedido} nota={nota} />
      }
    />
  );
}
