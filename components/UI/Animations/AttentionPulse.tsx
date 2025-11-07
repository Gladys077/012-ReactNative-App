import React, { useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

interface AttentionPulseProps {
  children: React.ReactNode;
  size?: number;
  style?: ViewStyle;
}

/**
 * Componente para envolver íconos o elementos que necesiten
 * una animación de "pulso" suave para llamar la atención del usuario.
 */
export default function AttentionPulse({
  children,
  size = 24,
  style,
}: AttentionPulseProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    // Animación infinita de pulso
    scale.value = withRepeat(
      withTiming(1.15, {
        duration: 900,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // infinito
      true // alterna ida y vuelta
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
