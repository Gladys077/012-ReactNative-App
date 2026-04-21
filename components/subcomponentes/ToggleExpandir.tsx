import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
  ViewStyle,
} from "react-native";
import { FlechaAbajo } from "../icons";

type ToggleExpandirProps = {
  textoMostrar?: string;
  textoOcultar?: string;
  colorTexto?: string;
  onToggle?: (expandido: boolean) => void;
  style?: ViewStyle;
  children?: React.ReactNode; // el contenido expandible
};

const ToggleExpandir: React.FC<ToggleExpandirProps> = ({
  textoMostrar = "Mostrar contenido",
  textoOcultar = "Ocultar contenido",
  colorTexto,
  onToggle,
  style,
  children,
}) => {
  const { colors, fonts } = useTheme();
  const [expandido, setExpandido] = useState(false);
  const animacion = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      try {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      } catch {
        // ignorar
      }
    }
  }, []);

  const toggleExpandir = () => {
    const nuevoEstado = !expandido;
    setExpandido(nuevoEstado);
    onToggle?.(nuevoEstado);

    Animated.timing(animacion, {
      toValue: nuevoEstado ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const rotacion = animacion.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });

  const altura = animacion.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[{ width: "100%" }, style]}>
      {/* Botón toggle */}
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
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.sm,
            color: colorTexto || colors.textDefault,
            marginRight: 8,
            letterSpacing: 0.3,
          }}
        >
          {expandido ? textoMostrar : textoOcultar}
        </Text>

        <Animated.View style={{ transform: [{ rotate: rotacion }] }}>
          <FlechaAbajo
            width={18}
            height={18}
            stroke={colorTexto || colors.textDefault}
          />
        </Animated.View>
      </Pressable>

      {/* Contenido expandible animado */}
      <Animated.View
        style={{
          opacity: animacion,
          transform: [
            {
              scaleY: altura,
            },
          ],
        }}
      >
        {expandido && children}
      </Animated.View>
    </View>
  );
};

export default ToggleExpandir;

//MODO DE USO: en CardPedidoVerRespuestas
{
  /* <ToggleExpandir
  textoMostrar="Mostrar respuestas recibidas"
  textoOcultar="Ocultar respuestas recibidas"
  colorTexto={colors.brandBuyer}
  onToggle={(estado) => console.log("expandido:", estado)}
>
  {respuestas.length > 0 && (
    <View style={{ gap: Spacing.xxl, marginTop: Spacing.sm }}>
      {respuestas.map((respuesta) => (
        <CardRespuestaVendedor
          key={respuesta.id}
          id={respuesta.id}
          vendedorNombre={respuesta.vendedorNombre}
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
    </View>
  )}
</ToggleExpandir> */
}
