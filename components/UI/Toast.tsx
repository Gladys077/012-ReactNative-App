import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface ToastProps {
  mensaje: string;
  visible: boolean;
  duracion?: number; // ms
  variante?: "success" | "error" | "info";
  onOcultar?: () => void;
}

export default function Toast({
  mensaje,
  visible,
  duracion = 2000,
  variante = "success",
  onOcultar,
}: ToastProps) {
  const { colors, fonts } = useTheme();
  const opacity = useSharedValue(0);

  const bgColor = {
    success: colors.success,
    error: colors.textError,
    info: colors.brandCommon,
  }[variante];

  useEffect(() => {
    if (visible) {
      opacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(
          duracion,
          withTiming(0, { duration: 300 }, (finished) => {
            if (finished && onOcultar) runOnJS(onOcultar)();
          }),
        ),
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: opacity.value === 0 ? 20 : 0 }],
  }));

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 40,
          left: Spacing.xl,
          right: Spacing.xl,
          backgroundColor: bgColor,
          borderRadius: 12,
          padding: Spacing.md,
          alignItems: "center",
          zIndex: 999,
        },
        animatedStyle,
      ]}
    >
      <Text
        style={{
          color: colors.textOnColor,
          fontFamily: fonts.robotoMedium,
          fontSize: FontSizes.base,
        }}
      >
        {mensaje}
      </Text>
    </Animated.View>
  );
}
