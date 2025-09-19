import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { BorderRadius } from "../../constants/Tokens";
import Label from "./Label";

type InputFieldProps = {
  label?: string;
  required?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
  className?: string;
  accessibilityLabel?: string;
  showPasswordToggle?: boolean;
  height?: "sm" | "md" | "lg"; // igual que en Button
};

export const InputField = ({
  label,
  required = false,
  subtext,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  className = "",
  accessibilityLabel,
  showPasswordToggle = false,
  height = "lg", // ✅ default
}: InputFieldProps) => {
  const { colors } = useTheme();
  const [hidden, setHidden] = React.useState(secureTextEntry);

  // ✅ Alturas consistentes con Button
  const heightClasses = {
    sm: "h-10", // 40px
    md: "h-12", // 48px
    lg: "h-14", // 56px
  };

  return (
    <View className="w-full">
      {/* Label principal */}
      {label && (
        <Label required={required} icon={icon}>
          {label}
        </Label>
      )}

      {/* Input */}
      <View className={`relative ${heightClasses[height]}`}>
        {/* Icono fijo a la izquierda dentro del input */}
        {icon && (
          <View className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
          </View>
        )}

        <TextInput
          className={[
            "w-full px-8 rounded-xl border",
            "bg-white text-gray-900 border-gray-300",
            "dark:bg-gray-800 dark:text-white dark:border-gray-600",
            className,
            "h-full", // para ocupar la altura que defina el wrapper
          ].join(" ")}
          style={{
            color: colors.textDefault,
            paddingVertical: 0, // centrado vertical
            borderRadius: BorderRadius.pillBtn,

          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          accessibilityLabel={accessibilityLabel || label || placeholder}
        />

        {/* Icono Visible/Invisible (solo si lo pedimos con showPasswordToggle) */}
        {showPasswordToggle && (
          <Pressable
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onPress={() => setHidden(!hidden)}
          >
            {/* Acá iría el ícono Visible/Invisible */}
          </Pressable>
        )}
      </View>

      {/* Subtext o error debajo del input */}
      {(subtext || error) && (
        <Label
          subtext={error ?? subtext}
          subtextStyle={error ? { color: colors.textError } : undefined}
          noMarginTop
        />
      )}
    </View>
  );
};
