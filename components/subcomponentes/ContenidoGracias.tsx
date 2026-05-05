import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Image, ImageSourcePropType, Text } from "react-native";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ContenidoGraciasProps {
  colorBarra: string;
  onFin: () => void;
  imagen?: ImageSourcePropType;
}

// ─── Constante ────────────────────────────────────────────────────────────────

const DURACION_MS = 3000;

// ─── Export principal ─────────────────────────────────────────────────────────

export default function ContenidoGracias({
  colorBarra,
  onFin,
  imagen = require("@/assets/images/Listo.png"),
}: ContenidoGraciasProps) {
  const { colors, fonts } = useTheme();
  const progreso = useRef(new Animated.Value(0)).current;

  const handleFin = useCallback(() => {
    onFin();
  }, [onFin]);

  useEffect(() => {
    progreso.setValue(0);
    Animated.timing(progreso, {
      toValue: 1,
      duration: DURACION_MS,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) handleFin();
    });
  }, [handleFin, progreso]);

  const anchoBarra = progreso.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <>
      <Text
        style={{
          fontFamily: fonts.robotoMedium,
          fontSize: FontSizes.base,
          color: colors.textDefault,
          textAlign: "center",
          marginTop: Spacing.lg,
          fontStyle: "italic",
        }}
      >
        ¡Misión cumplida!{"\n"}Tu opinión ayuda a que otros puedan elegir mejor.
      </Text>

      <Image
        source={imagen}
        style={{ width: "100%", height: 220, marginTop: Spacing.lg }}
        resizeMode="contain"
      />

      <Text
        style={{
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          textAlign: "center",
          marginTop: Spacing.lg,
        }}
      >
        Guardando en historial...
      </Text>

      <Animated.View
        style={{
          height: 4,
          borderRadius: 2,
          backgroundColor: colorBarra,
          width: anchoBarra,
          marginTop: Spacing.xs,
        }}
      />
    </>
  );
}
