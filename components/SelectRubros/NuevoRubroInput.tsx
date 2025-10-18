import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { TiendaIcon } from "../icons";

type NuevoRubroInputProps = {
  value: string;
  onChange: (text: string) => void;
  onAdd: () => void;
  onCancel: () => void;
};

export default function NuevoRubroInput({ 
  value, 
  onChange, 
  onAdd,
  onCancel 
}: NuevoRubroInputProps) {
  const { colors, mode } = useTheme();
  
  return (
    <View 
      className="flex-row items-center p-3 rounded-xl"
      style={{ backgroundColor: mode === 'dark' ? '#2D3748' : '#F9FAFB' }}
    >
      {/* Círculo con icono */}
      <View 
        className="w-9 h-9 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: mode === 'dark' ? '#4A5568' : '#E5E7EB' }}
      >
        <TiendaIcon width={18} height={18} color={colors.textMuted} />
      </View>

      {/* Input */}
      <TextInput
        placeholder="Nombre del nuevo rubro"
        value={value}
        onChangeText={onChange}
        className="flex-1 text-base"
        style={{ color: colors.textDefault }}
        placeholderTextColor={colors.textMuted}
        autoFocus
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />

      {/* Botones de acción */}
      <View className="flex-row gap-2 ml-2">
        {/* Botón confirmar */}
        <Pressable
          onPress={onAdd}
          disabled={!value.trim()}
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{
            backgroundColor: value.trim() ? colors.brandSeller : colors.border,
          }}
        >
          <Text className="text-white font-bold text-sm">✓</Text>
        </Pressable>

        {/* Botón cancelar */}
        <Pressable
          onPress={onCancel}
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.border }}
        >
          <Text 
            className="font-bold text-sm"
            style={{ color: colors.textMuted }}
          >
            ✕
          </Text>
        </Pressable>
      </View>
    </View>
  );
}