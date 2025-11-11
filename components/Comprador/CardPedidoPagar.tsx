import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import Button from "../UI/Button/Button";
import CardPedidoBase from "./CardPedidoBase";

interface CardPedidoPagarProps {
  id: number;
  numeroPedido: number;
  estado?: EtiqEstadoType;
  monto?: number; 
  onPagar?: (id: number) => void;
  onVerPedido?: (id: number) => void;
}

export default function CardPedidoPagar({
  id,
  numeroPedido,
  estado = "Pagar",
  monto,
  onPagar,
  onVerPedido,
}: CardPedidoPagarProps) {
  const { colors } = useTheme();

  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado={estado}
      mostrarMascota
      mascotaMensaje="Tu pedido está listo para pagar."
      mascotaVariante="attention"
      elevation={5}
    >
      {/* Monto a pagar */}
      {monto !== undefined && (
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.lg,
            color: colors.textDefault,
            textAlign: "center",
          }}
        >
          Monto a abonar: ${monto.toLocaleString("es-AR")}
        </Text>
      )}

      {/* Botones de acción */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: Spacing.md,
          marginTop: Spacing.md,
        }}
      >
        {onVerPedido && (
          <Button
            variant="secondary"
            height="md"
            width="auto"
            onPress={() => onVerPedido(id)}
          >
            Ver pedido
          </Button>
        )}

        <Button
          variant="primary"
          height="md"
          width="auto"
          onPress={() => onPagar?.(id)}
        >
          Realizar pago
        </Button>
      </View>
    </CardPedidoBase>
  );
}


// MODO DE USO:
// case "Pagar":
//   return (
//     <CardPedidoPagar
//       key={pedido.id}
//       id={pedido.id}
//       numeroPedido={pedido.numeroPedido}
//       estado={pedido.estado}
//       monto={pedido.respuestaSeleccionada?.precio}
//       onPagar={handlePagar}
//       onVerPedido={handleVerPedido}
//     />
//   );