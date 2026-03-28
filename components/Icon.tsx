import type { ComponentType } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";

interface IconProps {
  icon: ComponentType<SvgProps>;
  size?: "sm" | "md" | "lg" | number;
  color?: "black" | "gray" | "orange" | "blue";
}

const sizeMap = {
  sm: 20,
  md: 24,
  lg: 32,
};

const colorMap = {
  black: "black",
  gray: "gray",
  orange: "orange",
  blue: "blue",
};

export const Icon = ({
  icon: IconComponent,
  size = "md",
  color = "black",
}: IconProps) => {
  const dimension =
    typeof size === "string" ? (sizeMap[size] ?? sizeMap.md) : size;
  const fillColor = colorMap[color] ?? colorMap.black;

  return (
    <View>
      <IconComponent width={dimension} height={dimension} fill={fillColor} />
    </View>
  );
};
