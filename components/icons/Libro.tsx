import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLibro = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 18 20"
    {...props}
  >
    <G clipPath="url(#Libro_svg__a)">
      <Path d="M3.75 0C1.68 0 0 1.68 0 3.75v12.5C0 18.32 1.68 20 3.75 20h12.5c.691 0 1.25-.559 1.25-1.25s-.559-1.25-1.25-1.25V15c.691 0 1.25-.559 1.25-1.25V1.25C17.5.559 16.941 0 16.25 0H3.75m0 15h10v2.5h-10c-.691 0-1.25-.559-1.25-1.25S3.059 15 3.75 15M5 5.625C5 5.281 5.281 5 5.625 5h7.5c.344 0 .625.281.625.625a.627.627 0 0 1-.625.625h-7.5A.627.627 0 0 1 5 5.625M5.625 7.5h7.5c.344 0 .625.281.625.625a.627.627 0 0 1-.625.625h-7.5A.627.627 0 0 1 5 8.125c0-.344.281-.625.625-.625" />
    </G>
    <Defs>
      <ClipPath id="Libro_svg__a">
        <Path d="M0 0h17.5v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgLibro;
