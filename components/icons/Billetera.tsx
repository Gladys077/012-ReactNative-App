import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgBilletera = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    className="Billetera_svg__icon Billetera_svg__glyph"
    viewBox="0 0 24 24"
    {...props}
   color={props.color}>
    <Path
      fill={props.color || "currentColor"}
      d="M22 13v2a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2m-2 5a2.9 2.9 0 0 0 1-.18V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.79l7.93-3.53a2 2 0 0 1 2.6.94L17.62 6H19a2 2 0 0 1 2 2v2.18a2.9 2.9 0 0 0-1-.18h-3a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3ZM10.71 6h4.67l-.85-1.7Z"
    />
  </Svg>
);
export default SvgBilletera;
