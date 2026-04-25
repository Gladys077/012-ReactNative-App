import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View, ViewStyle } from "react-native";
import EtiqEstadoDelPedido, {
  EtiqEstadoType,
} from "../subcomponentes/EtiqEstadoDelPedido";
import MascotaConMensaje from "../subcomponentes/MascotaConMensaje";
import PedidoNumero from "../subcomponentes/PedidoNumero";
import ToggleExpandir from "../subcomponentes/ToggleExpandir";
import LineaDivisoria from "../UI/LineaDivisoria";

interface CardPedidoBaseProps {
  numeroPedido?: number;
  fechaSeleccion?: string;
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
  fechaSeleccion,
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        {/* Lado izquierdo: número, fecha, o placeholder vacío */}
        <View>
          {numeroPedido !== undefined && <PedidoNumero numero={numeroPedido} />}
          {fechaSeleccion !== undefined && (
            <Text style={{ fontSize: FontSizes.sm, color: colors.textDefault }}>
              {new Date(fechaSeleccion).toLocaleString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          )}
        </View>

        {/* Lado derecho: siempre la etiqueta de estado */}
        {estado && <EtiqEstadoDelPedido estado={estado} />}
      </View>

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
          expandidoInicial={expandido}
          textoMostrar={textoMostrar}
          textoOcultar={textoOcultar}
          colorTexto={colors.brandBuyer}
          onToggle={onToggleExpandir}
        >
          {contenidoExpandible}
        </ToggleExpandir>
      )}
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
