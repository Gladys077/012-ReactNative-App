import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { BorderRadius, FontSizes, Spacing } from "../../constants/Tokens";
import { EditPencil, Ubicacion } from "../icons";

interface Props {
  direccion: string;
  editable: boolean;               // viene desde el padre
  onEditarDireccion: () => void;   // btn EDITAR
  onCambiarDireccion: (text: string) => void; // mientras escribe
  onGuardarDireccion: () => void;  // btn GUARDAR
  errorDireccion?: string; 
  disable?: boolean;
}

const DireccionEntrega: React.FC<Props> = ({
  direccion,
  editable,
  onEditarDireccion,
  onCambiarDireccion,
  onGuardarDireccion,
  errorDireccion,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        marginTop: 20,
        padding: 14,
        backgroundColor: colors.cardBg,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Ubicacion
          width={16}
          height={16}
          fill={colors.textDefault}
          // stroke={colors.textDefault}
        />

        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: FontSizes.sm,
            color: colors.textDefault,
            flex: 1,
          }}
        >
          Dirección de entrega
        </Text>

        {/* Botón Editar / Guardar */}
        {!editable ? (
          <Pressable
            onPress={onEditarDireccion}
            style={{ flexDirection: "row", alignItems: "center", gap: 4, padding: 4 }}
          >
            <EditPencil width={16} height={16} fill={colors.brandBuyer} />
          </Pressable>
        ) : (
          <Pressable
            onPress={onGuardarDireccion}
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: FontSizes.sm,
                color: colors.brandBuyer,
              }}
            >
              Guardar
            </Text>
          </Pressable>
        )}
      </View>

      {/* Campo editable */}
      <TextInput
        value={direccion}
        onChangeText={onCambiarDireccion}
        editable={editable}
        // multiline
        style={{
          marginTop: 8,
          color: colors.textDefault,
          borderWidth: 1,
          padding: Spacing.md,
          fontSize: FontSizes.sm,
          borderRadius: BorderRadius.md,
          borderColor: errorDireccion ? colors.textError : colors.textMuted,
          backgroundColor: colors.background,
          opacity: editable ? 1 : 0.85,
        }}
      />

      {/* Error debajo del input */}
      {errorDireccion ? (
        <Text
          style={{
            marginTop: 4,
            fontSize: FontSizes.xs,
            color: colors.textError,
          }}
        >
          {errorDireccion}
        </Text>
      ) : null}
    </View>
  );
};

export default DireccionEntrega;
