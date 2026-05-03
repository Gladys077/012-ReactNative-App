import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { EtiqEstadoType } from "../../subcomponentes/EtiqEstadoDelPedido";
import CardVendedorBase from "./CardVendedorBase";

interface CardPresupuestadoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  compradorNombre?: string;
  compradorRating?: number;
  textoPedido: string;
  precioEnviado: number;
  notaEnviada?: string;
}

const ContenidoExpandible = ({
  textoPedido,
  notaEnviada,
}: {
  textoPedido: string;
  notaEnviada?: string;
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
          backgroundColor: colors.textSecondaryBg,
          borderRadius: BorderRadius.md,
          padding: Spacing.md,
        }}
      >
        {textoPedido}
      </Text>

      {/* Nota inline — solo si existe */}
      {notaEnviada && notaEnviada.trim() !== "" && (
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
            {notaEnviada}
          </Text>
        </View>
      )}
    </View>
  );
};

const ESTADO: EtiqEstadoType = "Presupuestado";

export default function CardPresupuestado({
  fechaSeleccion,
  compradorNombre,
  compradorRating,
  textoPedido,
  precioEnviado,
  notaEnviada,
}: CardPresupuestadoProps) {
  return (
    <CardVendedorBase
      fechaSeleccion={fechaSeleccion}
      estado={ESTADO}
      compradorNombre={compradorNombre}
      compradorRating={compradorRating}
      precio={precioEnviado}
      contenidoExpandible={
        <ContenidoExpandible
          textoPedido={textoPedido}
          notaEnviada={notaEnviada}
        />
      }
    />
  );
}
