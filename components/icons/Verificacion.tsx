import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgVerificacion = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 100 100"
    {...props}
  >
    <Path d="M89.307 12.5h-.005V8.48a1.73 1.73 0 0 0-1.73-1.73H54.701L28.752 32.7v5.237h.014a1.724 1.724 0 0 0 1.716 1.588h6.49c.907 0 1.642-.7 1.716-1.588h.021V36.16h17.723a1.73 1.73 0 0 0 1.73-1.73V16.707H79.35v66.587H38.708v-3.012h-.007a1.73 1.73 0 0 0-1.73-1.728h-6.49a1.73 1.73 0 0 0-1.73 1.728v11.239c0 .956.774 1.73 1.73 1.73H87.57a1.73 1.73 0 0 0 1.73-1.73v-2.448h.005z" />
    <Path d="M53 59c0-10.5-8.5-19-19-19s-19 8.5-19 19c0 3.6.95 6.9 2.6 9.8l-6.9 6.9c-.9.9-1.4 2.1-1.4 3.4 0 2.6 2.1 4.6 4.7 4.6 1.3 0 2.5-.5 3.4-1.4l6.9-6.9c3 1.7 6.4 2.6 10 2.6 10.5 0 19-8.5 19-19zm-31.5 0c0-7 5.7-12.5 12.5-12.5S46.5 52.2 46.5 59 41.8 71.5 34 71.5 21.5 66 21.5 59" />
  </Svg>
);
export default SvgVerificacion;
