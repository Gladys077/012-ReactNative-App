import { useTheme } from "@/context/ThemeContext";
import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Circle, Path } from "react-native-svg";

const SvgDarkMode = (props: SvgProps) => {
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
      {/* Círculo base (sol con borde) */}
      <Circle cx={12} cy={12} r={9} fill="none" stroke={strokeColor} />

      {/* Luna creciente dentro del sol */}
      <Path
        d="M15 12.5a4.5 4.5 0 1 1-3.5-4.4 
           3.5 3.5 0 1 0 3.5 4.4Z"
        fill={colors.textDefault}
      />
    </Svg>
  );
};

export default SvgDarkMode;
