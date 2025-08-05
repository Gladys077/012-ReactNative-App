import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgCheck = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 13 14"
    {...props}
  >
    <G clipPath="url(#Check_svg__a)">
      <G clipPath="url(#Check_svg__b)">
        <Path d="M11.993 2.882a.876.876 0 0 1 0 1.239l-7 7a.877.877 0 0 1-1.239 0l-3.5-3.5a.876.876 0 0 1 1.239-1.239l2.882 2.88 6.382-6.38a.876.876 0 0 1 1.239 0z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="Check_svg__a">
        <Path fill="#fff" d="M0 0h12.25v14H0z" />
      </ClipPath>
      <ClipPath id="Check_svg__b">
        <Path d="M0 0h12.25v14H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgCheck;
