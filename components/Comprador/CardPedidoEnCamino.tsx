import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import AyudaReportar from "../subcomponentes/AyudaReportar";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import CardRespVendPedEnCamino from "./CardRespVendPedEnCamino";

interface CardPedidoEnCaminoProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  vendedorNombre: string;
  rating: number;
  ratingCount: number;
  telefono: number;
  direccion: string;
  onVerPedido: (id: string | number) => void;
  /** La page es quien abre el sheet — la card solo avisa */
  onAbrirAyuda?: () => void;
}

export default function CardPedidoEnCamino({
  pedidoId,
  fechaSeleccion,
  vendedorNombre,
  rating,
  ratingCount,
  telefono,
  direccion,
  onVerPedido,
  onAbrirAyuda,
}: CardPedidoEnCaminoProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion}
      estado="En camino"
      expandido={expandido}
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
      textoMostrar="Mostrar detalles"
      textoOcultar="Ocultar detalles"
      mostrarMascota
      mascotaMensaje="¡Tu pedido ya va en camino!"
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
            marginBottom: Spacing.lg,
          }}
        >
          <VerBottomSheet
            icon={null}
            onPress={() => onVerPedido?.(pedidoId)}
            variant="buyer"
          />
          <AyudaReportar role="buyer" onPress={() => onAbrirAyuda?.()} />
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
          <CardRespVendPedEnCamino
            vendedorNombre={vendedorNombre}
            rating={rating}
            ratingCount={ratingCount}
            telefono={telefono}
            direccion={direccion}
          />
        </View>
      }
    >
      <LineaEstadoPedido estadoActual="EnCamino" />
    </CardPedidoBase>
  );
}
