import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgEstrella50 = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={props.color || "currentColor"}
    viewBox="0 0 18 16"
    {...props}
   color={props.color}>
    <G clipPath="url(#Estrella50_svg__a)">
      <G clipPath="url(#Estrella50_svg__b)">
        <Path d="m9 11.763.003-.004.825.441 2.663 1.422-.516-3.05-.15-.897.647-.64 2.19-2.166-3.003-.444-.915-.134-.403-.832-1.338-2.743L9 2.725zm5.472 3.071a1.003 1.003 0 0 1-1.46 1.05l-4.009-2.14-4.01 2.14a1.003 1.003 0 0 1-1.46-1.05l.773-4.553L1.05 7.06a.999.999 0 0 1 .556-1.7l4.488-.662L8.106.563a1.001 1.001 0 0 1 1.8 0l2.01 4.134 4.487.662a1 1 0 0 1 .803.678c.116.36.022.757-.247 1.022l-3.256 3.222z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="Estrella50_svg__a">
        <Path fill="#fff" d="M0 0h18v16H0z" />
      </ClipPath>
      <ClipPath id="Estrella50_svg__b">
        <Path d="M-1 0h20v16H-1z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgEstrella50;
