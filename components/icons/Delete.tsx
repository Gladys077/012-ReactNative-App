import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDelete = (props: SvgProps) => (
  <Svg viewBox="0 0 24 27" width={24} height={24} {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      d="m6 6 12 15m0-15L6 21"
    />
  </Svg>
);
export default SvgDelete;
