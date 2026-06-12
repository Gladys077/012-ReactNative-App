import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/UI/Button/Button";
import ButtonGoogle from "../../components/UI/Button/ButtonGoogle";
import { InputField } from "../../components/UI/InputField";
import { Routes } from "../../constants/Routes";
import { Spacing } from "../../constants/Tokens";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";

export default function LoginScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showToast } = useToast();

  const { loginWithCredentials } = useAuthContext();

  const handleLogin = () => {
    const user = loginWithCredentials(email, password);

    if (!user) {
      showToast("⚠  Credenciales correctas", "error");
      return;
    }

    if (user.role === "seller") {
      router.replace(Routes.vendedor.home);
    } else {
      router.replace(Routes.comprador.nuevoPedido);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Continuar con Google");
    // TODO: VER CON LIO la lógica de Auth con Google
  };

  const handleRegister = () => {
    router.push("/registro");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
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
            marginTop: Spacing.lg,
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* Logo Section */}
          <View style={{ alignItems: "center", marginBottom: Spacing.xxl }}>
            <View
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                backgroundColor: colors.brandCommon,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: Spacing.lg,
              }}
            >
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: colors.brandBuyer,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.textOnColor,
                    fontFamily: fonts.robotoBold,
                    fontSize: 14,
                  }}
                >
                  LOGO
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: colors.textDefault,
                fontSize: 24,
                fontFamily: fonts.robotoBold,
                marginBottom: Spacing.sm,
              }}
            >
              ¡Bienvenido!
            </Text>

            <Text style={{ color: colors.textMuted, fontSize: 14 }}>
              Inicia sesión para continuar
            </Text>
          </View>

          {/* Form Section */}
          <View style={{ marginBottom: Spacing.xl }}>
            <View style={{ marginBottom: Spacing.md }}>
              <InputField
                label="Usuario o email"
                placeholder="Usuario o nombre@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Contraseña"
                placeholder="Escribe tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry // arranca como password
                showPasswordToggle // activa el ojito
              />

              {/* Forgot Password Link */}
              <Pressable
                onPress={() => router.push("/olvideContrasena")}
                style={{ alignSelf: "flex-end", marginTop: Spacing.sm }}
              >
                {({ pressed }) => (
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.statusPurpleDot,
                      opacity: pressed ? 0.7 : 1,
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>
                )}
              </Pressable>
            </View>

            {/* Login Button */}
            <Button section="common" width="full" onPress={handleLogin}>
              Iniciar sesión
            </Button>

            {/* Divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: Spacing.xxl,
                marginBottom: Spacing.xl,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: colors.border,
                }}
              />
              <Text
                style={{
                  marginHorizontal: Spacing.md,
                  fontSize: 12,
                  color: colors.textMuted,
                }}
              >
                O continúa con
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: colors.border,
                }}
              />
            </View>

            {/* Google Button */}
            <ButtonGoogle onLogin={handleGoogleLogin}>Google</ButtonGoogle>
          </View>

          {/* Register Link */}
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                marginBottom: Spacing.sm,
                color: colors.textMuted,
              }}
            >
              ¿No tienes cuenta?
            </Text>
            <Pressable onPress={handleRegister}>
              {({ pressed }) => (
                <Text
                  style={{
                    fontFamily: fonts.robotoMedium,
                    fontSize: 14,
                    color: colors.statusPurpleDot,
                    opacity: pressed ? 0.7 : 1,
                  }}
                >
                  Regístrate
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//TODO: INGRESAR CON GOOGLE, CONECTAR CON BACKEND
