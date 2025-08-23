import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgTiendaIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 22.5 20"
    {...props}
  >
    <Path
      // fill="currentColor"
      d="M21.39 4.055 19.153.512A1.1 1.1 0 0 0 18.22 0H4.28c-.379 0-.734.195-.933.512L1.105 4.055C-.05 5.883.973 8.425 3.133 8.719a3.425 3.425 0 0 0 3.02-1.102A3.43 3.43 0 0 0 8.698 8.75c1.02 0 1.926-.445 2.547-1.133a3.43 3.43 0 0 0 2.547 1.133 3.42 3.42 0 0 0 2.547-1.133 3.43 3.43 0 0 0 3.02 1.102c2.167-.29 3.195-2.832 2.035-4.664zm-1.87 5.902h-.004a4.717 4.717 0 0 1-2.016-.164V15H5V9.79a4.7 4.7 0 0 1-2.027.167h-.004a5 5 0 0 1-.469-.09V17.5C2.5 18.879 3.621 20 5 20h12.5c1.379 0 2.5-1.121 2.5-2.5V9.867c-.156.04-.312.07-.48.09"
    />
  </Svg>
);
export default SvgTiendaIcon;
