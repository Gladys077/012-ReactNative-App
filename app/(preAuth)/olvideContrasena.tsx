import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/UI/Button/Button";
import { InputField } from "../../components/UI/InputField";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function OlvideContrasena() {
  const { colors } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleSubmit = () => {
    setTouched(true);

    if (!email) {
      setError("Este campo es obligatorio");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    setError(undefined);
    // TODO: VER CON LIO el envío de mail de recuperación
    setSubmitted(true);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Spacing.lg,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.xl,
            marginTop: Spacing.xxl,
            paddingTop: Spacing.xxl,
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {submitted ? (
            <Text
              style={{ color: colors.textDefault, marginVertical: Spacing.md }}
            >
              ¡Listo! Revisa tu correo para restablecer tu contraseña.
            </Text>
          ) : (
            <>
              <Text
                style={{
                  color: colors.textDefault,
                  fontSize: 18,
                  marginBottom: Spacing.xxl,
                  fontWeight: "500",
                  alignSelf: "center",
                }}
              >
                Ingresa tu correo y te enviaremos un link para restablecer tu
                contraseña
              </Text>

              <InputField
                label="Correo electrónico"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);

                  // limpia error mientras escribe
                  if (error) setError(undefined);
                }}
                keyboardType="email-address"
                required
                error={touched ? error : undefined}
              />

              <View style={{ marginTop: Spacing.xxl }}>
                <Button section="common" width="full" onPress={handleSubmit}>
                  Enviar link de recuperación
                </Button>
              </View>
            </>
          )}

          <View style={{ marginTop: Spacing.xl, alignItems: "center" }}>
            <Text
              style={{ color: colors.brandCommon, fontWeight: "500" }}
              onPress={() => router.push("/login")}
            >
              Volver al login
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal de verificación de email */}
      {/* <EmailVerificationModal
        visible={showModal}
        email={email}
        onClose={() => setShowModal(false)}
        onGoToLogin={async () => {
          setShowModal(false);
          await router.push("/(auth)/login");
        }}
        onResend={async () => {
          console.log("Correo reenviado");
          return;
        }}
      /> */}
    </SafeAreaView>
  );
}
