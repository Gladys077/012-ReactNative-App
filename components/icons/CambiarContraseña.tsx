// CambiarContraseña.tsx
import { useTheme } from "@/context/ThemeContext";
import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Circle, Path, Polyline } from "react-native-svg";

const CambiarContraseña = (props: SvgProps) => {
  const { colors } = useTheme();
  const strokeWidth = props.strokeWidth ?? 1;
  const strokeColor = props.stroke ?? props.color ?? colors.textDefault;
  const fillColor = "none";
  

  return (
    <Svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
<Circle cx="12" cy="12" r="11.5" fill={fillColor} />

      {/* Flechitas */}
      <Polyline points="17.5 5.5, 17 1.5, 21.5 2" />
      <Polyline points="-1 20, 4 20, 4 16" />

      {/* Candado*/}
      <Path d="M15 12V9a3 3 0 0 0-6 0v2"  fill={fillColor} />
      <Path d="M9 11.5h6v6H9z"  fill={fillColor} />
      <Path d="M12 15v-2"  fill={fillColor} />
    </Svg>
  );
};

export default CambiarContraseña;
