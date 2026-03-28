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
  const { colors, fonts } = useTheme();
  const esInteractivo = typeof onPress === "function" && !deshabilitado;

  return (
    <Pressable
      onPress={esInteractivo ? onPress : undefined}
      disabled={!esInteractivo}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        gap: Spacing.sm,
        paddingHorizontal: Spacing.md,
        minHeight: 48,
        opacity: deshabilitado ? 0.5 : 1,
      }}
      android_ripple={{ color: colors.textSecondaryBg }}
    >
      {({ pressed }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 16,
            flex: 1,
            backgroundColor: pressed ? colors.bgPressed : "transparent",
          }}
        >
          <Icon
            width={26}
            height={26}
            style={iconStyle}
            fill={colors.textDefault}
          />

          <View style={{ marginTop: 4, marginLeft: Spacing.lg }}>
            <Text
              style={{
                fontFamily: fonts.robotoMedium,
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
                  color: colors.textDefault,
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
