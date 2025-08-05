import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPendientesMenuVendedor = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 20" {...props}>
    <G clipPath="url(#PendientesMenuVendedor_svg__a)">
      <G clipPath="url(#PendientesMenuVendedor_svg__b)">
        <Path d="M5.941 1.492a.935.935 0 0 1 .07 1.325L3.2 5.94a.92.92 0 0 1-.672.31.96.96 0 0 1-.687-.274L.273 4.414a.945.945 0 0 1 0-1.328.934.934 0 0 1 1.325 0l.863.863 2.152-2.39a.935.935 0 0 1 1.324-.07zm0 6.25a.935.935 0 0 1 .07 1.324L3.2 12.192a.92.92 0 0 1-.672.31.96.96 0 0 1-.687-.274L.273 10.664A.937.937 0 0 1 1.597 9.34l.864.863 2.152-2.39a.935.935 0 0 1 1.324-.07zM8.75 3.75c0-.691.558-1.25 1.25-1.25h8.75c.691 0 1.25.559 1.25 1.25S19.44 5 18.75 5H10c-.692 0-1.25-.559-1.25-1.25m0 6.25c0-.691.558-1.25 1.25-1.25h8.75C19.44 8.75 20 9.31 20 10s-.559 1.25-1.25 1.25H10c-.692 0-1.25-.559-1.25-1.25m-2.5 6.25c0-.691.558-1.25 1.25-1.25h11.25c.691 0 1.25.559 1.25 1.25 0 .692-.559 1.25-1.25 1.25H7.5c-.692 0-1.25-.558-1.25-1.25m-4.375-1.875a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75" />
      </G>
    </G>
    <Defs>
      <ClipPath id="PendientesMenuVendedor_svg__a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
      <ClipPath id="PendientesMenuVendedor_svg__b">
        <Path d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgPendientesMenuVendedor;
