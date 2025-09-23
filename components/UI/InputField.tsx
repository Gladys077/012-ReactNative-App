import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { BorderRadius } from "../../constants/Tokens";
import { Invisible, Visible } from "../icons";
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
  height?: "sm" | "md" | "lg";
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
  height = "lg",
}: InputFieldProps) => {
  const { colors } = useTheme();

  const [hidden, setHidden] = useState(secureTextEntry);
  const [localError, setLocalError] = useState<string>("");

  const heightStyles = { sm: 40, md: 48, lg: 56 };

  // Validación automática
  useEffect(() => {
    if (!value && required) {
      setLocalError("Este campo es obligatorio");
    } else if (keyboardType === "email-address") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setLocalError("Debe ser un correo válido");
      } else {
        setLocalError("");
      }
    } else {
      setLocalError("");
    }
  }, [value, required, keyboardType]);

  return (
    <View className="w-full">
      {label && (
        <Label required={required} icon={icon}>
          {label}
        </Label>
      )}

      <View className="relative">
        {icon && (
          <View className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
          </View>
        )}

        <TextInput
          className={["w-full px-4 rounded-xl border", className].join(" ")}
          style={{
            height: heightStyles[height],
            borderRadius: BorderRadius.pillBtn,
            backgroundColor: colors.cardBg,
            borderColor: localError ? colors.textError : colors.border,
            color: colors.textDefault,
            paddingVertical: 0,
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          accessibilityLabel={accessibilityLabel || label || placeholder}
        />

        {showPasswordToggle && secureTextEntry && (
          <Pressable
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onPress={() => setHidden(!hidden)}
          >
            {hidden ? (
              <Invisible width={20} height={20} color={colors.textMuted} />
            ) : (
              <Visible width={20} height={20} color={colors.textMuted} />
            )}
          </Pressable>
        )}
      </View>

      {(subtext || error || localError) && (
        <Label
          subtext={error ?? localError ?? subtext}
          subtextStyle={{
            color: error || localError ? colors.textError : colors.textMuted,
          }}
          noMarginTop
        />
      )}
    </View>
  );
};
