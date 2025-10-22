// components/icons/Theme.tsx
import { useTheme } from "@/context/ThemeContext";
import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { G, Path } from "react-native-svg";

type Props = SvgProps & {
  size?: number;
  color?: string; 
  fill?: string;  
  stroke?: string; 
};

const Theme = ({ size = 24, color, fill, stroke, ...props }: Props) => {
  const { colors } = useTheme();

  // color por defecto toma color prop si llega, si no el del theme
  const strokeColor = stroke ?? color ?? colors.textDefault;
  const fillColor = fill ?? "none"; // para que por defecto sea outline (transparente interior)

  return (
    <Svg
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 128 128"
      fill="none"
      {...props}
    >
      <G
        transform="translate(0,128) scale(0.1,-0.1)"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={props.strokeWidth ?? 0}
      >
        {/* el fill por defecto es 'none' (outline) pero si necesito que esté relleno paso: fill={colors.textDefault} o fill prop */}
        <Path d="M526 1069 c-115 -28 -234 -130 -288 -244 -54 -116 -50 -270 9 -389 133 -266 510 -317 715 -98 88 94 124 200 115 338 -9 156 -99 290 -244 361 -66 33 -82 36 -171 39 -53 2 -114 -1 -136 -7z m276 -76 c85 -40 151 -106 191 -191 29 -61 32 -76 32 -162 0 -86 -3 -101 -32 -162 -40 -85 -106 -151 -191 -191 -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -85 40 -151 106 -191 191 -29 61 -32 76 -32 162 0 86 3 101 32 162 70 149 205 231 368 225 66 -3 94 -9 147 -34z" />
        <Path d="M510 919 c-55 -33 -99 -80 -128 -134 -23 -43 -27 -63 -27 -135 0 -73 4 -93 28 -142 67 -136 221 -198 376 -152 40 12 68 30 113 74 77 74 76 92 -8 95 -109 4 -210 69 -262 169 -22 43 -26 63 -25 126 0 41 2 84 4 95 6 28 -28 30 -71 4z" />
      </G>
    </Svg>
  );
};

export default Theme;
