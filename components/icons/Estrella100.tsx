import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgEstrella100 = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={props.color || "currentColor"}
    viewBox="0 0 18 16"
    {...props}
   color={props.color}>
    <G clipPath="url(#Estrella100_svg__a)">
      <G clipPath="url(#Estrella100_svg__b)">
        <Path d="M9.903.563a1.001 1.001 0 0 0-1.8 0l-2.01 4.134-4.487.662a.998.998 0 0 0-.556 1.7l3.256 3.222-.768 4.553a1.003 1.003 0 0 0 1.459 1.05l4.01-2.14 4.009 2.14a1 1 0 0 0 1.056-.072c.31-.224.466-.603.403-.978l-.772-4.553L16.96 7.06a.999.999 0 0 0-.556-1.7l-4.49-.662z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="Estrella100_svg__a">
        <Path fill="#fff" d="M0 0h18v16H0z" />
      </ClipPath>
      <ClipPath id="Estrella100_svg__b">
        <Path d="M0 0h18v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgEstrella100;
