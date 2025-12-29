import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import CardPedidoBase from "./CardPedidoBase";

interface CardPedidoPagoEnRevisionProps {
  pedidoId: string | number;
  respuestaId: string | number;
  numeroPedido: number;
  estado: EtiqEstadoType;
  tieneProblema?: boolean;
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

export default function CardPedidoPagoEnRevision({
  pedidoId,
  respuestaId,
  numeroPedido,
  estado,
  tieneProblema,
}: CardPedidoPagoEnRevisionProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado="Pago en revisión"
      expandido={expandido}
      onToggleExpandir={() => setExpandido(!expandido)}

      // SOLO SI HAY PROBLEMA
      mostrarToggle={tieneProblema}
      mostrarDivisor={tieneProblema}

      textoMostrar="Mostrar detalles"
      textoOcultar="Ocultar detalles"

      mostrarMascota
      mascotaMensaje={
        tieneProblema
          ? "Detectamos un problema con el pago o la dirección."
          : "Estamos verificando tu pago. Esto puede tardar unos minutos."
      }
      mascotaVariante={tieneProblema ? "attention" : "message"}

      elevation={expandido ? 0 : 5}

      contenidoExpandible={
        <View
          style={{
            marginTop: Spacing.lg,
            backgroundColor: colors.cardBg,
            borderRadius: BorderRadius.md,
          }}
        >
          {/* acá después va el detalle del error */}
        </View>
      }
    >
      {/* Estado visual del pedido */}
      <LineaEstadoPedido estadoActual="Verificacion" />
    </CardPedidoBase>
  );
}
