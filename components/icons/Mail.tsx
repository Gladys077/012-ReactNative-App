import { useTheme } from "@/context/ThemeContext";
import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const SvgMail = (props: SvgProps) => {
  const { colors } = useTheme();

  const strokeWidth = props.strokeWidth ?? 0.2;
  const strokeColor = props.stroke ?? props.color ?? colors.textDefault;
  const fillColor = props.fill ?? "none";

  return (
    <Svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 32 32"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path
        d="M30 20c0 .203-.039.395-.095.578L21 11l9-7zM3.556 21.946l9.024-9.616L16 14.915l3.272-2.601 9.172 9.632c-.143.033-24.745.033-24.888 0M2 20V4l9 7-8.905 9.578A2 2 0 0 1 2 20M29 2 16 12 3 2zm-1-2H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default SvgMail;
