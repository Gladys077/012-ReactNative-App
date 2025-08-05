import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgFlechaDerecha = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 11 15"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M.83 14.657c-.22-.205-.34-.48-.334-.765s.137-.556.366-.753l6.281-5.315L.862 2.509a1.1 1.1 0 0 1-.282-.344A.986.986 0 0 1 .804.968c.11-.103.244-.186.391-.242a1.3 1.3 0 0 1 .932-.004c.148.056.282.137.394.24L9.699 7.05q.174.151.27.354a.98.98 0 0 1 0 .84 1.1 1.1 0 0 1-.27.354L2.52 14.686a1.27 1.27 0 0 1-.852.3 1.26 1.26 0 0 1-.84-.329"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgFlechaDerecha;
