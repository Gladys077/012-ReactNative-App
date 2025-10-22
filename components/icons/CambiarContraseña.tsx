// CambiarContraseña.tsx
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Circle, Path, Polyline, Svg } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const CambiarContraseña = (props: Props) => {
  const { colors } = useTheme();
  const strokeWidth = props.strokeWidth ?? 1.5;

  return (
    <Svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || colors.textDefault}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Círculo exterior */}
      <Circle cx="12" cy="12" r="10" />

      {/* Flechas de rotación */}
      <Polyline points="16 8 18 8 18 10" />
      <Polyline points="8 16 6 16 6 14" />
      <Path d="M18 8a8 8 0 0 0-12 8" />
      <Path d="M6 16a8 8 0 0 0 12-8" />

      {/* Candado */}
      <Path d="M15 12V10a3 3 0 0 0-6 0v2" />
      <Path d="M9 12h6v6H9z" />
      <Path d="M12 15v1" />
    </Svg>
  );
};

export default CambiarContraseña;
