import { BorderRadius, Spacing } from "@/constants/Tokens";
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
  onCancel,
}: NuevoRubroInputProps) {
  const { colors, fonts, mode } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: BorderRadius.xl,
        backgroundColor: mode === "dark" ? "#2D3748" : "#F9FAFB",
      }}
    >
      {/* Círculo con icono */}
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: BorderRadius.full,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
          backgroundColor: mode === "dark" ? "#4A5568" : "#E5E7EB",
        }}
      >
        <TiendaIcon width={18} height={18} color={colors.textMuted} />
      </View>

      {/* Input */}
      <TextInput
        placeholder="Nombre del nuevo rubro"
        value={value}
        onChangeText={onChange}
        style={{ flex: 1, fontSize: 16, color: colors.textDefault }}
        placeholderTextColor={colors.textMuted}
        autoFocus
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />

      {/* Botones de acción */}
      <View
        style={{
          flexDirection: "row",
          gap: Spacing.sm,
          marginLeft: Spacing.sm,
        }}
      >
        {/* Botón confirmar */}
        <Pressable
          onPress={onAdd}
          disabled={!value.trim()}
          style={{
            width: 32,
            height: 32,
            borderRadius: BorderRadius.full,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: value.trim() ? colors.brandSeller : colors.border,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: fonts.robotoBold,
              fontSize: 14,
            }}
          >
            ✓
          </Text>
        </Pressable>

        {/* Botón cancelar */}
        <Pressable
          onPress={onCancel}
          style={{
            width: 32,
            height: 32,
            borderRadius: BorderRadius.full,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.robotoBold,
              fontSize: 14,
              color: colors.textMuted,
            }}
          >
            ✕
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
