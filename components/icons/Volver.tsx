import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgVolver = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 16 18"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M.33 8.205c-.439.44-.439 1.154 0 1.593l5.625 5.625a1.127 1.127 0 0 0 1.593-1.593l-3.709-3.705h10.786a1.124 1.124 0 1 0 0-2.25H3.843l3.702-3.706a1.127 1.127 0 0 0-1.593-1.592L.327 8.202z"
    />
  </Svg>
);
export default SvgVolver;
