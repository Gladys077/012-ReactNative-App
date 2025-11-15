import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import { EtiqEstadoType } from "../subcomponentes/EtiqEstadoDelPedido";
import LineaDivisoria from '../subcomponentes/LineaDivisoria';
import RespuestasRecibidas from "../subcomponentes/RespuestasRecibidas";
import LinkFraseIcon from "../subcomponentes/VerBottomSheet";
import Button from "../UI/Button/Button";
import CardPedidoBase from "./CardPedidoBase";

interface CardPedidoEnProcesoProps {
  pedidoId: string | number; 
  numeroPedido: number;
  estado: EtiqEstadoType;
  respuestasRecibidas?: number;
  duracionCronometro: number; // en minutos
  onFinishCronometro?: () => void;
  onCancelarPedido?: () => void;
  onVerPedido?: (id: string | number) => void;
}

export default function CardPedidoEnProceso({
  pedidoId,
  numeroPedido,
  estado,
  respuestasRecibidas = 0,
  duracionCronometro,
  onFinishCronometro,
  onCancelarPedido,
  onVerPedido,
}: CardPedidoEnProcesoProps) {
  const { colors } = useTheme();
  const frase =
    "Pasado este tiempo si no recibe respuesta, se eliminará el pedido.";

  return (
    <CardPedidoBase
      numeroPedido={numeroPedido}
      estado="En proceso"
      elevation={5}
    >
      {/* Respuestas recibidas (si hay) */}
      {respuestasRecibidas > 0 && (
        <RespuestasRecibidas cantidad={respuestasRecibidas} />
      )}

      {/* Cronómetro + texto + link */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 4,
          gap: 16,
          width: "98%",
        }}
      >
        {/* Cronómetro */}
        <Cronometro
          id={`pedido_${pedidoId}`}
          tipo="espera"
          duracionInicial={duracionCronometro}
          onFinish={onFinishCronometro}
        />

        {/* Bloque derecho: frase + ver pedido */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: FontSizes.sm,
              color: colors.textDefault,
              marginBottom: 6,
              textAlign: "left",
            }}
          >
            {frase}
          </Text>

          <LinkFraseIcon onPress={() => onVerPedido?.(pedidoId)} />
        </View>
      </View>

      {/* Linea Divisoria */}
      <LineaDivisoria />

      {/* Botón cancelar */}
      <View
        style={{
          alignItems: "center",
          marginBottom: Spacing.lg,
        }}
      >
        <Button
          variant="secondary"
          height="md"
          width="auto"
          onPress={onCancelarPedido}
        >
          Cancelar pedido
        </Button>
      </View>
    </CardPedidoBase>
  );
}


//MODO DE USO:
    {/* <CardPedidoEnProceso
          key={pedido.id}
          pedidoId={pedido.id}
          numeroPedido={pedido.numeroPedido}
          estado="En proceso"
          respuestasRecibidas={pedido.respuestasRecibidas}
          duracionCronometro={60}
          onVerPedido={() => handleVerPedido(pedido.id)}
          onCancelarPedido={() => handleCancelarPedido(pedido.id)}
          onFinishCronometro={() =>
          handleFinishCronometro(pedido.id)
          }
        />*/}