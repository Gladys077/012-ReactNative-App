import { Mail } from "@/components/icons";
import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onResend: () => Promise<void>; // TODO: función que llama al backend para reenviar link - VER CON LIO
  resendCooldownSeconds?: number; // por defecto 30s
  onGoToLogin: () => Promise<void>; // función para ir a login
};

export default function EmailVerificationModal({
  visible,
  email,
  onClose,
  onResend,
  resendCooldownSeconds = 30,
}: Props) {
  const { colors, fonts } = useTheme();
  const [cooldown, setCooldown] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cooldown]);

  useEffect(() => {
    if (!visible) {
      setCooldown(0);
      setLoading(false);
    }
  }, [visible]);

  async function handleResend() {
    if (cooldown > 0) return;
    setLoading(true);
    try {
      await onResend();
      setCooldown(resendCooldownSeconds);
    } catch (err) {
      console.warn("Resend failed", err);
      Alert.alert(
        "Error",
        "No pudimos reenviar el correo. Intentá de nuevo más tarde.",
      );
    } finally {
      setLoading(false);
    }
  }

  // Intenta abrir la app de correo. No hay garantía de abrir la bandeja de entrada en todos los dispositivos.
  function handleOpenMailApp() {
    // Intentos por plataforma (fallbacks)
    const emailUrl = "mailto:" + email;
    const schemes = Platform.select({
      ios: ["message://", "mailto://", "shareddocuments://"],
      android: ["mailto:"],
    }) as string[] | undefined;

    // Primero intento mailto
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(emailUrl);
        }
        // fallback simple (abre settings)
        return Linking.openSettings();
      })
      .catch(() => {
        Linking.openSettings().catch(() => {});
      });
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          paddingHorizontal: Spacing.lg,
        }}
      >
        <View
          style={{
            backgroundColor: colors.cardBg,
            borderRadius: 12,
            padding: Spacing.xl,
            shadowColor: "#000",
            shadowOpacity: 0.12,
            shadowRadius: 10,
            elevation: 8,
          }}
        >
          <View style={{ alignItems: "center", marginBottom: Spacing.md }}>
            {/* Icono */}
            <Mail width={48} height={48} color={colors.brandCommon} />
          </View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: fonts.robotoBold,
              color: colors.textDefault,
              textAlign: "center",
              marginBottom: Spacing.sm,
            }}
          >
            Te enviamos un correo
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: colors.textMuted,
              textAlign: "center",
              marginBottom: Spacing.md,
            }}
          >
            Enviamos un link a: {"\n"}
            <Text
              style={{
                color: colors.brandCommon,
                fontFamily: fonts.robotoMedium,
              }}
            >
              {email}
            </Text>
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: colors.textMuted,
              textAlign: "center",
              marginBottom: Spacing.md,
            }}
          >
            Tocá el link en tu correo para entrar a la app. El link expira en
            breve por seguridad.
          </Text>

          <View style={{ marginTop: Spacing.sm }}>
            <Pressable
              onPress={handleOpenMailApp}
              style={{
                backgroundColor: colors.brandCommon,
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: "center",
                marginBottom: Spacing.sm,
              }}
              accessibilityLabel="Abrir correo"
            >
              <Text
                style={{
                  color: colors.textOnColor,
                  fontFamily: fonts.robotoBold,
                }}
              >
                Abrir correo
              </Text>
            </Pressable>

            <Pressable
              onPress={handleResend}
              disabled={cooldown > 0 || loading}
              style={{
                paddingVertical: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                marginBottom: Spacing.sm,
                backgroundColor: cooldown > 0 ? colors.cardBg : undefined,
              }}
              accessibilityLabel="Reenviar correo"
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={{
                    color: colors.textDefault,
                    fontFamily: fonts.robotoBold,
                  }}
                >
                  {cooldown > 0
                    ? `Reenviar en ${cooldown}s`
                    : "Reenviar correo"}
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={onClose}
              style={{
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: "center",
              }}
              accessibilityLabel="Cerrar"
            >
              <Text style={{ color: colors.textMuted }}>Volver al login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
