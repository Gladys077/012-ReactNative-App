import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardRespVendPedEnCamino from "./CardRespVendPedEnCamino";

interface CardPedidoEnCaminoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  vendedorNombre: string;
  rating: number;
  telefono?: string;
  direccion: string;
  onVerPedido: (id: string | number) => void;
}

export default function CardPedidoEnCamino({
  pedidoId,
  fechaSeleccion,
  vendedorNombre,
  rating,
  telefono,
  direccion,
  onVerPedido,
}: CardPedidoEnCaminoProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(true);

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion}
      estado="En camino"
      expandido={expandido}
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
      textoMostrar="Ocultar detalles"
      textoOcultar="Mostrar detalles"
      mostrarMascota
      mascotaMensaje="¡Tu pedido ya va en camino!"
      mascotaVariante="success"
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
          <CardRespVendPedEnCamino
            vendedorNombre={vendedorNombre}
            rating={rating}
            telefono={telefono}
            direccion={direccion}
            onVerPedido={() => onVerPedido(pedidoId)}
          />
        </View>
      }
    >
      <LineaEstadoPedido estadoActual="EnCamino" />
    </CardPedidoBase>
  );
}
