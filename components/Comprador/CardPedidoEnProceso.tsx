import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import EtiqEstadoDelPedido from "../EtiqEstadoDelPedido";
import PedidoNumero from '../PedidoNumero';
import RespuestasRecibidas from "../RespuestasRecibidas";
import Button from "../UI/Button/Button";
import { Clipboard } from "../icons";


interface CardPedidoEnProcesoProps {
  id: string | number;
  numeroPedido: number;
  estado: | "En Proceso"
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
  respuestasRecibidas?: number;
  duracionCronometro: number; // en minutos
  onFinishCronometro?: () => void;
  onCancelarPedido?: () => void;
  onVerPedido?: (id: string | number) => void;
}

export default function CardPedidoEnProceso({
  id,
  numeroPedido,
  estado,
  respuestasRecibidas = 0,
  duracionCronometro,
  onFinishCronometro,
  onCancelarPedido,
  onVerPedido,
}: CardPedidoEnProcesoProps) {
  const { colors } = useTheme();
  const frase = `Pasado este tiempo si no recibe respuesta, se eliminará el pedido.`;

  // TODO: Los datos de la card (nro del pedido, estado del pedido -etiq-, tiempo) vendrán de la API - VER CON LIO

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.md,
        padding: Spacing.xl,
        gap: Spacing.md,
        elevation: 5,
      }}
    >
      {/* Header: pedido número + etiqueta estado */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8
        }}
      >
        <PedidoNumero numero={numeroPedido} />
        
        <EtiqEstadoDelPedido estado={estado} />
      </View>

      {/* Respuestas Recibidas */}
      {respuestasRecibidas > 0 && <RespuestasRecibidas cantidad={respuestasRecibidas} />}

      {/* Cronómetro + frase + link "Ver pedido + icono" */}
      <View
        style={{
          flexDirection: "row",
          // alignItems: "stretch", // <- esto hace que ambos hijos (cronómetro y bloque derecho) tengan la misma altura
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 4,
          gap: 16,
          width: "98%",
        }}
      >
        {/* Cronómetro a la izquierda */}
        <Cronometro
          id={`pedido_${id}`}
          tipo="espera"
          duracionInicial={duracionCronometro}
          onFinish={onFinishCronometro}
        />

        {/* Bloque derecho: texto + link */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Frase alineada a la izquierda */}
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: FontSizes.sm,
              color: colors.textDefault,
              // lineHeight: 18,
              marginBottom: 6,
              textAlign: "left",
            }}
          >
            {frase}
          </Text>

          {/* "Ver pedido" alineado a la derecha */}
          <Pressable
            onPress={() => onVerPedido?.(id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                color: colors.brandBuyer,
                fontSize: FontSizes.sm,
                marginRight: 4,
              }}
            >
              Ver pedido
            </Text>
            <Clipboard
              width={14}
              height={14}
              fill={colors.brandBuyer}
              stroke={colors.brandBuyer}
            />
          </Pressable>
        </View>
      </View>

      {/* Separador (divider) */}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.textMuted,
          marginTop: Spacing.md,
        }}
      />

      {/* BTN "Cancelar Pedido" centrado */}
      <View
        style={{
          alignItems: "center", // centra horizontalmente el contenido
          marginTop: Spacing.xs,
        }}
      >
        <Button
          variant="secondary"
          width="auto"
          onPress={onCancelarPedido}
        >
          Cancelar pedido
        </Button>
      </View>
    </View>
  );
}

// TODO: VER CON LIO función para eliminar el pedido de la API también
