import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Button from "../../components/UI/Button/Button";
import ButtonGoogle from "../../components/UI/Button/ButtonGoogle";
import { InputField } from "../../components/UI/InputField";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Iniciar sesión", { email, password });
    router.push("/elegirRol"); // debe ir a elegir-rol
  };

  const handleGoogleLogin = () => {
    console.log("Continuar con Google");
    // TODO: VER CON LIO la lógica de Auth con Google
  };

  const handleRegister = () => {
    router.push("/registro"); // debe ir a la page registro 
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
            marginTop: Spacing.lg,
            paddingTop: Spacing.lg,
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
                    fontWeight: "bold",
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
                fontWeight: "bold",
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
                label="Email o usuario"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Contraseña"
                placeholder="••••••••"
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
                    color: colors.brandCommon,
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
                marginVertical: Spacing.xxl,
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
            <ButtonGoogle onLogin={handleGoogleLogin}>
              Google
            </ButtonGoogle>
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
                    fontWeight: "500",
                    fontSize: 14,
                    color: colors.brandCommon,
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