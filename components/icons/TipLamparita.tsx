import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgTipLamparita = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 12 16"
    {...props}
  >
    <G clipPath="url(#TipLamparita_svg__a)">
      <G clipPath="url(#TipLamparita_svg__b)">
        <Path d="M8.5 12c.3-.997.922-1.847 1.537-2.694q.245-.332.482-.668a5.5 5.5 0 1 0-9.038-.003q.236.335.482.668c.618.847 1.24 1.7 1.537 2.694h5zM6 16a2.5 2.5 0 0 0 2.5-2.5V13h-5v.5A2.5 2.5 0 0 0 6 16M3.5 5.5c0 .275-.225.5-.5.5a.5.5 0 0 1-.5-.5C2.5 3.566 4.066 2 6 2c.275 0 .5.225.5.5S6.275 3 6 3a2.5 2.5 0 0 0-2.5 2.5" />
      </G>
    </G>
    <Defs>
      <ClipPath id="TipLamparita_svg__a">
        <Path fill="#fff" d="M0 0h12v16H0z" />
      </ClipPath>
      <ClipPath id="TipLamparita_svg__b">
        <Path d="M0 0h12v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgTipLamparita;
