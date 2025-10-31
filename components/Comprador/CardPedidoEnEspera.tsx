import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
import Cronometro from "../Cronometro/Cronometro";
import EtiqEstadoDelPedido from "../EtiqEstadoDelPedido";
import PedidoNumero from "../PedidoNumero";
import RespuestasRecibidas from "../RespuestasRecibidas";
import Button from "../UI/Button/Button";

export default function CardPedidoEnEspera() {
  const { colors } = useTheme();

  // TODO Ejemplos de datos (en la versión real vendrán de la API) - VER CON LIO
  const numeroPedido = 2444;
  const estado: "En Proceso" = "En Proceso";

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
      <RespuestasRecibidas/>

      {/* Cronómetro */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center", 
          marginTop: 2,
          gap: 16,
          width: "70%"
        }}
      >
        <Cronometro
          tipo="espera"
          duracionInicial={60} // 1 hora
          onFinish={() => console.log("El tiempo terminó")}
        />

        <Text  style={{
          fontFamily: "Roboto-Regular",
          fontSize: FontSizes.base,
          color: colors.textDefault,
          lineHeight: 18,
          maxWidth: "65%",
        }}
        >
      Pasado este tiempo si no recibe respuesta, se eliminará el pedido.</Text>
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
      <Button
        variant="secondary"
        width="auto"
        align="center" 
        onPress={() => console.log("Cancelar pedido")}
        styleAdd = {{minWidth: 160}}
      >
        Cancelar pedido
      </Button>
    </View>
  );
}
