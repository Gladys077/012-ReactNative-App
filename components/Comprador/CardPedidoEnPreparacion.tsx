import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardRespVendPedEnPrep from "./CardRespVendPedEnPrep";

interface CardPedidoEnPreparacionProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  fechaConfirmacion?: string;
  vendedorNombre: string;
  rating: number;
  telefono?: string;
  direccion: string;
  onVerPedido: (id: string | number) => void;
}

export default function CardPedidoEnPreparacion({
  pedidoId,
  fechaSeleccion,
  fechaConfirmacion,
  vendedorNombre,
  rating,
  telefono,
  direccion,
  onVerPedido,
}: CardPedidoEnPreparacionProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(true);

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion}
      estado="En preparación"
      expandido={expandido}
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
      textoMostrar="Mostrar detalles"
      textoOcultar="Ocultar detalles"
      mostrarMascota
      mascotaMensaje="¡Buenas noticias! Tu pago fue confirmado y tu pedido está siendo preparado."
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
          <CardRespVendPedEnPrep
            vendedorNombre={vendedorNombre}
            rating={rating}
            telefono={telefono}
            direccion={direccion}
            fechaConfirmacion={fechaConfirmacion}
            onVerPedido={() => onVerPedido(pedidoId)}
          />
        </View>
      }
    >
      <LineaEstadoPedido estadoActual="Preparacion" />
    </CardPedidoBase>
  );
}
