import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Circle, Path } from "react-native-svg";

const RevisarPago = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Circle cx="11" cy="11" r="8" />
    <Path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
  </Svg>
);
export default RevisarPago;
