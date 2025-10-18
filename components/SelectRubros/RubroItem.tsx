import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Check } from "../icons";

interface Rubro {
  label: string;
  value: string;
  icon: React.ReactNode;
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
        {/* El ícono ya viene con su color aplicado desde donde se crea */}
        {rubro.icon}
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
        className="w-5 h-5 rounded-md items-center justify-center"
        style={{
          borderWidth: 2,
          borderColor: isSelected ? colors.brandSeller : colors.border,
          backgroundColor: isSelected ? colors.brandSeller : 'transparent',
        }}
      >
        {isSelected && <Check width={14} height={14} color="#fff" />}
      </View>
    </Pressable>
  );
}