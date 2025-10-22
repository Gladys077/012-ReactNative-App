import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { G, Path } from "react-native-svg";
const SvgDocumentSolid = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={props.color || "currentColor"}
    viewBox="0 0 24 24"
    {...props}
   color={props.color}>
    <G fillRule="evenodd">
      <Path d="M1185.471 0v564.706h564.705V1920H169V0zm-225.77 1355.294H507.823v113.054h451.878zm338.711-225.881H507.823v112.94h790.589zm-112.941-225.884H507.823v112.941h677.648zm225.882-225.882h-903.53v112.941h903.53zM959.701 451.878H507.823v112.941h451.878z" />
      <Path d="M1667.673 345.623c30.38 30.268 51.84 66.635 65.619 106.164h-434.937V16.851c39.53 13.779 75.897 35.35 106.278 65.619z" />
    </G>
  </Svg>
);
export default SvgDocumentSolid;
