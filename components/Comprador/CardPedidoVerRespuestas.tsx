import { BorderRadius, Spacing } from "@/constants/Tokens";
import React from "react";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import RespuestasRecibidas from "../subcomponentes/RespuestasRecibidas";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import CardPedidoBase from "./CardPedidoBase";
import CardRespuestaVendedor from "./CardRespuestasVendedor";

interface Respuesta {
  id: string | number;
  vendedorNombre: string;
  rating: number;
  precio: number;
  nota?: string;
  duracionCronometro: number;
}

interface CardPedidoVerRespuestasProps {
  id: number;
  numeroPedido: number;
  cantidadRespuestas: number;
  estado: EtiqEstadoType;
  expandido?: boolean;
  respuestas?: Respuesta[];
  onToggleExpandir?: (valor: boolean) => void;
  onVerPedido?: (id: number) => void;
  // onCancelarPedido?: (id: number) => void;
  onAceptarRespuesta?: (pedidoId: number, respuestaId: string | number) => void;
  onCancelarRespuesta?: (pedidoId: number, respuestaId: string | number) => void;
  onVerNota?: (nota: string) => void;
  onFinishCronometro?: (pedidoId: number, respuestaId: string | number) => void;
}

export default function CardPedidoVerRespuestas({
  id,
  numeroPedido,
  cantidadRespuestas,
  estado,
  expandido = false,
  onToggleExpandir,
  onVerPedido,
  // onCancelarPedido,
  respuestas = [],
  onAceptarRespuesta,
  onCancelarRespuesta,
  onVerNota,
  onFinishCronometro,
}: CardPedidoVerRespuestasProps) {
    const { colors } = useTheme();
  
  return (
    <View
     style={{ backgroundColor: colors.cardBg, borderRadius: BorderRadius.lg }}
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
    >
      {/* Respuestas Recibidas - Solo cuando está colapsado */}
      {!expandido && <RespuestasRecibidas cantidad={cantidadRespuestas} />}

      {/* Botones */}
      <VerBottomSheet onPress={() => onVerPedido?.(id)} variant="buyer"/>
      
  </CardPedidoBase>

      {/* Lista de respuestas - Solo cuando está expandido */}
      {expandido && respuestas.length > 0 && (
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
              id={respuesta.id}
              vendedorNombre={respuesta.vendedorNombre}
              rating={respuesta.rating}
              precio={respuesta.precio}
              nota={respuesta.nota}
              duracionCronometro={respuesta.duracionCronometro}
              onAceptar={(respuestaId) => onAceptarRespuesta?.(id, respuestaId)}
              onCancelar={(respuestaId) => onCancelarRespuesta?.(id, respuestaId)}
              onVerNota={onVerNota}
              onFinishCronometro={() => onFinishCronometro?.(id, respuesta.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
}