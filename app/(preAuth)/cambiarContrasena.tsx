import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CambiarContraseña } from "../../components/icons";
import Button from "../../components/UI/Button/Button";
import { InputField } from "../../components/UI/InputField";
import Toast from "../../components/UI/Toast";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function CambiarContraseñaScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toastVisible, setToastVisible] = useState(false);

  // Validaciones
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let hasError = false;

    if (!password.trim()) {
      newErrors.currentPassword = "Por favor ingresa tu contraseña actual.";
      hasError = true;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "Por favor ingresa tu nueva contraseña.";
      hasError = true;
    }

    if (newPassword.length < 6) {
      newErrors.newPassword =
        "La nueva contraseña debe tener al menos 6 caracteres";
      hasError = true;
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    console.log("Contraseña cambiada correctamente");
    // TODO: lógica real de cambio de contraseña (API, etc.) VER CON LIO

    setToastVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: Spacing.lg,
              paddingBottom: Spacing.xl,
              maxWidth: 500,
              width: "100%",
              alignSelf: "center",
            }}
          >
            {/* Icono */}
            <View style={{ alignItems: "center", marginVertical: Spacing.xl }}>
              <CambiarContraseña
                width={100}
                height={100}
                color={colors.textDefault}
              />
            </View>

            {/* Inputs */}
            <View style={{ marginBottom: Spacing.xl, marginTop: Spacing.xxl }}>
              <InputField
                label="Contraseña"
                placeholder="Escribe tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry // arranca como password
                showPasswordToggle // activa el ojito
                error={errors.currentPassword}
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Nueva contraseña"
                placeholder="Escribe tu nueva contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                showPasswordToggle
                error={errors.newPassword}
              />
            </View>

            <View style={{ marginBottom: Spacing.xxl }}>
              <InputField
                label="Confirma contraseña"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                showPasswordToggle
                error={errors.confirmPassword}
              />
            </View>

            {/* Botones */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button
                  variant="secondary"
                  section="common"
                  width="full"
                  onPress={() => router.replace("/(auth)/elegirRol")}
                >
                  Cancelar
                </Button>
              </View>

              <View style={{ flex: 1 }}>
                <Button
                  variant="primary"
                  section="common"
                  width="full"
                  onPress={handleSave} // TODO: lógica de guardar. VER CON LIO
                >
                  Guardar
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast
        mensaje="¡Cambio de contraseña efectuado!"
        visible={toastVisible}
        variante="success"
        onOcultar={() => {
          setToastVisible(false);
          router.back();
        }}
      />
    </SafeAreaView>
  );
}
