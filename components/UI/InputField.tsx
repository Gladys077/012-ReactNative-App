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
  iconRight?: React.ReactNode;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
  accessibilityLabel?: string;
  showPasswordToggle?: boolean;
  height?: "sm" | "md" | "lg";
  editable?: boolean;
  style?: any;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const InputField = ({
  label,
  required = false,
  subtext,
  icon,
  iconRight,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  accessibilityLabel,
  showPasswordToggle = false,
  height = "lg",
  editable = true,
}: InputFieldProps) => {
  const { colors } = useTheme();

  const [hidden, setHidden] = useState(secureTextEntry);
  const [localError, setLocalError] = useState<string>("");

  const heightStyles = { sm: 40, md: 48, lg: 56 };

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
    <View style={{ width: "100%" }}>
      {label && <Label required={required}>{label}</Label>}

      <View style={{ position: "relative" }}>
        {/* Icono izquierdo */}
        {icon && (
          <View
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              marginTop: -12,
              zIndex: 1,
            }}
          >
            {icon}
          </View>
        )}

        <TextInput
          style={{
            width: "100%",
            height: heightStyles[height],
            borderRadius: BorderRadius.pillBtn,
            borderWidth: 1,
            backgroundColor: colors.cardBg,
            borderColor: localError ? colors.textError : colors.border,
            color: colors.textDefault,
            paddingVertical: 0,
            paddingLeft: icon ? 40 : 16,
            paddingRight: showPasswordToggle || iconRight ? 40 : 16,
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          editable={editable}
          accessibilityLabel={accessibilityLabel || label || placeholder}
        />

        {/* Toggle mostrar/ocultar contraseña */}
        {showPasswordToggle && secureTextEntry && (
          <Pressable
            onPress={() => setHidden(!hidden)}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              marginTop: -12,
            }}
          >
            {hidden ? (
              <Invisible width={24} height={24} color={colors.textMuted} />
            ) : (
              <Visible width={24} height={24} color={colors.textMuted} />
            )}
          </Pressable>
        )}

        {/* Icono derecho general */}
        {!showPasswordToggle && iconRight && (
          <View
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              marginTop: -12,
            }}
          >
            {iconRight}
          </View>
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
