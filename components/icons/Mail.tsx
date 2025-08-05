import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMail = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 -4 32 32" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M30 20c0 .203-.039.395-.095.578L21 11l9-7zM3.556 21.946l9.024-9.616L16 14.915l3.272-2.601 9.172 9.632c-.143.033-24.745.033-24.888 0M2 20V4l9 7-8.905 9.578A2 2 0 0 1 2 20M29 2 16 12 3 2zm-1-2H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4"
    />
  </Svg>
);
export default SvgMail;
