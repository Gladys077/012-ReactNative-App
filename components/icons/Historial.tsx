import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgHistorial = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth={1.2}
    viewBox="0 0 21 20"
    {...props}
   color={props.color}>
    <Path d="M3.29 2.93 1.96 1.602c-.589-.59-1.6-.172-1.6.66v4.3c0 .52.417.938.937.938h4.3c.837 0 1.255-1.012.665-1.602L5.059 4.695a7.48 7.48 0 0 1 5.3-2.195c4.141 0 7.5 3.36 7.5 7.5a7.502 7.502 0 0 1-11.785 6.156 1.253 1.253 0 0 0-1.742.309 1.25 1.25 0 0 0 .309 1.742A10 10 0 0 0 10.359 20c5.524 0 10-4.477 10-10s-4.476-10-10-10a9.97 9.97 0 0 0-7.07 2.93M10.36 5a.935.935 0 0 0-.938.938V10c0 .25.098.488.273.664l2.813 2.813a.937.937 0 0 0 1.324-1.324l-2.539-2.54V5.938A.935.935 0 0 0 10.356 5z" />
  </Svg>
);
export default SvgHistorial;
