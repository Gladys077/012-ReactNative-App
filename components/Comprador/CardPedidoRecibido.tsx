import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import CardRespVendPedRecibido from "./CardRespVendPedRecibido";

interface CardPedidoRecibidoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  vendedorNombre: string;
  rating: number;
  ratingCount: number;
  telefono: number | undefined;
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
  ratingCount,
  telefono,
  onVerPedido,
  onEnviarCalificacion,
}: CardPedidoRecibidoProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

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
        </View>
      }
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
            ratingCount={ratingCount}
            telefono={telefono}
            onEnviarCalificacion={onEnviarCalificacion}
          />
        </View>
      }
    >
      <LineaEstadoPedido estadoActual="Recibido" />
    </CardPedidoBase>
  );
}
