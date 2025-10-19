import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgCanastaAlmacen = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={props.color || "currentColor"}
    viewBox="0 0 24 20"
    {...props}
   color={props.color}>
    <G clipPath="url(#CanastaAlmacen_svg__a)">
      <Path d="M10.645 1.371a.94.94 0 0 0-.399-1.266.94.94 0 0 0-1.266.399L5.344 7.5H2c-.691 0-1.25.559-1.25 1.25S1.309 10 2 10l2.027 8.105A2.5 2.5 0 0 0 6.453 20h11.094a2.5 2.5 0 0 0 2.426-1.895L22 10c.691 0 1.25-.559 1.25-1.25S22.691 7.5 22 7.5h-3.344L15.02.504a.937.937 0 1 0-1.664.867L16.543 7.5H7.457zM8.25 11.875v3.75a.627.627 0 0 1-.625.625.627.627 0 0 1-.625-.625v-3.75c0-.344.281-.625.625-.625s.625.281.625.625M12 11.25c.344 0 .625.281.625.625v3.75a.627.627 0 0 1-.625.625.627.627 0 0 1-.625-.625v-3.75c0-.344.281-.625.625-.625m5 .625v3.75a.627.627 0 0 1-.625.625.627.627 0 0 1-.625-.625v-3.75c0-.344.281-.625.625-.625s.625.281.625.625" />
    </G>
    <Defs>
      <ClipPath id="CanastaAlmacen_svg__a">
        <Path d="M.75 0h22.5v20H.75z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgCanastaAlmacen;
