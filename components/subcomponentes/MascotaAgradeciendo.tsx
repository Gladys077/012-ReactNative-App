import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Image, ImageSourcePropType, Text } from "react-native";

// ─── Props ────────────────────────────────────────────────────────────────────

interface MascotaAgradeciendoProps {
  colorBarra: string;
  onFin: () => void;
  imagen?: ImageSourcePropType;
}

// ─── Constante ────────────────────────────────────────────────────────────────

const DURACION_MS = 3000;

const IMAGENES_DEFECTO: ImageSourcePropType[] = [
  require("@/assets/images/Listo.png"),
  require("@/assets/images/Listo2.png"),
  require("@/assets/images/Listo3.png"),
  require("@/assets/images/Listo4.png"),
];

// ─── Export principal ─────────────────────────────────────────────────────────

export default function MascotaAgradeciendo({
  colorBarra,
  onFin,
  imagen,
}: MascotaAgradeciendoProps) {
  const { colors, fonts } = useTheme();
  const progreso = useRef(new Animated.Value(0)).current;

  // Elige una imagen aleatoria solo al montar el componente
  const imagenFinal = useMemo(() => {
    if (imagen) return imagen;
    const idx = Math.floor(Math.random() * IMAGENES_DEFECTO.length);
    return IMAGENES_DEFECTO[idx];
  }, [imagen]);

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
          marginTop: Spacing.sm,
          fontStyle: "italic",
        }}
      >
        ¡Misión cumplida!{"\n"}Tu opinión ayuda a que otros puedan elegir mejor.
      </Text>

      <Image
        source={imagenFinal}
        style={{ width: "100%", height: 150, marginTop: Spacing.sm }}
        resizeMode="contain"
      />

      <Text
        style={{
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          textAlign: "center",
          marginTop: Spacing.sm,
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
