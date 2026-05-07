import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const CarritoOutline = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 22.5 20"
    {...props}
    color={props.color}
  >
    <Path
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth={1.2}
      d="M0 .938C0 .418.418 0 .938 0h1.777c.86 0 1.62.5 1.976 1.25h16.055c1.027 0 1.777.977 1.508 1.969l-1.602 5.949a2.82 2.82 0 0 1-2.715 2.082H6.669l.21 1.113a.94.94 0 0 0 .923.762h11.262c.519 0 .937.418.937.938 0 .519-.418.937-.937.937H7.8a2.81 2.81 0 0 1-2.762-2.285L3.023 2.129a.31.31 0 0 0-.308-.254H.938A.935.935 0 0 1 0 .938m5 17.187a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0m13.125-1.875a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75"
    />
  </Svg>
);
export default CarritoOutline;
