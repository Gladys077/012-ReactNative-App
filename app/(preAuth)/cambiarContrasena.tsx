import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View
} from "react-native";
import { CambiarContraseña } from "../../components/icons";
import Button from "../../components/UI/Button/Button";
import { InputField } from "../../components/UI/InputField";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function CambiarContraseñaScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    const newErrors = { currentPassword: "", newPassword: "", confirmPassword: "" };
    let hasError = false;

    if (!password.trim()) {
      newErrors.currentPassword = "Por favor ingresa tu contraseña actual";
      hasError = true;
    }

    if (newPassword.length < 6) {
      newErrors.newPassword = "La nueva contraseña debe tener al menos 6 caracteres";
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
            <View style={{ alignItems: "center", marginVertical: Spacing.xxl }}>
              <CambiarContraseña width={100} height={100}  color={colors.textDefault}/>
            </View>

            {/* Inputs */}
            <View style={{ marginBottom: Spacing.xl, marginTop: Spacing.md }}>
              <InputField
                label="Contraseña"
                placeholder="Escribe tu contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry // arranca como password
                showPasswordToggle // activa el ojito
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
            <View className="flex-row justify-between">
              <View className="flex-1 mr-2">
                <Button
                  variant="secondary"
                  section="common"
                  width="auto"
                  onPress={() => router.back()}
                >
                  Cancelar
                </Button>
              </View>

              <View className="flex-1">
                <Button
                  variant="primary"
                  section="common"
                  width="auto"
                  onPress={handleSave} // TODO: lógica de guardar. VER CON LIO
                >
                  Guardar
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
