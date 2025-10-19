import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMasBlanca = (props: SvgProps) => (
  <Svg viewBox="0 0 27 27" width={24} height={24} {...props} color={props.color}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={3}
      d="M12 5.4v16m-8-8h16"
    />
  </Svg>
);
export default SvgMasBlanca;
