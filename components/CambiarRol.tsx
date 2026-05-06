import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View, ViewStyle } from "react-native";
import { Carrito, TiendaIcon } from "./icons";

interface CambiarRolProps {
  rolActual: "comprador" | "vendedor";
  onPress: () => void;
  style?: ViewStyle;
}

export default function CambiarRol({
  rolActual,
  onPress,
  style,
}: CambiarRolProps) {
  const { colors, fonts } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const esComprador = rolActual === "comprador";

  // Color y contenido según rol DESTINO (al que va a cambiar)
  const colorDestino = esComprador ? colors.brandSeller : colors.brandBuyer;
  const labelDestino = esComprador ? "Ir a vender" : "Ir a comprar";
  const IconDestino = esComprador ? TiendaIcon : Carrito;

  // Pulso sutil al montar para llamar la atención
  useEffect(() => {
    Animated.sequence([
      Animated.delay(800),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.04,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 },
      ),
    ]).start();
  }, []);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => onPress());
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, esComprador ? 6 : -6],
  });

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        },
        style,
      ]}
    >
      {/* Texto pregunta */}
      <Text
        style={{
          fontSize: 13,
          fontFamily: fonts.robotoRegular,
          color: colors.textMuted,
        }}
      >
        {esComprador ? "¿Deseas vender?" : "¿Deseas comprar?"}
      </Text>

      {/* Pill interactivo */}
      <Pressable onPress={handlePress} hitSlop={8}>
        {({ pressed }) => (
          <Animated.View
            style={{
              transform: [
                { scale: pressed ? 0.95 : pulseAnim },
                { translateX },
              ],
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              paddingHorizontal: 11,
              borderRadius: 999,
              borderWidth: 1.5,
              borderColor: colorDestino,
              backgroundColor: pressed
                ? colorDestino + "22"
                : colorDestino + "12",
            }}
          >
            <IconDestino
              width={13}
              height={13}
              fill={colorDestino}
              color={colorDestino}
              stroke={colorDestino}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: fonts.robotoMedium,
                color: colorDestino,
                letterSpacing: 0.2,
              }}
            >
              {labelDestino}
            </Text>
          </Animated.View>
        )}
      </Pressable>
    </View>
  );
}
