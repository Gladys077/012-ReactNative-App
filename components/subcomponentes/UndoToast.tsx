import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

interface UndoToastProps {
  visible: boolean;
  mensaje: string;
  duracion?: number;
  onCancelar: () => void;
  onCerrar: () => void;
}

const DURACION = 6000;

export default function UndoToast({
  visible,
  mensaje,
  duracion = DURACION,
  onCancelar,
  onCerrar,
}: UndoToastProps) {
  const { colors, fonts } = useTheme();
  const translateY = useRef(new Animated.Value(100)).current;
  const progressRef = useRef(new Animated.Value(1)).current;
  const [segundos, setSegundos] = useState(Math.ceil(duracion / 1000));

  useEffect(() => {
    if (visible) {
      setSegundos(Math.ceil(duracion / 1000));
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start();

      // Barra de progreso
      progressRef.setValue(1);
      Animated.timing(progressRef, {
        toValue: 0,
        duration: duracion,
        useNativeDriver: false,
      }).start();

      // Countdown
      const interval = setInterval(() => {
        setSegundos((s) => {
          if (s <= 1) {
            clearInterval(interval);
            return 0;
          }
          return s - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      Animated.timing(translateY, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: Spacing.xl,
        left: Spacing.md,
        right: Spacing.md,
        transform: [{ translateY }],
        backgroundColor: colors.textDefault,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 6,
      }}
    >
      {/* Barra de progreso */}
      <Animated.View
        style={{
          height: 3,
          backgroundColor: colors.textError,
          width: progressRef.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: Spacing.md,
          gap: Spacing.md,
        }}
      >
        {/* Mensaje */}
        <Text
          style={{
            flex: 1,
            fontSize: FontSizes.base,
            fontFamily: fonts.robotoRegular,
            color: colors.background,
          }}
          numberOfLines={2}
        >
          {mensaje}
        </Text>

        {/* Cancelar */}
        <Pressable onPress={onCancelar}>
          <Text
            style={{
              fontSize: FontSizes.sm,
              fontFamily: fonts.robotoBold,
              color: colors.textError,
            }}
          >
            {`Cancelar (${segundos}s)`}
          </Text>
        </Pressable>

        {/* Cerrar */}
        <Pressable onPress={onCerrar} style={{ padding: 8 }}>
          <Text
            style={{
              fontSize: FontSizes.md,
              color: colors.background,
              fontFamily: fonts.robotoBold,
            }}
          >
            ✕
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
