import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgCheckCircle = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 60 60"
    {...props}
    color={props.color}
  >
    <Path
      d="M800 510a30 30 0 1 1 30-30 30 30 0 0 1-800 30m-16.986-23.235a3.484 3.484 0 0 1 0-4.9l1.766-1.756a3.185 3.185 0 0 1 4.574.051l3.12 3.237a1.59 1.59 0 0 0 2.311 0l15.9-16.39a3.187 3.187 0 0 1 4.6-.027l1.715 1.734a3.48 3.48 0 0 1 0 4.846l-21.109 21.451a3.185 3.185 0 0 1-4.552.03Z"
      fill="currentColor"
      fillRule="evenodd"
      transform="translate(-770 -450)"
    />
  </Svg>
);
export default SvgCheckCircle;
