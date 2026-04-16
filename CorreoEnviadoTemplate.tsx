import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail } from "./components/icons";
import Button from "./components/UI/Button/Button";
import { Spacing } from "./constants/Tokens";
import { useTheme } from "./context/ThemeContext";

export default function CorreoEnviadoScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        centerContent={true}
      >
        <View style={styles.container}>
          {/* Branding / App Name */}
          <Text style={[styles.brand, { color: colors.brandCommon }]}>
            VeciApp
          </Text>

          {/* Icon Feedback */}
          <View
            style={[styles.iconContainer, { backgroundColor: colors.cardBg }]}
          >
            <Mail width={48} height={48} color={colors.brandCommon} />
          </View>

          {/* Content */}
          <Text
            style={[
              styles.title,
              { color: colors.textDefault, fontFamily: fonts.robotoBold },
            ]}
          >
            ¡Correo enviado!
          </Text>

          <Text style={[styles.description, { color: colors.textMuted }]}>
            Hemos enviado un enlace de recuperación a tu correo electrónico. Por
            favor, revisa tu bandeja de entrada (y la carpeta de spam).
          </Text>

          {/* Actions */}
          <View style={styles.buttonGap}>
            <Button
              variant="primary"
              section="common"
              width="full"
              onPress={() => router.replace("/login")}
            >
              Entendido
            </Button>

            <Button
              variant="secondary"
              section="common"
              width="full"
              onPress={() => console.log("Reenviar email")}
            >
              ¿No recibiste nada? Reenviar
            </Button>
          </View>

          {/* Footer Note */}
          <View style={styles.footerSupport}>
            <Text style={[styles.footerText, { color: colors.textMuted }]}>
              ¿Necesitas ayuda inmediata?{" "}
              <Text
                style={{ color: colors.brandCommon, fontWeight: "600" }}
                onPress={() => {
                  /* Abrir soporte */
                }}
              >
                Contactar soporte
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.xl,
  },
  container: {
    alignItems: "center",
    maxWidth: 450,
    width: "100%",
    alignSelf: "center",
  },
  brand: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: Spacing.xxl,
    letterSpacing: -1,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: Spacing.xxl,
  },
  buttonGap: {
    width: "100%",
    gap: Spacing.md,
  },
  footerSupport: {
    marginTop: Spacing.xxl,
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
  },
});
