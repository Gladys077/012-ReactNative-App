import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardPedidoBase from "./CardPedidoBase";
import CardVendedorPagoDireccion from "./CardVendedorPagoDireccion";

interface CardPedidoPagarProps {
  pedidoId: string | number;
  respuestaId: string | number;
  numeroPedido: number;
  estado: EtiqEstadoType;
  precio: number;
  nombreNegocio: string;
  rating: number;
  alias: string;
  entidad: string;
  titular: string;
  direccion: string;
  nota?: string;
  duracionCronometro?: number;
  timestampRespuesta: number;
  onVerPedido?: (id: string | number) => void;
  onEditarDireccion?: () => void;
  onVerNota?: (nota: string) => void; // ← AGREGÁ ESTO
  onFinishCronometro?: (pedidoId: string | number, respuestaId: string | number) => void;
}

export default function CardPedidoPagar({
  pedidoId,
  respuestaId,
  numeroPedido,
  estado,
  precio,
  nombreNegocio,
  rating,
  alias,
  entidad,
  titular,
  direccion,
  nota,
  duracionCronometro = 15,
  timestampRespuesta,
  onVerPedido,
  onEditarDireccion,
  onVerNota,
  onFinishCronometro,
}: CardPedidoPagarProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado="Pago y dirección"
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
            respuestaId={respuestaId}
            nombreNegocio={nombreNegocio}
            rating={rating}
            precio={precio}
            nota={nota}
            duracionCronometro={duracionCronometro}
            timestampRespuesta={timestampRespuesta}
            alias={alias}
            entidad={entidad}
            titular={titular}
            direccion={direccion}
            onEditarDireccion={onEditarDireccion ?? (() => {})}
            onVerPedido={() => onVerPedido?.(pedidoId)}
            onVerNota={(nota) => {
              Alert.alert("Nota del vendedor", nota);
            }}
            onFinishCronometro={(pedidoId, respuestaId) => {
              console.log("Tiempo terminado", pedidoId, respuestaId);
            }}
          />
        </View>
      }
    >
      {/* Estado visual del pedido */}
      <LineaEstadoPedido estadoActual="Pago" />


    </CardPedidoBase>
  );
}
