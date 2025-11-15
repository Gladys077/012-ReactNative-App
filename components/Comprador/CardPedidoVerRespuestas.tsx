import { BorderRadius, Spacing } from "@/constants/Tokens";
import { Respuesta } from "@/types/pedidos";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import RespuestasRecibidas from "../subcomponentes/RespuestasRecibidas";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import CardPedidoBase from "./CardPedidoBase";
import CardRespuestaVendedor from "./CardRespuestasVendedor";

interface CardPedidoVerRespuestasProps {
  pedidoId: string | number;
  numeroPedido: number;
  cantidadRespuestas: number;
  estado: EtiqEstadoType;
  expandido?: boolean;
  respuestas?: Respuesta[];
  onToggleExpandir?: (valor: boolean) => void;
  onVerPedido?: (id: string | number) => void;
  onCancelarPedido?: () => void;
  onAceptarRespuesta?: (
    pedidoId: string | number,
    respuestaId: string | number
  ) => void;
  onRechazarRespuesta?: (
    pedidoId: string | number,
    respuestaId: string | number
  ) => void;
  onVerNota?: (nota: string) => void;
  onFinishCronometro?: (
    pedidoId: string | number,
    respuestaId: string | number
  ) => void;
}

export default function CardPedidoVerRespuestas({
  pedidoId,
  numeroPedido,
  cantidadRespuestas,
  estado,
  expandido = false,
  onToggleExpandir,
  onVerPedido,
  respuestas = [],
  onAceptarRespuesta,
  onRechazarRespuesta,
  onVerNota,
  onFinishCronometro,
}: CardPedidoVerRespuestasProps) {
  const { colors } = useTheme();

  const contenidoExpandible =
    respuestas.length === 0 ? null : (
      <View
        style={{
          gap: Spacing.lg,
          borderRadius: BorderRadius.md,
          marginTop: Spacing.sm,
          paddingHorizontal: Spacing.lg,
          paddingBottom: Spacing.xxl,
        }}
      >
        {respuestas.map((respuesta) => (
          <CardRespuestaVendedor
            key={respuesta.id}
            respuestaId={respuesta.id}
            vendedorNombre={respuesta.vendedorNombre}
            rating={respuesta.rating}
            precio={respuesta.precio}
            nota={respuesta.nota}
            duracionCronometro={respuesta.duracionCronometro}
            onAceptar={() => onAceptarRespuesta?.(pedidoId, respuesta.id)}
            onRechazar={() => onRechazarRespuesta?.(pedidoId, respuesta.id)}
            onFinishCronometro={() => onFinishCronometro?.(pedidoId, respuesta.id)}
            onVerNota={onVerNota}
          />
        ))}
      </View>
    );

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.lg,
      }}
    >
      <CardPedidoBase
        numeroPedido={numeroPedido}
        estado={estado}
        expandido={expandido}
        onToggleExpandir={onToggleExpandir}
        mostrarToggle={!!onToggleExpandir}
        textoMostrar="Mostrar respuestas recibidas"
        textoOcultar="Ocultar respuestas recibidas"
        mostrarDivisor
        mostrarMascota={expandido}
        mascotaMensaje="Para continuar, elige uno de los presupuestos recibidos."
        mascotaVariante="message"
        elevation={expandido ? 0 : 5}
        contenidoExpandible={contenidoExpandible}
      >
        {/* Respuestas Recibidas (solo al estar colapsado) */}
        {!expandido && <RespuestasRecibidas cantidad={cantidadRespuestas} />}

        {/* Botón ver pedido */}
        <VerBottomSheet
          onPress={() => onVerPedido?.(pedidoId)}
          variant="buyer"
        />
      </CardPedidoBase>
    </View>
  );
}
