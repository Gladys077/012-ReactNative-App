import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View, ViewStyle } from "react-native";
import { TipLamparita } from "../icons";
import { useTipsBottomSheet } from "../subcomponentes/TipsBottomSheet";

interface TipsFABProps {
  onPress: () => void;
  style?: ViewStyle;
}

export default function TipsFAB({ onPress, style }: TipsFABProps) {
  const { colorRole, fonts, title } = useTipsBottomSheet();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

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
    outputRange: [0, 6],
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
              paddingHorizontal: 16,
              borderRadius: 999,
              borderWidth: 1.5,
              borderColor: colorRole,
              backgroundColor: pressed ? colorRole + "22" : colorRole + "12",
            }}
          >
            <TipLamparita width={16} height={16} color={colorRole} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: fonts.robotoMedium,
                color: colorRole,
                letterSpacing: 0.2,
              }}
            >
              {title}
            </Text>
          </Animated.View>
        )}
      </Pressable>
    </View>
  );
}
