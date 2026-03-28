import { BorderRadius, FontSizes } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Check } from "../icons";

interface Rubro {
  label: string;
  value: string;
  IconComponent: React.ComponentType<{
    width: number;
    height: number;
    color?: string;
    fill?: string;
  }>;
  color: string;
  iconColor: string;
}

interface RubroItemProps {
  rubro: Rubro;
  isSelected: boolean;
  onToggle: (value: string) => void;
}

export default function RubroItem({
  rubro,
  isSelected,
  onToggle,
}: RubroItemProps) {
  const { colors } = useTheme();
  const IconComponent = rubro.IconComponent;

  return (
    <Pressable
      onPress={() => onToggle(rubro.value)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: BorderRadius.xl,
        backgroundColor: "transparent",
      }}
    >
      {/* Círculo de color de fondo */}
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: BorderRadius.full,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
          backgroundColor: rubro.color,
        }}
      >
        <IconComponent
          width={24}
          height={24}
          color={rubro.iconColor}
          fill={rubro.iconColor}
        />
      </View>

      {/* Nombre del rubro */}
      <Text
        style={{ flex: 1, fontSize: FontSizes.md, color: colors.textDefault }}
      >
        {rubro.label}
      </Text>

      {/* Checkbox personalizado */}
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: BorderRadius.sm,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: isSelected
            ? colors.brandCommon
            : colors.textSecondaryBorder,
          backgroundColor: isSelected ? colors.brandCommon : "transparent",
        }}
      >
        {isSelected && <Check width={14} height={14} color="#fff" />}
      </View>
    </Pressable>
  );
}
