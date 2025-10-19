import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgEnviar = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={props.color || "currentColor"}
    viewBox="0 0 16 20"
    {...props}
   color={props.color}>
    <Path d="M15.566 2.175a1 1 0 0 1 .422.975l-2 13a1 1 0 0 1-1.375.769l-3.738-1.553-2.14 2.315A1 1 0 0 1 5 17v-2.613a.5.5 0 0 1 .131-.334l5.238-5.716a.5.5 0 0 0-.7-.71l-6.357 5.648-2.759-1.381A1 1 0 0 1 0 11.028c-.01-.369.184-.712.503-.897l14-8c.335-.19.747-.172 1.063.044" />
  </Svg>
);
export default SvgEnviar;
