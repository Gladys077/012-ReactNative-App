import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectRubros from "../../components/SelectRubros/SelectRubros";
import EmailVerificationModal from "../../components/subcomponentes/EmailVerificationModal";
import Button from "../../components/UI/Button/Button";
import { InputField } from "../../components/UI/InputField";
import LineaDivisoria from "../../components/UI/LineaDivisoria";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function RegistroScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cellular, setCellular] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rubros, setRubros] = useState<string[]>([]);
  const [isSeller, setIsSeller] = useState(false);
  const [alias, setAlias] = useState("");
  const [banco, setBanco] = useState("");
  const [titular, setTitular] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    userName: "",
    email: "",
    address: "",
    cellular: "",
    password: "",
    confirmPassword: "",
    alias: "",
    banco: "",
    titular: "",
  });

  const handleRegister = () => {
    const newErrors = {
      name: "",
      userName: "",
      email: "",
      address: "",
      cellular: "",
      password: "",
      confirmPassword: "",
      alias: "",
      banco: "",
      titular: "",
    };
    let hasError = false;

    if (!name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre y apellido";
      hasError = true;
    }

    if (!userName.trim()) {
      newErrors.userName = "Por favor elige un nombre de usuario";
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Por favor ingresa un correo válido";
      hasError = true;
    }

    if (!address.trim()) {
      newErrors.address = "Por favor ingresa tu dirección";
      hasError = true;
    }

    if (!cellular.trim()) {
      newErrors.cellular = "Por favor ingresa tu número de celular";
      hasError = true;
    } else if (!/^\d+$/.test(cellular)) {
      newErrors.cellular = "El celular solo puede contener números";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Por favor ingresa una contraseña";
      hasError = true;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Por favor confirma tu contraseña";
      hasError = true;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      hasError = true;
    }

    if (isSeller) {
      if (!alias.trim()) {
        newErrors.alias = "Ingresa tu alias bancario";
        hasError = true;
      }
      if (!banco.trim()) {
        newErrors.banco = "Ingresa el banco";
        hasError = true;
      }
      if (!titular.trim()) {
        newErrors.titular = "Ingresa el nombre del titular";
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (hasError) return;

    setShowModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.removeItem("selectedRubros_seller");
      setName("");
      setUserName("");
      setEmail("");
      setAddress("");
      setCellular("");
      setPassword("");
      setConfirmPassword("");
      setRubros([]);
      setIsSeller(false);
      setAlias("");
      setBanco("");
      setTitular("");
    }, []),
  );

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
              paddingHorizontal: Spacing.xl,
              paddingBottom: Spacing.xl,
              maxWidth: 500,
              width: "100%",
              alignSelf: "center",
            }}
          >
            <View style={{ marginBottom: Spacing.xxl }}>
              <View style={{ marginBottom: Spacing.md }}>
                <InputField
                  label="Nombre y apellido"
                  placeholder="Nombre y apellido"
                  value={name}
                  onChangeText={setName}
                  error={errors.name}
                />
              </View>

              <View style={{ marginBottom: Spacing.md }}>
                <InputField
                  label="Usuario"
                  placeholder="Crea tu nombre de usuario"
                  value={userName}
                  onChangeText={setUserName}
                  error={errors.userName}
                />
              </View>

              <View style={{ marginBottom: Spacing.md }}>
                <InputField
                  label="Correo electrónico"
                  placeholder="nombre@ejemplo.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  error={errors.email}
                />
              </View>

              <View style={{ marginBottom: Spacing.md }}>
                <InputField
                  label="Dirección"
                  placeholder="Dirección"
                  value={address}
                  onChangeText={setAddress}
                  error={errors.address}
                />
              </View>

              <View style={{ marginBottom: Spacing.md }}>
                <InputField
                  label="Celular"
                  placeholder="Celular"
                  value={cellular}
                  onChangeText={setCellular}
                  keyboardType="phone-pad"
                  error={errors.cellular}
                />
              </View>

              <View style={{ marginBottom: Spacing.md }}>
                <InputField
                  label="Contraseña"
                  placeholder="Introduzca su contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  showPasswordToggle
                  error={errors.password}
                />
              </View>

              <View style={{ marginBottom: Spacing.lg }}>
                <InputField
                  label="Confirmar Contraseña"
                  placeholder="Confirme su contraseña"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  showPasswordToggle
                  error={errors.confirmPassword}
                />
              </View>

              <LineaDivisoria />

              {/* Checkbox vendedor */}
              <Pressable
                onPress={() => setIsSeller((prev) => !prev)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: Spacing.md,
                }}
              >
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderWidth: 1.5,
                    borderColor: colors.textDefault,
                    marginRight: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isSeller
                      ? colors.brandCommon
                      : "transparent",
                  }}
                />
                <Text style={{ color: colors.textDefault, marginLeft: 8 }}>
                  Deseo vender
                </Text>
              </Pressable>

              {/* Rubros */}
              {isSeller && (
                <View
                  style={{ marginBottom: Spacing.xxl, marginTop: Spacing.md }}
                >
                  <SelectRubros
                    label="Selecciona tu/s rubro/s"
                    section="seller"
                    selected={rubros}
                    onChange={setRubros}
                  />
                </View>
              )}

              {/* Datos bancarios */}
              {isSeller && (
                <View
                  style={{
                    marginBottom: Spacing.xl,
                    borderWidth: 3,
                    borderRadius: 24,
                    borderColor: colors.cardBg,
                    padding: 16,
                    paddingBottom: 4,
                  }}
                >
                  <Text
                    style={{
                      color: colors.textDefault,
                      fontFamily: fonts.robotoBold,
                      marginBottom: Spacing.sm,
                    }}
                  >
                    Datos bancarios
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: 12 }}>
                    Estos datos le llegarán a tus clientes cuando elijan
                    abonarte por transferencia.
                  </Text>

                  <View style={{ marginBottom: Spacing.lg }}>
                    <InputField
                      label="Alias"
                      value={alias}
                      onChangeText={setAlias}
                      editable
                      error={errors.alias}
                    />
                  </View>
                  <View style={{ marginBottom: Spacing.lg }}>
                    <InputField
                      label="Banco o billetera virtual"
                      value={banco}
                      onChangeText={setBanco}
                      editable
                      error={errors.banco}
                    />
                  </View>
                  <View style={{ marginBottom: Spacing.xxl }}>
                    <InputField
                      label="Titular"
                      value={titular}
                      onChangeText={setTitular}
                      editable
                      error={errors.titular}
                    />
                  </View>
                </View>
              )}

              <Button section="common" width="full" onPress={handleRegister}>
                Registrarse
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <EmailVerificationModal
        visible={showModal}
        email={email}
        onClose={() => setShowModal(false)}
        onGoToLogin={async () => {
          setShowModal(false);
          router.replace("./(auth)/login");
        }}
        onResend={async () => {
          console.log("Correo reenviado"); //TODO: VER CON LIO
          return;
        }}
      />
    </SafeAreaView>
  );
}
