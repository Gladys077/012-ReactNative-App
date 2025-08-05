import * as React from "react";
import Svg, { Rect, Text, Circle, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgConComprobante = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 100 100"
    {...props}
  >
    <Rect
      width={55}
      height={70}
      x={10}
      y={10}
      fill="none"
      stroke="#000"
      strokeWidth={3}
      rx={6}
      ry={6}
    />
    <Text
      x={30}
      y={36}
      fill="#000"
      fontFamily="Arial, sans-serif"
      fontSize={24}
    >
      {"$"}
    </Text>
    <Rect width={34} height={4} x={20} y={45} fill="#000" rx={2} />
    <Rect width={30} height={4} x={20} y={55} fill="#000" rx={2} />
    <Rect width={27} height={4} x={20} y={65} fill="#000" rx={2} />
    <Circle cx={70} cy={70} r={24} fill="#228b22" />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m61 70 7 7 13-13"
    />
  </Svg>
);
export default SvgConComprobante;
