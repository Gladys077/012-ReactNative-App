import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useRef, useState } from "react";
import { Animated, Pressable, Text, View, ViewStyle } from "react-native";

type Alineacion = "izquierda" | "centro" | "derecha";

type ToggleExpandirProps = {
  expandidoInicial?: boolean;
  textoMostrar?: string;
  textoOcultar?: string;
  colorTexto?: string;
  mostrarFlecha?: boolean;
  alineacion?: Alineacion;
  inline?: boolean; // no ocupa línea completa (para usarlo en row con otros elementos)
  onToggle?: (expandido: boolean) => void;
  style?: ViewStyle;
  children?: React.ReactNode;
};

const alineacionMap: Record<Alineacion, "flex-start" | "center" | "flex-end"> =
  {
    izquierda: "flex-start",
    centro: "center",
    derecha: "flex-end",
  };

const ToggleExpandir: React.FC<ToggleExpandirProps> = ({
  expandidoInicial = false,
  textoMostrar = "Mostrar contenido",
  textoOcultar = "Ocultar contenido",
  colorTexto,
  mostrarFlecha = true,
  alineacion = "centro",
  inline = false,
  onToggle,
  style,
  children,
}) => {
  const { colors, fonts } = useTheme();
  const [expandido, setExpandido] = useState(expandidoInicial);
  const animacion = useRef(
    new Animated.Value(expandidoInicial ? 1 : 0),
  ).current;

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
    outputRange: ["0deg", "180deg"],
  });

  const altura = animacion.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const boton = (
    <Pressable
      onPress={toggleExpandir}
      style={{
        flexDirection: "row",
        // inline=true → el Pressable no fuerza ancho completo, se ajusta a su contenido
        alignSelf: inline ? "auto" : alineacionMap[alineacion],
        alignItems: "center",
        paddingVertical: Spacing.xs,
        gap: mostrarFlecha ? 6 : 0,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.robotoMedium,
          fontSize: FontSizes.sm,
          color: colorTexto || colors.brandSeller,
          letterSpacing: 0.3,
          textDecorationLine: "underline",
        }}
      >
        {expandido ? textoOcultar : textoMostrar}
      </Text>

      {/* {mostrarFlecha && (
        <Animated.View style={{ transform: [{ rotate: rotacion }] }}>
          <FlechaAbajo
            width={18}
            height={18}
            stroke={colorTexto || colors.textDefault}
          />
        </Animated.View>
      )} */}
    </Pressable>
  );

  return (
    // inline=true → el wrapper no toma ancho completo, el padre maneja el layout
    <View style={[inline ? {} : { width: "100%" }, style]}>
      {boton}

      <Animated.View
        style={{
          opacity: animacion,
          transform: [{ scaleY: altura }],
        }}
      >
        {expandido && children}
      </Animated.View>
    </View>
  );
};

export default ToggleExpandir;

// MODO DE USO:
// Centro con flecha (comportamiento original):
// <ToggleExpandir textoMostrar="Ver más" textoOcultar="Ver menos">
//   {/* contenido */}
// </ToggleExpandir>

// Izquierda sin flecha (solo texto):
// <ToggleExpandir
//   textoMostrar="Ver más"
//   textoOcultar="Ver menos"
//   alineacion="izquierda"
//   mostrarFlecha={false}
// >
//   {/* contenido */}
// </ToggleExpandir>

// Inline junto al ícono delete (el caso de CardHistorialVendedor):
// <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//   <ToggleExpandir
//     textoMostrar="Ver más"
//     textoOcultar="Ver menos"
//     mostrarFlecha={false}
//     inline
//   />
//   <Pressable onPress={handleEliminar} style={{ padding: Spacing.sm }}>
//     <Remove width={26} height={26} fill={colors.textError} />
//   </Pressable>
// </View>
