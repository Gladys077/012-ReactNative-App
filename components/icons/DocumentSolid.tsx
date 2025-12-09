import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { G, Path } from "react-native-svg";

const SvgDocumentSolid = ({ color = "currentColor", ...props }: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <G fill={color} fillRule="evenodd">
      <Path d="M7.4 2h7.4v2.17h2.17V22H4V2h3.4Zm-.45 15.75h4.02v1.17H6.95v-1.17Zm3-2.35H6.95v1.17h7.03v-1.17Zm-1-2.35H6.95v1.17h6.03v-1.17Zm3-2.35H6.95v1.17h9.03v-1.17Zm-5-2.35H6.95v1.17h3.03V8.65Z" />
      <Path d="M17.2 4.73c1.7 1.7 2.3 3.05 2.52 3.65h-3.7V2.8c.6.22 1.97.83 3.7 1.93Z" />
    </G>
  </Svg>
);

export default SvgDocumentSolid;
