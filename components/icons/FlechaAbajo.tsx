import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgFlechaAbajo = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={props.color || "currentColor"}
    viewBox="0 0 17 10"
    {...props}
   color={props.color}>
    <Path
      fillRule="evenodd"
      d="M.367.362a1.2 1.2 0 0 1 1.696.032L8 6.694l5.936-6.3a1.2 1.2 0 1 1 1.728 1.664l-6.8 7.2a1.2 1.2 0 0 1-1.728 0l-6.8-7.2A1.2 1.2 0 0 1 .367.362"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgFlechaAbajo;
