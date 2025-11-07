import React, { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

interface AttentionBounceProps {
  children: React.ReactNode;
  active?: boolean; // permite activar o desactivar la animación
  amplitude?: number; // cuánto rebota (en píxeles)
  duration?: number; // velocidad del rebote
}

export default function AttentionBounce({
  children,
  active = true,
  amplitude = 4,
  duration = 600,
}: AttentionBounceProps) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (active) {
      translateY.value = withRepeat(
        withTiming(-amplitude, { duration }),
        -1,
        true
      );
    } else {
      translateY.value = 0; // sin animación
    }
  }, [active, amplitude, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
