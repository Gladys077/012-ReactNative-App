import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgInfo = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Circle cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={1.5} />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M12 17v-6"
    />
    <Circle
      cx={1}
      cy={1}
      r={1}
      fill="currentColor"
      transform="matrix(1 0 0 -1 11 9)"
    />
  </Svg>
);
export default SvgInfo;
