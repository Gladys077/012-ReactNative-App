import { useTheme } from "@/context/ThemeContext";
import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Circle, G, Text } from "react-native-svg";

const SvgFaq = (props: SvgProps) => {
  const { colors } = useTheme();
  const strokeWidth = props.strokeWidth ?? 1.5;
  const strokeColor = props.stroke ?? props.color ?? colors.textDefault;

  return (
    <Svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Círculo outline */}
      <Circle cx={12} cy={12} r={10} fill="none" />

      {/* Grupo para centrar texto */}
      <G transform="translate(12,12)">
        <Text
          x={0}
          y={4}
          fontSize={12}
          fill={strokeColor}
          textAnchor="middle"
        >
          ?
        </Text>
      </G>
    </Svg>
  );
};

export default SvgFaq;
