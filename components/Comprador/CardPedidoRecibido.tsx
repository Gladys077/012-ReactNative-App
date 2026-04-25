import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardRespVendPedRecibido from "./CardRespVendPedRecibido";

interface CardPedidoRecibidoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  vendedorNombre: string;
  rating: number;
  telefono?: string;
  onVerPedido: (id: string | number) => void;
  onEnviarCalificacion: (data: {
    estrellas: number;
    comentario: string;
  }) => void;
}

export default function CardPedidoRecibido({
  pedidoId,
  fechaSeleccion,
  vendedorNombre,
  rating,
  telefono,
  onVerPedido,
  onEnviarCalificacion,
}: CardPedidoRecibidoProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(true); // expandida por default

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion}
      estado="Pedido recibido"
      expandido={expandido}
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
      textoMostrar="Califica al vendedor"
      textoOcultar="Ocultar"
      mostrarMascota
      mascotaMensaje="¡Listo! Pedido entregado. Recuerda calificar al vendedor."
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
          <CardRespVendPedRecibido
            vendedorNombre={vendedorNombre}
            rating={rating}
            telefono={telefono}
            onVerPedido={() => onVerPedido(pedidoId)}
            onEnviarCalificacion={onEnviarCalificacion}
          />
        </View>
      }
    >
      <LineaEstadoPedido estadoActual="Recibido" />
    </CardPedidoBase>
  );
}
