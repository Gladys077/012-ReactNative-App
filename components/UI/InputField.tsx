import { useTheme } from "@/context/ThemeContext";
import React from "react";
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
  className = "",
  accessibilityLabel,
  showPasswordToggle = false,
  height = "lg",
}: InputFieldProps) => {
  const { colors } = useTheme();

  // Estado para ocultar/mostrar contraseña
  const [hidden, setHidden] = React.useState(secureTextEntry);
  // Estado interno de error
  const [error, setError] = React.useState<string | undefined>();

  const heightStyles = {
    sm: 40,
    md: 48,
    lg: 56,
  };

  // Función que maneja cambios y valida
  const handleChangeText = (text: string) => {
    onChangeText(text);

    // Validación required
    if (required && !text.trim()) {
      setError("Este campo es obligatorio");
      return;
    }

    // Validación email si corresponde
    if (keyboardType === "email-address") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (text && !emailRegex.test(text)) {
        setError("Ingresa un correo válido");
        return;
      }
    }

    // Si pasa validaciones
    setError(undefined);
  };

  return (
    <View className="w-full">
      {label && <Label required={required} icon={icon}>{label}</Label>}

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
            borderColor: colors.border,
            color: colors.textDefault,
            paddingVertical: 0,
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={handleChangeText} // función q valida email
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

      {(subtext || error) && (
        <Label
          subtext={error ?? subtext}
          subtextStyle={error ? { color: colors.textError } : { color: colors.textMuted }}
          noMarginTop
        />
      )}
    </View>
  );
};
