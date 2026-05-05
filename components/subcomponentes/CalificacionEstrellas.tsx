import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Estrella0, Estrella100 } from "../icons";

const EMOJIS = ["😞", "😕", "😐", "😊", "🤩"];

interface CalificacionEstrellasProps {
  onEnviar: (data: { estrellas: number; comentario: string }) => void;
  titulo?: string;
  colorBoton?: string;
}

export default function CalificacionEstrellas({
  onEnviar,
  titulo = "Calificá al vendedor",
  colorBoton,
}: CalificacionEstrellasProps) {
  const { colors, fonts } = useTheme();
  const [estrellas, setEstrellas] = useState(0);
  const [comentario, setComentario] = useState("");

  const colorBtnFinal = colorBoton ?? colors.brandBuyer;

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: 16,
        padding: Spacing.xl,
        gap: Spacing.lg,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.robotoBold,
          fontSize: FontSizes.base,
          color: colors.textDefault,
          textAlign: "center",
        }}
      >
        {titulo}
      </Text>

      {/* Estrellas + emoji */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: Spacing.md,
        }}
      >
        <View style={{ flexDirection: "row", gap: 6 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable key={n} onPress={() => setEstrellas(n)}>
              {n <= estrellas ? (
                <Estrella100
                  width={36}
                  height={36}
                  fill={colors.statusYellowDot}
                />
              ) : (
                <Estrella0
                  width={36}
                  height={36}
                  fill={colors.textSecondaryBg}
                />
              )}
            </Pressable>
          ))}
        </View>
        {estrellas > 0 && (
          <Text style={{ fontSize: 28 }}>{EMOJIS[estrellas - 1]}</Text>
        )}
      </View>

      {/* Comentario */}
      <TextInput
        placeholder="Comentario (opcional)"
        placeholderTextColor={colors.textMuted}
        value={comentario}
        onChangeText={setComentario}
        multiline
        style={{
          borderWidth: 1,
          borderColor: colors.borderTopBottom,
          borderRadius: 10,
          padding: Spacing.md,
          color: colors.textDefault,
          fontSize: FontSizes.sm,
          minHeight: 60,
          textAlignVertical: "top",
        }}
      />

      {/* Botón enviar */}
      <Pressable
        onPress={() => {
          if (estrellas === 0) return;
          onEnviar({ estrellas, comentario });
        }}
        style={({ pressed }) => ({
          backgroundColor: estrellas === 0 ? colors.textMuted : colorBtnFinal,
          borderRadius: 12,
          padding: Spacing.md,
          alignItems: "center",
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.base,
            color: colors.textOnColor,
          }}
        >
          Enviar calificación
        </Text>
      </Pressable>
    </View>
  );
}
