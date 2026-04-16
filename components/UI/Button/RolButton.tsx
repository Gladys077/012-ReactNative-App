import React, { ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { BorderRadius, shadows, Spacing } from "../../../constants/Tokens";
import { useTheme } from "../../../context/ThemeContext";
import { FlechaDerecha } from "../../icons";

interface RoleButtonProps {
  icon: ComponentType<SvgProps>;
  section: "buyer" | "seller";
  onPress?: () => void;
  title: string;
  subtitle: string;
}

const RoleButton = ({
  title,
  subtitle,
  section,
  icon: Icon,
  onPress,
}: RoleButtonProps) => {
  const { colors, fonts } = useTheme();

  const bgColor = section === "buyer" ? colors.brandBuyer : colors.brandSeller;
  const iconColor =
    section === "buyer" ? colors.brandBuyer : colors.brandSeller;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: bgColor,
        borderRadius: BorderRadius.pillBtn,
        height: 120,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Spacing.xl,
        marginVertical: Spacing.sm,
        opacity: pressed ? 0.92 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        ...shadows.md,
      })}
    >
      {/* Círculo con ícono */}
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 24,
          backgroundColor: colors.cardBg,
          alignItems: "center",
          justifyContent: "center",
          marginRight: Spacing.md,
        }}
      >
        {Icon && <Icon width={30} height={30} fill={iconColor} />}
      </View>

      {/* Textos */}
      <View style={{ flex: 1, paddingHorizontal: Spacing.md }}>
        <Text
          style={{
            color: colors.textOnColor,
            fontFamily: fonts.robotoBold,
            fontSize: 16,
            marginBottom: 2,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={{ color: colors.textOnColor, fontSize: 13, opacity: 0.9 }}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </View>

      {/* Flecha */}
      <FlechaDerecha fill={colors.textOnColor} height={24} width={24} />
    </Pressable>
  );
};

export default RoleButton;
