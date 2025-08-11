import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { G, Path } from "react-native-svg";
const SvgHome = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    
    strokeWidth={1.5}
    viewBox="0 0 24 20"
    {...props}
  >
    <G clipPath="url(#Home_svg__clip0_60270_2421)">
      <G clipPath="url(#Home_svg__clip1_60270_2421)">
        <Path d="M23.46 9.98c0 .704-.585 1.254-1.25 1.254h-1.25l.028 6.258q-.001.159-.02.317v.628c0 .864-.698 1.563-1.562 1.563h-.625q-.064.001-.129-.004-.081.005-.164.004h-2.207c-.863 0-1.562-.7-1.562-1.562V15c0-.691-.559-1.25-1.25-1.25h-2.5c-.692 0-1.25.559-1.25 1.25v3.438c0 .863-.7 1.562-1.563 1.562H5.973q-.089-.001-.176-.008-.07.007-.14.008H5.03c-.863 0-1.562-.7-1.562-1.562v-4.375q-.001-.056.004-.11v-2.719H2.219c-.703 0-1.25-.546-1.25-1.254 0-.351.117-.664.39-.937L11.375.313c.273-.274.586-.313.86-.313.273 0 .585.078.82.273l9.976 8.77c.313.273.469.586.43.937" />
      </G>
    </G>
  </Svg>
);
export default SvgHome;
