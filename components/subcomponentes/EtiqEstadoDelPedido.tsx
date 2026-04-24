import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

// Defino las variantes (clave)
export type EtiqEstadoType =
  | "En proceso"
  | "Ver respuestas"
  | "Pago y dirección"
  | "Pago en revisión"
  | "A resolver"
  | "En preparación"
  | "En camino"
  | "Pedido recibido"
  | "Completado"
  | "Nuevo pedido"
  | "Presupuestado"
  | "Pago pendiente"
  | "Pago recibido"
  | "Listo. Enviar!"
  | "Enviado"
  | "Entregado"
  | "Cancelado";

// Interface: para definir objetos con propiedades (= datos q recibe el componente)
interface EtiqEstadoDelPedidoProps {
  estado: EtiqEstadoType;
}

// Por c/clave de tipo EtiqEstadoType, quiero un objeto con bg y dot, ambos string
const EtiqEstadoDelPedido: React.FC<EtiqEstadoDelPedidoProps> = ({
  estado,
}) => {
  const { colors, fonts } = useTheme();

  // Clave= nombre del estado y Valor= objeto con los colores: bg(suave) y dot(punto intenso)
  const estadoColors: Record<EtiqEstadoType, { bg: string; dot: string }> = {
    "En proceso": {
      bg: colors.statusTurquoiseBg,
      dot: colors.statusTurquoiseDot,
    },
    "Ver respuestas": { bg: colors.statusBlueBg, dot: colors.statusBlueDot },
    "Pago y dirección": { bg: colors.statusRedBg, dot: colors.statusRedDot },
    "Pago en revisión": { bg: colors.statusMintBg, dot: colors.statusMintDot },
    "A resolver": { bg: colors.statusOrangeBg, dot: colors.statusOrangeDot },
    "En preparación": {
      bg: colors.statusYellowBg,
      dot: colors.statusYellowDot,
    },
    "En camino": { bg: colors.statusCyanBg, dot: colors.statusCyanDot },
    "Pedido recibido": {
      bg: colors.statusLavenderBg,
      dot: colors.statusLavenderDot,
    },
    Completado: { bg: colors.statusGreenBg, dot: colors.statusGreenDot },

    "Nuevo pedido": { bg: colors.statusOrangeBg, dot: colors.statusOrangeDot },
    Presupuestado: { bg: colors.statusMintBg, dot: colors.statusMintDot },
    "Pago pendiente": { bg: colors.statusRedBg, dot: colors.statusRedDot },
    "Pago recibido": { bg: colors.statusGreenBg, dot: colors.statusGreenDot },
    "Listo. Enviar!": {
      bg: colors.statusPurpleBg,
      dot: colors.statusPurpleDot,
    },
    Enviado: { bg: colors.statusBlueBg, dot: colors.statusBlueDot },
    Entregado: { bg: colors.statusPurpleBg, dot: colors.statusPurpleDot },
    Cancelado: { bg: colors.statusCanceledBg, dot: colors.statusCanceledDot },
  };

  const colorSet = estadoColors[estado];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 155,
        height: 24,
        backgroundColor: colorSet.bg,
        borderRadius: BorderRadius.lg,
        gap: Spacing.md,
        paddingHorizontal: Spacing.md,
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 50,
          backgroundColor: colorSet.dot,
          marginLeft: 8,
        }}
      />
      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          marginRight: 8,
        }}
      >
        {estado}
      </Text>
    </View>
  );
};

export default EtiqEstadoDelPedido;
