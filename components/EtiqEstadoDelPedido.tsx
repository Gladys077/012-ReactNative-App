import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

// Defino las variantes (clave)
type EtiqEstadoType =
  | "Pago Pendiente"
  | "Pago Recibido"
  | "En Preparación"
  | "Listo. Para enviar!"
  | "Enviado"
  | "Entregado"
  | "Pago En Revisión"
  | "Pagar"
  | "Ver Respuestas"
  | "En Camino"
  | "En Proceso"
  | "Pedido Recibido"
  | "Completado";

  // Interface: para definir objetos con propiedades (= datos q recibe el componente)
interface EtiqEstadoDelPedidoProps {
  estado: EtiqEstadoType;
}

// Por c/clave de tipo EtiqEstadoType, quiero un objeto con bg y dot, ambos string
const EtiqEstadoDelPedido: React.FC<EtiqEstadoDelPedidoProps> = ({ estado }) => {
  const { colors } = useTheme();

  // Clave= nombre del estado y Valor= objeto con los colores: bg(suave) y dot(punto intenso)
  const estadoColors: Record<
    EtiqEstadoType,
    { bg: string; dot: string }
  > = {
    "Pago Pendiente": { bg: colors.statusRedBg, dot: colors.statusRedDot },
    "Pagar": { bg: colors.statusRedBg, dot: colors.statusRedDot },
    "Pago Recibido": { bg: colors.statusGreenBg, dot: colors.statusGreenDot },
    "Pago En Revisión": { bg: colors.statusMintBg, dot: colors.statusMintDot },
    "En Preparación": { bg: colors.statusYellowBg, dot: colors.statusYellowDot },
    "Listo. Para enviar!": { bg: colors.statusPurpleBg, dot: colors.statusPurpleDot },
    "Enviado": { bg: colors.statusBlueBg, dot: colors.statusBlueDot },
    "Entregado": { bg: colors.statusPurpleBg, dot: colors.statusPurpleDot },
    "Ver Respuestas": { bg: colors.statusBlueBg, dot: colors.statusBlueDot },
    "En Camino": { bg: colors.statusCyanBg, dot: colors.statusCyanDot },
    "En Proceso": { bg: colors.statusGrayBg, dot: colors.statusGrayDot },
    "Pedido Recibido": { bg: colors.statusLavenderBg, dot: colors.statusLavenderDot },
    "Completado": { bg: colors.statusGreenBg, dot: colors.statusGreenDot },
  };

  const colorSet = estadoColors[estado];

  return (
    <View
      className="flex-row items-center justify-center"
      style={{
        minWidth: 150,
        width: "40%",
        height: 32,
        backgroundColor: colorSet.bg,
        borderRadius: BorderRadius.lg,
        gap: Spacing.md,
        paddingHorizontal: Spacing.md
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 50,
          backgroundColor: colorSet.dot,
          marginLeft: 8
        }}
      />
      <Text
        style={{
          fontFamily: "Roboto-Bold",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          marginRight: 8
        }}
      >
        {estado}
      </Text>
    </View>
  );
};

export default EtiqEstadoDelPedido;
