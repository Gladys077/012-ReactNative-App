import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgFaq = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke={props.color || "currentColor"}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
   color={props.color}>
    <Path d="M12 17v-.007m0-2.136c0-3.214 3-2.5 3-5C15 8.28 13.657 7 12 7c-1.343 0-2.48.84-2.863 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" />
  </Svg>
);
export default SvgFaq;
