import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Animated, Text, View } from "react-native";
import EtiqEstadoDelPedido from "../subcomponentes/EtiqEstadoDelPedido";
import LineaEstadoPedido from "../subcomponentes/LineaEstadoPedido";
import PedidoNumero from "../subcomponentes/PedidoNumero";
import ToggleExpandir from "../subcomponentes/ToggleExpandir";

interface CardPedidoPagarProps {
  id: string | number;
  numeroPedido: number;
  estadoActual: "Pago" | "Verificacion" | "Preparacion" | "EnCamino" | "Entregado";
  onVerPedido?: (id: string | number) => void;
}

export default function CardPedidoPagar({
  id,
  numeroPedido,
  estadoActual,
  onVerPedido,
}: CardPedidoPagarProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);
  const [animacion] = useState(new Animated.Value(0));



 

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.md,
        padding: Spacing.xl,
        gap: Spacing.md,
        elevation: 5,
        borderWidth: expandido ? 2 : 0,
        borderColor: expandido ? colors.brandBuyer : "transparent",
      }}
    >
      {/* Header: Pedido número + etiqueta */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: Spacing.xl,
        }}
      >
        <PedidoNumero numero={numeroPedido} />
        <EtiqEstadoDelPedido estado="Pagar" />
      </View>

      {/* Línea de tiempo del pedido */}
      <LineaEstadoPedido estadoActual={"Pago"} />

      {/* Separador */}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.textMuted,
          marginVertical: Spacing.md,
        }}
      />

      {/* Toggle para mostrar/ocultar detalles */}
      <ToggleExpandir
        textoMostrar="Mostrar respuestas recibidas"
        textoOcultar="Ocultar respuestas recibidas"
        colorTexto={colors.brandBuyer}
        onToggle={(estado) => setExpandido(estado)}
      />

      {/* Contenido expandido - Aquí irá la card del vendedor */}
      {expandido && (
        <Animated.View
          style={{
            opacity: animacion,
            marginTop: Spacing.sm,
          }}
        >
          <Text style={{ color: colors.brandBuyer }}>
            {/* Aquí irá la nueva versión de CardVendedor */}
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

