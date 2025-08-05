import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgEditPencil = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <G clipPath="url(#EditPencil_svg__a)">
      <G clipPath="url(#EditPencil_svg__b)">
        <Path d="m12.822 7.219.353-.353-1.06-1.06-1.94-1.94-1.06-1.06-.353.353-.706.707-6.225 6.225a2.8 2.8 0 0 0-.694 1.168L.031 15.022a.74.74 0 0 0 .19.74.76.76 0 0 0 .741.191l3.76-1.106c.44-.131.844-.369 1.169-.694l6.225-6.225zM5 12.48l-.284.71a1.3 1.3 0 0 1-.416.215l-2.444.719.719-2.44c.044-.154.119-.294.216-.416l.709-.285v1c0 .275.225.5.5.5h1zM11.334.584l-.45.453-.706.707-.356.353 1.06 1.06 1.94 1.94 1.06 1.06.352-.354.707-.706.453-.453a2 2 0 0 0 0-2.828L14.166.584a2 2 0 0 0-2.828 0zm-1.48 5.25-4.5 4.5a.5.5 0 0 1-.707 0 .5.5 0 0 1 0-.706l4.5-4.5a.5.5 0 0 1 .706 0 .5.5 0 0 1 0 .706" />
      </G>
    </G>
    <Defs>
      <ClipPath id="EditPencil_svg__a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
      <ClipPath id="EditPencil_svg__b">
        <Path d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgEditPencil;
