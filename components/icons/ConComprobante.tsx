import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Circle, Path, Rect, Text } from "react-native-svg";

const ConComprobante = (props: SvgProps) => {
  const color = props.color || "#000";
  return (
    <Svg
      width={36}
      height={36}
      fill="none"
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
        stroke={color}
        strokeWidth={5}
        rx={6}
        ry={6}
      />
      <Text
        x={30}
        y={36}
        fill={color}
        fontFamily="Arial, sans-serif"
        fontSize={24}
      >
        {"$"}
      </Text>
      <Rect width={34} height={4} x={20} y={45} fill={color} rx={2} />
      <Rect width={30} height={4} x={20} y={55} fill={color} rx={2} />
      <Rect width={27} height={4} x={20} y={65} fill={color} rx={2} />
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
};

export default ConComprobante;
