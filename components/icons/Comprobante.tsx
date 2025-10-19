import * as React from "react";
import Svg, { Rect, Text } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComprobante = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 80 80" {...props} color={props.color}>
    <Rect
      width={55}
      height={70}
      x={10}
      y={10}
      fill="none"
      stroke="#000"
      strokeWidth={4}
      rx={6}
      ry={6}
    />
    <Text x={30} y={36} fontFamily="Arial, sans-serif" fontSize={28}>
      {"$"}
    </Text>
    <Rect width={34} height={4} x={20} y={45} rx={2} />
    <Rect width={30} height={4} x={20} y={55} rx={2} />
    <Rect width={27} height={4} x={20} y={65} rx={2} />
  </Svg>
);
export default SvgComprobante;
