import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { G, Mask, Path } from "react-native-svg";
const SvgGoogleLogo = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill={props.color || "currentColor"}
    viewBox="0 0 20 20"
    {...props}
    color={props.color}
  >
    <Mask
      id="GoogleLogo_svg__a"
      width={5}
      height={10}
      x={0}
      y={5}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path fillRule="evenodd" d="M0 5.401h4.432v9.338H0z" clipRule="evenodd" />
    </Mask>
    <G mask="url(#GoogleLogo_svg__a)">
      <Path
        fillRule="evenodd"
        d="m4.432 12.086-.696 2.6-2.544.053A9.96 9.96 0 0 1 0 9.999a9.95 9.95 0 0 1 1.118-4.598l2.266.415.992 2.252A6 6 0 0 0 4.056 10c0 .734.133 1.437.376 2.086"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="GoogleLogo_svg__b"
      width={10}
      height={10}
      x={10}
      y={8}
      maskUnits="userSpaceOnUse"
      maskType="luminance"
    >
      <Path
        fillRule="evenodd"
        d="M10.22 8.132H20v9.666h-9.78z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#GoogleLogo_svg__b)">
      <Path
        fillRule="evenodd"
        d="M19.825 8.132Q20 9.042 20 10q-.002 1.076-.219 2.088a10 10 0 0 1-3.52 5.71h-.001l-2.853-.146-.404-2.52a5.96 5.96 0 0 0 2.564-3.044H10.22V8.132z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fillRule="evenodd"
      d="M16.26 17.798A9.96 9.96 0 0 1 10 20a10 10 0 0 1-8.808-5.26l3.24-2.654a5.946 5.946 0 0 0 8.57 3.046zM16.383 2.302l-3.24 2.652a5.948 5.948 0 0 0-8.767 3.114L1.12 5.401A10 10 0 0 1 10 0c2.426 0 4.651.864 6.383 2.302"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgGoogleLogo;
