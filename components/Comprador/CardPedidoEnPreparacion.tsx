import CardPedidoBase from "@/components/shared/CardPedidoBase";
import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { View } from "react-native";
import AyudaReportar from "../subcomponentes/AyudaReportar";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import VerBottomSheet from "../subcomponentes/VerBottomSheet";
import CardRespVendPedEnPrep from "./CardRespVendPedEnPrep";

interface CardPedidoEnPreparacionProps {
  pedidoId: string | number;
  fechaSeleccion?: string;
  fechaConfirmacion?: string;
  vendedorNombre: string;
  rating: number;
  ratingCount: number;
  telefono: number;
  direccion: string;
  onVerPedido: (id: string | number) => void;
  onAbrirAyuda?: () => void;
  // onCancelarPedido: () => void;
}

export default function CardPedidoEnPreparacion({
  pedidoId,
  fechaSeleccion,
  fechaConfirmacion,
  vendedorNombre,
  rating,
  ratingCount,
  telefono,
  direccion,
  onVerPedido,
  onAbrirAyuda,
  // onCancelarPedido,
}: CardPedidoEnPreparacionProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);

  return (
    <CardPedidoBase
      fechaSeleccion={fechaSeleccion}
      estado="En preparación"
      expandido={expandido}
      onToggleExpandir={() => setExpandido(!expandido)}
      mostrarToggle
      textoMostrar="Mostrar detalles"
      textoOcultar="Ocultar detalles"
      mostrarMascota
      mascotaMensaje="¡Buenas noticias! Tu pago fue confirmado y tu pedido está siendo preparado."
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
          <CardRespVendPedEnPrep
            vendedorNombre={vendedorNombre}
            rating={rating}
            ratingCount={ratingCount}
            telefono={telefono}
            direccion={direccion}
            fechaConfirmacion={fechaConfirmacion}
          />
        </View>
      }
    >
      <LineaEstadoPedido estadoActual="Preparacion" />
    </CardPedidoBase>
  );
}
