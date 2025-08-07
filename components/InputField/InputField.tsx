import { useColorScheme } from 'nativewind';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;           // Para contraseñas
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'; // Indica q tipo de Teclado mostrar cuando el usuario toque textInput
  error?: string;                      // Mensaje de error si hay
  className?: string;                 // Estilos extra para el input
  accessibilityLabel?: string;        // Mejora accesibilidad (xa lectores de pantalla para personas con discapacidad visual)
};

export const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  className = '',
  accessibilityLabel,
}: InputFieldProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="w-full mb-4">
      {/* Label (si se pasa como prop) */}
      {label && (
        <Text className="mb-1 text-base font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </Text>
      )}

      {/* Input */}
      <TextInput
        className={[
          'px-4 py-3 rounded-xl border',
          'bg-white text-gray-900 border-gray-300',
          'dark:bg-gray-800 dark:text-white dark:border-gray-600',
          error ? 'border-red-500' : '',
          className,
        ].join(' ')}
        placeholder={placeholder}
        placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} // Tailwind: gray-400
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        accessibilityLabel={accessibilityLabel || label || placeholder}
      />

      {/* Error (si hay) */}
      {error && (
        <Text className="mt-1 text-sm text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
};
