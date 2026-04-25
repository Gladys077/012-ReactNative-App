import { BorderRadius, Spacing } from "@/constants/Tokens";
import { Respuesta } from "@/types/pedidos";
import React, { useState } from "react";
import { View } from "react-native";
// import { useTheme } from "../../context/ThemeContext";
import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import RespuestasRecibidas from "../subcomponentes/RespuestasRecibidas";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import CardRespuestaVendedor from "./CardRespuestasVendedor";

interface CardPedidoVerRespuestasProps {
  pedidoId: string | number;
  cantidadRespuestas: number;
  estado: EtiqEstadoType;
  expandido?: boolean;
  respuestas?: Respuesta[];
  onToggleExpandir?: (valor: boolean) => void;
  onVerPedido?: (id: string | number) => void;
  onCancelarPedido?: () => void;
  onAceptarRespuesta?: (
    pedidoId: string | number,
    respuestaId: string | number,
  ) => void;
  onRechazarRespuesta?: (
    pedidoId: string | number,
    respuestaId: string | number,
  ) => void;
  onVerNota?: (nota: string) => void;
  onFinishCronometro?: (
    pedidoId: string | number,
    respuestaId: string | number,
  ) => void;
}

export default function CardPedidoVerRespuestas({
  pedidoId,
  cantidadRespuestas,
  estado,
  onVerPedido,
  respuestas = [],
  onAceptarRespuesta,
  onRechazarRespuesta,
  onVerNota,
  onFinishCronometro,
}: CardPedidoVerRespuestasProps) {
  const contenidoExpandible =
    respuestas.length === 0 ? null : (
      <View
        style={{
          gap: Spacing.lg,
          borderRadius: BorderRadius.md,
          marginTop: Spacing.sm,
          paddingBottom: Spacing.xxl,
        }}
      >
        {respuestas
          // Filtra respuestas sin cronómetro y las que pasan este filtro tienen duracionCronometro: number
          .filter(
            (r): r is Respuesta & { duracionCronometro: number } =>
              r.duracionCronometro !== undefined,
          )
          .map((respuesta) => (
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
              onFinishCronometro={() =>
                onFinishCronometro?.(pedidoId, respuesta.id)
              }
              onVerNota={onVerNota}
            />
          ))}
      </View>
    );

  const [expandido, setExpandido] = useState(false);

  return (
    <CardPedidoBase
      estado={estado}
      expandido={expandido}
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
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
      <VerBottomSheet onPress={() => onVerPedido?.(pedidoId)} variant="buyer" />
    </CardPedidoBase>
  );
}
