import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const ClipboardSolid = (props: SvgProps) => (
  <Svg
    width={props.width ?? 24}
    height={props.height ?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={props.fill || props.color || "currentColor"}
      d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1M7 5V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1h1.5A2.5 2.5 0 0 1 21 7.5v12a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19.5v-12A2.5 2.5 0 0 1 5.5 5zm0 3a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2zm-1 5a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1"
    />
  </Svg>
);

export default ClipboardSolid;