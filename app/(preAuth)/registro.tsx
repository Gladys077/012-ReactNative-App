import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from "react-native";
import Button from "../../components/UI/Button/Button";
import EmailVerificationModal from "../../components/UI/EmailVerificationModal";
import { InputField } from "../../components/UI/InputField";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";


export default function RegistroScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cellular, setCellular] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [addressError, setAddressError] = useState<string | undefined>(undefined);
  const [cellularError, setCellularError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

  const [showModal, setShowModal] = useState(false);


  const handleRegister = () => {
    setNameError(undefined); 
    setAddressError(undefined);
    setCellularError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);

    let hasError = false;

    if (!name.trim()) {
      hasError = true;
      setNameError("Por favor ingresa tu nombre y apellido");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      hasError = true;
      setEmailError("Por favor ingresa un correo válido");
    }

    if (!address.trim()) {
      hasError = true;
      setAddressError("Por favor ingresa tu dirección");
    }

    if (!cellular.trim()) {
      hasError = true;
      setCellularError("Por favor ingresa tu número de celular");
    } else if (!/^\d+$/.test(cellular)) {
      hasError = true;
      setCellularError("El celular solo puede contener números");
    }

    if (!password) {
      hasError = true;
      setPasswordError("Por favor ingresa una contraseña");
    }

    if (!confirmPassword) {
      hasError = true;
      setConfirmPasswordError("Por favor confirma tu contraseña");
    }

    if (password && confirmPassword && password !== confirmPassword) {
      hasError = true;
      setConfirmPasswordError("Las contraseñas no coinciden");
    }

    if (hasError) return;

    // Simula el envío de correo y muestra el modal
    setShowModal(true);
    //  router.push("/(auth)/login"); 
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        // paddingTop: Spacing.lg,
      }}
    >
       <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // mueve el contenido al aparecer el teclado (behavior="height" en android funciona como padding)
      >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" // permite tocar btns sin cerrar teclado
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
          {/* Form Section */}
          <View style={{ marginBottom: Spacing.xxl }}>
            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Nombre y apellido"
                placeholder="Nombre y apellido"
                value={name}
                onChangeText={setName}
                error={nameError}
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Correo electrónico"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                error={emailError}
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Dirección"
                placeholder="Dirección"
                value={address}
                onChangeText={setAddress}
                error={addressError}
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Celular"
                placeholder="Celular"
                value={cellular}
                onChangeText={setCellular}
                keyboardType="phone-pad"
                error={cellularError}
              />
            </View>

            <View style={{ marginBottom: Spacing.xl }}>
              <InputField
                label="Contraseña"
                placeholder="Introduzca su contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                showPasswordToggle
                error={passwordError}
              />
            </View>

            <View style={{ marginBottom: Spacing.xxl }}>
              <InputField
                label="Confirmar Contraseña"
                placeholder="Confirme su contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                showPasswordToggle
                error={confirmPasswordError}
              />
            </View>

            <Button section="common" width="full" onPress={handleRegister}>
              Registrarse
            </Button>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal */}
      <EmailVerificationModal
        visible={showModal}
        email={email}
        onClose={() => setShowModal(false)}
        onGoToLogin={async () => {
          setShowModal(false);
          await router.push("/(auth)/login");
        } }
        onResend={async () => {
          console.log("Correo reenviado");
          // TODO: Ver con LIO, algo para reenviar el correo
          return;
        } }  />
    </SafeAreaView>
  );
}