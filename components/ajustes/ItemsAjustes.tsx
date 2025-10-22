import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { ComponentType } from "react";
import { Pressable, Text, View } from "react-native";

interface ItemsAjustesProps {
  icon: ComponentType<any>;
  texto: string;
  onPress?: () => void;
  textoSecundario?: string;
  deshabilitado?: boolean;
  iconStyle?: any;
}

const ItemsAjustes = ({
  icon: Icon,
  texto,
  onPress,
  textoSecundario,
  deshabilitado = false,
  iconStyle,
}: ItemsAjustesProps) => {
  const { colors } = useTheme();
  const esInteractivo = typeof onPress === "function" && !deshabilitado;

  return (
    <Pressable
      onPress={esInteractivo ? onPress : undefined}
      disabled={!esInteractivo}
      className="flex-row items-center rounded-2xl"
      style={{
        gap: Spacing.sm,
        paddingHorizontal: Spacing.md,
        minHeight: 48,
        opacity: deshabilitado ? 0.5 : 1,
      }}
      android_ripple={{ color: colors.textSecondaryBg }}
    >
      {({ pressed }) => (
        <View
          className="flex-row items-center rounded-2xl flex-1"
          style={{
            backgroundColor: pressed ? colors.bgPressed : "transparent",
          }}
        >
          {/* Ícono */}
          <Icon
            width={26}
            height={26}
            style={iconStyle}
            fill={colors.textDefault}
          />

          {/* Textos */}
          <View style={{ marginTop: 4, marginLeft: Spacing.lg }}>
            <Text
              className="font-Robotoo-Medium"
              style={{
                fontSize: FontSizes.base,
                color: colors.textDefault,
              }}
            >
              {texto}
            </Text>

            {textoSecundario && (
              <Text
                style={{
                  fontSize: FontSizes.sm,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                {textoSecundario}
              </Text>
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default ItemsAjustes;
