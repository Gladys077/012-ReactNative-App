import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

// Defino las variantes (clave)
type EtiqEstadoType =
  | "En Proceso"
  | "Ver Respuestas"
  | "Pagar"
  | "Pago En Revisión"
  | "En Preparación"
  | "En Camino"
  | "Pedido Recibido"
  | "Completado"
  | "Pago Pendiente"
  | "Pago Recibido"
  | "Listo. Para enviar!"
  | "Enviado"
  | "Entregado"
  | "Cancelado"; 

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
    "En Proceso": { bg: colors.statusTurquoiseBg, dot: colors.statusTurquoiseDot },
    "Ver Respuestas": { bg: colors.statusBlueBg, dot: colors.statusBlueDot },
    "Pagar": { bg: colors.statusRedBg, dot: colors.statusRedDot },
    "Pago En Revisión": { bg: colors.statusMintBg, dot: colors.statusMintDot },
    "En Preparación": { bg: colors.statusYellowBg, dot: colors.statusYellowDot },
    "En Camino": { bg: colors.statusCyanBg, dot: colors.statusCyanDot },
    "Pedido Recibido": { bg: colors.statusLavenderBg, dot: colors.statusLavenderDot },
    "Completado": { bg: colors.statusGreenBg, dot: colors.statusGreenDot },
    "Pago Pendiente": { bg: colors.statusRedBg, dot: colors.statusRedDot },
    "Pago Recibido": { bg: colors.statusGreenBg, dot: colors.statusGreenDot },
    "Listo. Para enviar!": { bg: colors.statusPurpleBg, dot: colors.statusPurpleDot },
    "Enviado": { bg: colors.statusBlueBg, dot: colors.statusBlueDot },
    "Entregado": { bg: colors.statusPurpleBg, dot: colors.statusPurpleDot },
    "Cancelado": { bg: colors.statusCanceledBg, dot: colors.statusCanceledDot },

  };

  const colorSet = estadoColors[estado];

  return (
    <View
      className="flex-row items-center justify-center"
      style={{
        
        minWidth: 150,
        maxWidth: "40%",
        height: 24,
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
