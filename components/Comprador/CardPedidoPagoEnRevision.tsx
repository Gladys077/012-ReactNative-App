import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import AyudaReportar from "../subcomponentes/AyudaReportar";
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
  ratingCount: number;
  alias: string;
  entidad: string;
  titular: string;
  direccion: string;
  nota?: string;
  duracionCronometro?: number;
  timestampRespuesta: number;
  onVerPedido: (id: string | number) => void;
  onEditarDireccion?: () => void;
  onVerNota?: (nota: string) => void;
  onFinishCronometro?: (
    pedidoId: string | number,
    respuestaId: string | number,
  ) => void;
  onAbrirIssue?: () => void;
}

export default function CardPedidoPagoEnRevision({
  pedidoId,
  respuestaId,
  estado,
  tieneProblema,
  fechaSeleccion,
  onVerPedido,
  onAbrirIssue,
}: CardPedidoPagoEnRevisionProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(true);

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
      // onToggleExpandir={() => setExpandido(!expandido)}
      // SOLO SI HAY PROBLEMA
      // mostrarToggle={tieneProblema}
      // mostrarDivisor={tieneProblema}
      // textoMostrar="Mostrar detalles"
      // textoOcultar="Ocultar detalles"
      mostrarMascota
      mascotaMensaje={
        tieneProblema
          ? "Detectamos un problema con el pago o la dirección."
          : "Estamos verificando tu pago. Esto puede tardar unos minutos."
      }
      mascotaVariante={tieneProblema ? "attention" : "message"}
      mostrarDivisor
      elevation={expandido ? 0 : 5}
      contenidoPreToggle={
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: Spacing.sm,
          }}
        >
          <VerBottomSheet
            icon={null}
            onPress={() => onVerPedido?.(pedidoId)}
            variant="buyer"
          />
          <AyudaReportar role="buyer" onPress={() => onAbrirIssue?.()} />
        </View>
      }
      // contenidoPosMascota={
      //   <AyudaReportar role="buyer" onPress={() => onAbrirIssue?.()} />
      // }
      contenidoExpandible={
        <View
          style={{
            marginTop: Spacing.lg,
            backgroundColor: colors.cardBg,
            borderRadius: BorderRadius.md,
          }}
        >
          {/* acá después va el detalle del problema */}
        </View>
      }
    >
      {/* Estado del pedido */}
      <LineaEstadoPedido estadoActual="Verificacion" />
    </CardPedidoBase>
  );
}
