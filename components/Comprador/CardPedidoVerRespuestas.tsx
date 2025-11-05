import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import EtiqEstadoDelPedido from "../EtiqEstadoDelPedido";
import PedidoNumero from "../PedidoNumero";
import RespuestasRecibidas from "../RespuestasRecibidas";
import { FlechaAbajo } from "../icons";
import CardRespuestaVendedor from "./CardRespuestasVendedor";
import MascotaConMensaje from "./MascotaConMensaje";

interface Respuesta {
  id: string | number;
  vendedorNombre: string;
//   vendedorAvatar?: string;
  rating: number;
  precio: number;
  nota?: string;
  duracionCronometro: number;
}

interface CardPedidoVerRespuestasProps {
  id: string | number;
  numeroPedido: number;
  respuestas: Respuesta[];
  onAceptarRespuesta: (respuestaId: string | number) => void;
  onCancelarRespuesta: (respuestaId: string | number) => void;
  onVerNota?: (nota: string) => void;
  onFinishCronometro?: (respuestaId: string | number) => void;
}

export default function CardPedidoVerRespuestas({
  id,
  numeroPedido,
  respuestas,
  onAceptarRespuesta,
  onCancelarRespuesta,
  onVerNota,
  onFinishCronometro,
}: CardPedidoVerRespuestasProps) {
  const { colors } = useTheme();
  const [expandido, setExpandido] = useState(false);
  const [animacion] = useState(new Animated.Value(0));

  const toggleExpandir = () => {
    const toValue = expandido ? 0 : 1;

    Animated.timing(animacion, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpandido(!expandido);
  };

  const rotacion = animacion.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

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
          marginBottom: 8,
        }}
      >
        <PedidoNumero numero={numeroPedido} />
        <EtiqEstadoDelPedido estado="Ver Respuestas" />
      </View>

      {/* Respuestas Recibidas - Solo visible cuando está colapsado */}
      {!expandido && <RespuestasRecibidas cantidad={respuestas.length} />}

      {/* Mascota con mensaje - Solo visible cuando está expandido */}
      {expandido && (
        <MascotaConMensaje
          mensaje="Elige el presupuesto que prefieras para recibir los datos de pago."
          varianteBg="primary"
        />
      )}

      {/* Separador */}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.textMuted,
          marginTop: Spacing.xs,
        }}
      />

      {/* Toggle para mostrar/ocultar respuestas */}
      <Pressable
        onPress={toggleExpandir}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: Spacing.xs,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.sm,
            color: colors.brandBuyer,
            marginRight: 8,
          }}
        >
          {expandido ? "Ocultar respuestas recibidas" : "Mostrar respuestas recibidas"}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotacion }] }}>
          <FlechaAbajo width={18} height={18} stroke={colors.brandBuyer} />
        </Animated.View>
      </Pressable>

      {/* Lista de respuestas - Con animación */}
      {expandido && (
        <Animated.View
          style={{
            opacity: animacion,
            gap: Spacing.xxl,
            marginTop: Spacing.sm,
          }}
        >
          {respuestas.map((respuesta) => (
            <CardRespuestaVendedor
              key={respuesta.id}
              id={respuesta.id}
              vendedorNombre={respuesta.vendedorNombre}
            //   vendedorAvatar={respuesta.vendedorAvatar}
              rating={respuesta.rating}
              precio={respuesta.precio}
              nota={respuesta.nota}
              duracionCronometro={respuesta.duracionCronometro}
              onAceptar={onAceptarRespuesta}
              onCancelar={onCancelarRespuesta}
              onVerNota={onVerNota}
              onFinishCronometro={() => onFinishCronometro?.(respuesta.id)}
            />
          ))}
        </Animated.View>
      )}
    </View>
  );
}