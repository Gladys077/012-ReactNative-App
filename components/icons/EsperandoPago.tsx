import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Circle, Path } from "react-native-svg";

const EsperandoPago = (props: SvgProps) => (
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
    <Circle cx="12" cy="12" r="10" />
    <Path d="M12 6v6l4 2" />
  </Svg>
);
export default EsperandoPago;
