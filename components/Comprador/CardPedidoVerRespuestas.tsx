import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View } from "react-native";
import EtiqEstadoDelPedido from "../subcomponentes/EtiqEstadoDelPedido";
import LinkFraseIcon from "../subcomponentes/LinkFraseIcon";
import MascotaConMensaje from "../subcomponentes/MascotaConMensaje";
import PedidoNumero from "../subcomponentes/PedidoNumero";
import RespuestasRecibidas from "../subcomponentes/RespuestasRecibidas";
import ToggleExpandir from "../subcomponentes/ToggleExpandir";

interface CardPedidoVerRespuestasProps {
  id: string | number;
  numeroPedido: number;
  cantidadRespuestas: number;
  expandido: boolean;
  setExpandido: (valor: boolean) => void;
  onVerPedido?: (id: string | number) => void;
}

export default function CardPedidoVerRespuestas({
  id,
  numeroPedido,
  cantidadRespuestas,
  expandido,
  setExpandido,
  onVerPedido,
}: CardPedidoVerRespuestasProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.md,
        padding: Spacing.xl,
        gap: Spacing.md,
        elevation: 5,
        // borderWidth: expandido ? 2 : 0,
        // borderColor: expandido ? colors.brandBuyer : "transparent",
      }}
    >
      {/* Header: número de pedido + etiqueta */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <PedidoNumero numero={numeroPedido} />
        <EtiqEstadoDelPedido estado="Ver Respuestas" />
      </View>

      {/* Resumen de respuestas */}
      {!expandido && <RespuestasRecibidas cantidad={cantidadRespuestas} />}

      {/* Link para ver pedido */}
      <LinkFraseIcon label="Ver pedido" onPress={() => onVerPedido?.(id)} />

      {/* Mascota visible solo cuando está expandido */}
      {expandido && (
        <MascotaConMensaje
          mensaje="Elige el presupuesto que prefieras para recibir los datos de pago."
          varianteBg="primary"
        />
      )}

      {/* Separador */}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.textMuted,
          marginVertical: Spacing.md,
        }}
      />

      {/* Toggle expandir */}
      <ToggleExpandir
        textoMostrar="Mostrar respuestas recibidas"
        textoOcultar="Ocultar respuestas recibidas"
        colorTexto={colors.brandBuyer}
        onToggle={(estado) => setExpandido(estado)}
      />
    </View>
  );
}
