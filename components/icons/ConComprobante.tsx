import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Circle, Path, Rect, Text } from "react-native-svg";
const SvgConComprobante = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="currentColor"
    viewBox="10 10 90 80" 
    preserveAspectRatio="xMidYMid meet" 
    {...props}
  >
    <Rect
      width={55}
      height={70}
      x={10}
      y={10}
      fill="none"
      stroke="#000"
      strokeWidth={5}
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
