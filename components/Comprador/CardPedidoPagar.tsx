import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardPedidoBase from "./CardPedidoBase";
import CardVendedorPagoDireccion from "./CardVendedorPagoDireccion";

interface CardPedidoPagarProps {
  pedidoId: string | number;
  numeroPedido: number;
  estado: EtiqEstadoType;
  monto: number;
  nombreNegocio: string;
  rating: number;
  alias: string;
  entidad: string;
  titular: string;
  direccion: string;
  nota?: string;
  duracionCronometro?: number;
  onVerPedido?: (id: string | number) => void;
  onEditarDireccion?: () => void;
  onFinishCronometro?: (pedidoId: string | number, respuestaId: string | number) => void;
}

export default function CardPedidoPagar({
  pedidoId,
  numeroPedido,
  estado,
  monto,
  nombreNegocio,
  rating,
  alias,
  entidad,
  titular,
  direccion,
  nota,
  duracionCronometro,
  onVerPedido,
  onEditarDireccion,
  onFinishCronometro,
}: CardPedidoPagarProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado={estado}
      expandido={expandido}
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
      textoMostrar="Mostrar detalles"
      textoOcultar="Ocultar detalles"
      mostrarMascota
      mascotaMensaje="Elegí tu forma de pago y confirmá la dirección de entrega. ¡Gracias!"
      mascotaVariante="message"
      mostrarDivisor
      elevation={expandido ? 0 : 5}
      contenidoExpandible={
        <View
          style={{
            marginTop: Spacing.lg,
            backgroundColor: colors.cardBg,
            borderRadius: BorderRadius.md,
          }}
        >
          <CardVendedorPagoDireccion
            pedidoId={pedidoId}
            respuestaId={undefined}
            nombreNegocio={nombreNegocio}
            rating={rating}
            monto={monto}
            nota={nota}
            duracionCronometro={15}
            alias={alias}
            entidad={entidad}
            titular={titular}
            direccion={direccion}
            onEditarDireccion={onEditarDireccion ?? (() => {})}
            onVerPedido={() => onVerPedido?.(pedidoId)}
            onFinishCronometro={onFinishCronometro}
          />
        </View>
      }
    >
      {/* Estado visual del pedido */}
      <LineaEstadoPedido estadoActual="Pago" />

      {/* Monto a pagar */}
      <Text
        style={{
          fontFamily: "Roboto-Medium",
          fontSize: FontSizes.base,
          color: colors.textDefault,
          backgroundColor: colors.background,
          padding: 4,
          textAlign: "center",
          margin: 4,
        }}
      >
        Monto a pagar: {" $  "}
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.xl,
            color: colors.textDefault,
          }}
        >
          {monto.toLocaleString("es-AR")}
        </Text>
      </Text>
    </CardPedidoBase>
  );
}
