/* Muestra un texto principal (lo q pasemos x children, por ej. "Email" o "Contraseña").
Opcionales: 
-agrega un asterisco (*) en rojo si el campo es required.
-muestra un icono al lado del texto principal si pasás icon.
-muestra un subtexto (ejemplo: "Debe tener al menos 8 caracteres") debajo, en tipografía más pequeña y color tenue.
Permite clases adicionales con className para ajustar su estilo/espaciado en contextos distintos.*/

import { Text, View } from "react-native";

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  icon?: React.ReactNode;
  subtext?: string;
  className?: string;

}

export default function Label({
  children,
  required = false,
  icon,
  subtext,
  className = "",
}: LabelProps) {
  return (
    <View className={`flex flex-col mt-4 ${className}`}>
      <View className="flex-row items-center gap-1">
        <Text className="text-sm text-text-default font-medium">
          {children}
        </Text>
        {required && (
          <Text className="text-sm text-text-error font-medium">*</Text>
        )}
        {icon && <View className="ml-1">{icon}</View>}
      </View>

      {subtext && (
        <Text className="text-xs text-text-muted mt-1 leading-4">
          {subtext}
        </Text>
      )}
    </View>
  );
}

// Ejemplo de uso:
// <Label required icon={<SomeIcon />} subtext="Debe tener al menos 8 caracteres">
//   Contraseña
// </Label>