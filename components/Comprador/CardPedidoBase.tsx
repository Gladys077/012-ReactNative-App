import { BorderRadius, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { View, ViewStyle } from "react-native";
import EtiqEstadoDelPedido, { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import LineaDivisoria from "../subcomponentes/LineaDivisoria";
import MascotaConMensaje from "../subcomponentes/MascotaConMensaje";
import PedidoNumero from "../subcomponentes/PedidoNumero";
import ToggleExpandir from "../subcomponentes/ToggleExpandir";

interface CardPedidoBaseProps {
  numeroPedido: number;
  estado: EtiqEstadoType;
  children?: React.ReactNode;
  expandido?: boolean;
  onToggleExpandir?: (estado: boolean) => void;
  textoMostrar?: string;
  textoOcultar?: string;
  mostrarToggle?: boolean;
  mostrarMascota?: boolean;
  mascotaMensaje?: string;
  mascotaVariante?: "message" | "attention" | "success";
  mascotaPosicion?: "left" | "right";
  mostrarDivisor?: boolean;
  style?: ViewStyle;
  elevation?: number;
  contenidoExpandible?: React.ReactNode;
}

export default function CardPedidoBase({
  numeroPedido,
  estado,
  children,
  expandido = false,
  onToggleExpandir,
  textoMostrar = "Mostrar más",
  textoOcultar = "Ocultar",
  mostrarToggle = false,
  mostrarMascota = false,
  mascotaMensaje,
  mascotaVariante = "message",
  mascotaPosicion = "left",
  mostrarDivisor = false,
  style,
  elevation,
  contenidoExpandible,
}: CardPedidoBaseProps) {
  const { colors } = useTheme();

  // Elevación por defecto: más alta si está colapsada
  const computedElevation = elevation ?? (expandido ? 0 : 5);

  return (
    <View
      style={[
        {
          backgroundColor: colors.cardBg,
          borderRadius: BorderRadius.lg,
          padding: Spacing.xl,
          gap: Spacing.md,
          elevation: computedElevation,
        },
        style,
      ]}
    >
      {/* HEADER: número de pedido + estado (si existe) */}
      {(numeroPedido !== undefined || estado) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          {numeroPedido !== undefined && <PedidoNumero numero={numeroPedido} />}
          {estado && <EtiqEstadoDelPedido estado={estado} />}
        </View>
      )}

      {/* CONTENIDO PERSONALIZADO */}
      {children}


      {/* MASCOTA OPCIONAL */}
      {mostrarMascota && mascotaMensaje && (
        <MascotaConMensaje
          mensaje={mascotaMensaje}
          varianteBg={mascotaVariante}
          posicion={mascotaPosicion}
        />
      )}
      
      {/* SEPARADOR OPCIONAL */}
      {mostrarDivisor && <LineaDivisoria />}

      {/* TOGGLE OPCIONAL */}
      {mostrarToggle && onToggleExpandir && (
        <ToggleExpandir
          textoMostrar={textoMostrar}
          textoOcultar={textoOcultar}
          colorTexto={colors.brandBuyer}
          onToggle={onToggleExpandir}
        />
      )}

      
      {/* AQUÍ VA EL CONTENIDO EXPANDIBLE, DESPUÉS DE TODO */}
      {expandido && contenidoExpandible}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* MODO DE USO EJEMPLO
<CardPedidoBase
  numeroPedido={12345}
  estado="En Proceso"
  mostrarMascota
  mascotaMensaje="Tu pedido está siendo procesado"
  mostrarToggle
  onToggleExpandir={(isExpanded) => console.log("Expandido:", isExpanded)}
>
  <Text>Contenido interno de la card (por ejemplo, detalles del pedido)</Text>
</CardPedidoBase>
*/
/* -------------------------------------------------------------------------- */
