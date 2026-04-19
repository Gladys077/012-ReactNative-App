import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardPedidoBase from "./CardPedidoBase";
import CardVendedorPagoDireccion from "./CardVendedorPagoDireccion";

interface CardPedidoPagoYDireccionProps {
  pedidoId: string | number;
  respuestaId: string | number;
  fechaSeleccion?: string;
  estado: EtiqEstadoType;
  expandidoInicial?: boolean;
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
  onVerNota?: (nota: string) => void;
  onFinishCronometro?: (
    pedidoId: string | number,
    respuestaId: string | number,
  ) => void;
  onCancelarPedido?: () => void;
  onEnviarDatos?: (payload: {
    pedidoId: string | number;
    formaPago: "transferencia" | "efectivo";
    comprobante: { uri: string; name: string } | null;
    importeEfectivo: string;
    direccion: string;
  }) => void;
}

export default function CardPedidoPagoYDireccion({
  pedidoId,
  respuestaId,
  fechaSeleccion,
  estado,
  expandidoInicial = true,
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
  onCancelarPedido,
  onEnviarDatos,
}: CardPedidoPagoYDireccionProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(expandidoInicial);

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion}
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
            onCancelarPedido={() => onCancelarPedido?.()}
            onEnviarDatos={onEnviarDatos}
          />
        </View>
      }
    >
      {/* Línea de tiempo */}
      <LineaEstadoPedido estadoActual="Pago" />
    </CardPedidoBase>
  );
}
