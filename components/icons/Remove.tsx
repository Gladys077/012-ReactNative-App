import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgRemove = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={props.color || "currentColor"}
    viewBox="0 0 24 24"
    {...props}
    color={props.color}
  >
    <Path d="M19.5 5.25h-2.625V4.5a2.25 2.25 0 0 0-2.25-2.25h-5.25a2.25 2.25 0 0 0-2.25 2.25v.75H4.5a.75.75 0 0 0 0 1.5h.75v12A2.75 2.75 0 0 0 8 21.5h8a2.75 2.75 0 0 0 2.75-2.75v-12h.75a.75.75 0 0 0 0-1.5M8.625 4.5a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 .75.75v.75h-6.75zm8.625 14.25c0 .621-.629 1.25-1.25 1.25H8c-.621 0-1.25-.629-1.25-1.25v-12h10.5zm-7.125-1.5a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75m3.75 0a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75" />
  </Svg>
);
export default SvgRemove;
