// Monedas2.tsx
import { useTheme } from "@/context/ThemeContext";
import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { G, Path } from "react-native-svg";

const SvgMonedas2 = (props: SvgProps) => {
  const { colors } = useTheme();
  const strokeColor = props.stroke ?? props.color ?? colors.textDefault;
  const strokeWidth = props.strokeWidth ?? 1.5;

  return (
    <Svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 512 512"
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <G transform="translate(0,512) scale(0.1,-0.1)">
        <Path
          d="M3240 4789c-534-44-886-159-976-321l-29-53-3-688-3-688-27 5c-185 38-640 61-926 47-705-37-1120-173-1165-382-15-71-14-481 1-533 26-88 177-192 351-242l67-19v-180c0-193 9-235 59-279 23-21 27-36 10-36-30 0-164-67-204-102-81-71-80-68-80-363v-260l28-48c89-152 385-254 892-309 187-20 801-17 990 5 463 55 757 160 840 301 19 33 27 64 32 124l6 81 66 22c36 12 100 37 141 55l75 33 315 5c399 5 622 30 877 96 266 69 409 165 434 291 13 71 11 3034-2 3080-55 183-427 314-1018 359-157 12-599 11-751-1z"
          fill="none"
        />
      </G>
    </Svg>
  );
};

export default SvgMonedas2;
