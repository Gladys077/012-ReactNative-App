import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Check } from "../icons";

interface Rubro {
  label: string;
  value: string;
  IconComponent: React.ComponentType<{ width: number; height: number; color?: string; fill?: string }>;  
  color: string;
  iconColor: string;
}

interface RubroItemProps {
  rubro: Rubro;
  isSelected: boolean;
  onToggle: (value: string) => void;
}

export default function RubroItem({ rubro, isSelected, onToggle }: RubroItemProps) {
  const { colors } = useTheme();
  const IconComponent = rubro.IconComponent;
  
  return (
    <Pressable
      onPress={() => onToggle(rubro.value)}
      className="flex-row items-center p-3 rounded-xl active:bg-opacity-50"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* Círculo de color de fondo */}
      <View
        className="w-9 h-9 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: rubro.color }}
      >
        {/* Renderizar el ícono dinámicamente con su color */}
        <IconComponent 
          width={24} 
          height={24} 
          color={rubro.iconColor}
          fill={rubro.iconColor}
        />
      </View>

      {/* Nombre del rubro */}
      <Text 
        className="flex-1 text-base"
        style={{ color: colors.textDefault }}
      >
        {rubro.label}
      </Text>

      {/* Checkbox personalizado */}
      <View
        className="w-6 h-6 rounded-md items-center justify-center"
        style={{
          borderWidth: 2,
          borderColor: isSelected ? colors.brandSeller : colors.textSecondaryBorder,
          backgroundColor: isSelected ? colors.brandSeller : 'transparent',
        }}
      >
        {isSelected && <Check width={14} height={14} color="#fff" />}
      </View>
    </Pressable>
  );
}