import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { EditPencil } from "../icons";

interface DireccionEntregaProps {
  direccion: string;
  onEditar: () => void;
}

export default function DireccionEntrega({ direccion, onEditar }: DireccionEntregaProps) {
  const { colors } = useTheme();

  return (
    <View style={{ marginTop: Spacing.lg }}>
      <Text
        style={{
          fontFamily: "Roboto-Medium",
          fontSize: FontSizes.sm,
          color: colors.textDefault,
          marginBottom: Spacing.xs,
        }}
      >
        Dirección de entrega
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: BorderRadius.sm,
          paddingHorizontal: Spacing.md,
        }}
      >
        <TextInput
          value={direccion}
          editable={false}
          style={{
            flex: 1,
            fontFamily: "Roboto-Regular",
            color: colors.textDefault,
            fontSize: FontSizes.sm,
            paddingVertical: Spacing.sm,
          }}
        />
        <Pressable onPress={onEditar}>
          <EditPencil width={18} height={18} stroke={colors.brandBuyer} />
        </Pressable>
      </View>
    </View>
  );
}
