import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";

interface CardPedidoPagoEnRevisionProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  respuestaId: string | number;
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
  onFinishCronometro?: (
    pedidoId: string | number,
    respuestaId: string | number,
  ) => void;
}

export default function CardPedidoPagoEnRevision({
  pedidoId,
  respuestaId,
  estado,
  tieneProblema,
  fechaSeleccion,
  onVerPedido,
}: CardPedidoPagoEnRevisionProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

  // const horaFormateada = fechaSeleccion
  //   ? new Date(fechaSeleccion).toLocaleTimeString("es-AR", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     })
  //   : null;

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion} // Para identificar el pedido y diferenciarlo de otros
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
      {/* Estado del pedido */}
      <LineaEstadoPedido estadoActual="Verificacion" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: Spacing.sm,
        }}
      >
        {/* {horaFormateada && (
          <Text style={{ fontSize: FontSizes.sm, color: colors.textMuted }}>
            Pedido a las {horaFormateada}
          </Text>
        )} */}
        <VerBottomSheet
          onPress={() => onVerPedido?.(pedidoId)}
          variant="buyer"
        />
      </View>
    </CardPedidoBase>
  );
}
