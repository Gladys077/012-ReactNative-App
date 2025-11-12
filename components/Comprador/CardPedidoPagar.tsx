import { BorderRadius, FontSizes } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardPedidoBase from "./CardPedidoBase";
import CardVendedorPagoDireccion from "./CardVendedorPagoDireccion";

interface CardPedidoPagarProps {
  id: number;
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
  onVerPedido?: (id: number) => void;
  onEditarDireccion?: () => void;
  onFinishCronometro?: (pedidoId: number, respuestaId: string | number) => void;
}

export default function CardPedidoPagar({
  id,
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
  duracionCronometro = 60,
  onVerPedido,
  onEditarDireccion,
  onFinishCronometro,
}: CardPedidoPagarProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.lg,
      }}
    >
      <CardPedidoBase
        numeroPedido={numeroPedido}
        estado="Pagar"
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
      >
        <LineaEstadoPedido estadoActual="Pago" />

        {/* Monto principal */}
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.base,
            color: colors.textDefault,
            textAlign: "center",
          }}
        >
          Monto a abonar:{" "}
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: FontSizes.xl,
              color: colors.textDefault,
            }}
          >
            ${monto.toLocaleString("es-AR")}
          </Text>
        </Text>
      </CardPedidoBase>

      {/* Bloque expandible */}
      {expandido && (
        <CardVendedorPagoDireccion
          id={id}
          nombreNegocio={nombreNegocio}
          rating={rating}
          monto={monto}
          nota={nota}
          duracionCronometro={duracionCronometro}
          alias={alias}
          entidad={entidad}
          titular={titular}
          direccion={direccion}
          onEditarDireccion={onEditarDireccion ?? (() => {})}
          onVerPedido={() => onVerPedido?.(id)}
          // onFinishCronometro={onFinishCronometro}
        />
      )}
    </View>
  );
}
