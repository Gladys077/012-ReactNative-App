import CardPedidoBase from "@/components/Comprador/CardPedidoBase";
import React, { useState } from "react";
import { View } from "react-native";
import { BorderRadius, Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";

interface CardPedidoAResolverProps {
  pedidoId: string | number;
  respuestaId: string | number;
  numeroPedido: number;
  precio: number;
  nombreNegocio: string;
  rating: number;
  alias: string;
  entidad: string;
  titular: string;
  direccion: string;
  nota?: string;
  onVerPedido?: (id: string | number) => void;
  onEditarDireccion?: () => void;
  onVerNota?: (nota: string) => void; 
}

export default function CardPedidoAResolver({
  pedidoId,
  respuestaId,
  numeroPedido,
  precio,
  nombreNegocio,
  rating,
  alias,
  entidad,
  titular,
  direccion,
  nota,
  onVerPedido,
  onEditarDireccion,
  onVerNota,
}: CardPedidoAResolverProps) {
   const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado="A resolver"
      expandido={expandido} 
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
      textoMostrar="Mostrar detalle"
      textoOcultar="Ocultar detalles"
      mostrarMascota
      mascotaMensaje="Revisa el mensaje del vendedor y elige qué quieres hacer."
      mascotaVariante="attention"
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
            {/* <CardErrorPagoDireccion /> */}
     </View>
          }
        >
      {/* Línea de tiempo */}
            <LineaEstadoPedido estadoActual="Verificacion" />
      
      
    </CardPedidoBase>
  );
}
