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
  onChangeText: (text: string) => void; // función obligatoria: actualiza el valor del input cada vez que cambia
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
  className?: string;
  accessibilityLabel?: string; // texto que describe el campo para lectores de pantalla (mejora accesibilidad)
  showPasswordToggle?: boolean;
  height?: "sm" | "md" | "lg";
  editable?: boolean;
  style?: any; // permite sobrescribir o extender estilos del input desde fuera (ej: borderColor dinámico)
  onFocus?: () => void; // se llama cuando el input gana foco (ej: para resaltar el borde o limpiar errores)
  onBlur?: () => void; // se llama cuando el input pierde foco (ej: validar o quitar resaltado)
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
  className = "",
  accessibilityLabel,
  showPasswordToggle = false,
  height = "lg",
  editable = true,
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
        <Label required={required}>
          {label}
        </Label>
      )}

      <View className="relative">
        {/* Icono izquierdo (por ejemplo, Mail, User, etc.) */}
        {icon && (
          <View className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
          </View>
        )}

        <TextInput
        className={[
          "w-full rounded-xl border",
          icon ? "pl-10" : "px-4", // deja espacio si hay ícono a la izquierda
          className,
        ].join(" ")}          
        style={{
            height: heightStyles[height],
            borderRadius: BorderRadius.pillBtn,
            backgroundColor: colors.cardBg,
            borderColor: localError ? colors.textError : colors.border,
            color: colors.textDefault,
            paddingVertical: 0,
            paddingRight: showPasswordToggle || iconRight ? 40 : 16,
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          editable={editable !== false} 
          accessibilityLabel={accessibilityLabel || label || placeholder}
        />

        {/* Icono para mostrar/ocultar contraseña */}
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

        {/* Icono derecho general (por ejemplo, EditPencil) */}
        {!showPasswordToggle && iconRight && (
          <View className="absolute right-4 top-1/2 -translate-y-1/2">
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
