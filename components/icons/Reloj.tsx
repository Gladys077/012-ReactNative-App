import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgReloj = (props: SvgProps) => (
  <Svg
    xmlSpace="preserve"
    width={24}
    height={24}
    viewBox="0 0 32 32"
    {...props}
   color={props.color}>
    <Path
      d="M16 5C9.925 5 5 9.925 5 16s4.925 11 11 11 11-4.925 11-11S22.075 5 16 5M7 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2m9-11a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0 20a1 1 0 1 1 0-2 1 1 0 0 1 0 2m6.354-3.646a.5.5 0 0 1-.708 0l-5.403-5.403c-.079.02-.157.049-.243.049a1 1 0 0 1-1-1c0-.366.206-.673.5-.847V10a.5.5 0 0 1 1 0v5.153c.294.174.5.481.5.847 0 .086-.029.164-.049.244l5.403 5.403a.5.5 0 0 1 0 .707M25 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2m0 26C9.383 28 4 22.617 4 16S9.383 4 16 4s12 5.383 12 12-5.383 12-12 12"
      style={{
        fill: "currentColor",
      }}
    />
  </Svg>
);
export default SvgReloj;
