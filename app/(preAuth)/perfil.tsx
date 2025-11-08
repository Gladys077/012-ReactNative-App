import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import SelectRubros from "../../components/SelectRubros/SelectRubros";
import Button from "../../components/UI/Button/Button";
import EmailVerificationModal from "../../components/UI/EmailVerificationModal";
import { InputField } from "../../components/UI/InputField";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function PerfilScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  // TODO: VER CON LIO. Por ahora datos del usuario simulados
  const [name, setName] = useState("María López");
  const [email, setEmail] = useState("maria@mail.com");
  const [address, setAddress] = useState("Av. Siempre Viva 123");
  const [cellular, setCellular] = useState("1134567890");
  const [roles, setRoles] = useState<string[]>([]); // para el select futuro

  // Estados de edición
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Validaciones
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    cellular: "",
  });

  const handleSave = () => {
    let hasError = false;
    const newErrors = { name: "", email: "", address: "", cellular: "" };

    if (!name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre y apellido";
      hasError = true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Correo inválido";
      hasError = true;
    }
    if (!address.trim()) {
      newErrors.address = "Por favor ingresa tu dirección";
      hasError = true;
    }
    if (!cellular.trim()) {
      newErrors.cellular = "Por favor ingresa tu número de celular";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    // Modal de verificación, si cambia el mail
    if (email !== "maria@mail.com") {
      setShowModal(true);
      return;
    }

    console.log("Datos guardados:", { name, email, address, cellular, roles });
  };

// Callback memorizado para evitar que SelectRubros se remonte
  // const handleChangeRubros = useCallback((values: string[]) => {
    // setRoles(values);
  // }, []);

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
            {/* Form Section */}
            <View style={{ marginBottom: Spacing.xxl }}>
              {/* Inputs */}
              <View style={{ marginBottom: Spacing.xl }}>
                <InputField
                  label="Nombre y apellido"
                  value={name}
                  onChangeText={setName}
                  editable
                  error={errors.name}
                  onFocus={() => setEditingField("name")}
                  onBlur={() => setEditingField(null)}
                  style={{
                    borderColor:
                      editingField === "name"
                        ? colors.brandCommon
                        : colors.inputBorder,
                    borderWidth: 1.3,
                  }}
                />
              </View>

              <View style={{ marginBottom: Spacing.xl }}>
                <InputField
                  label="Correo electrónico"
                  value={email}
                  editable={false}
                  onChangeText={() => {}}
                  error={errors.email}
                />
              </View>

              <View style={{ marginBottom: Spacing.xl }}>
                <InputField
                  label="Dirección"
                  value={address}
                  onChangeText={setAddress}
                  editable
                  error={errors.address}
                  onFocus={() => setEditingField("address")}
                  onBlur={() => setEditingField(null)}
                  style={{
                    borderColor:
                      editingField === "address"
                        ? colors.brandCommon
                        : colors.inputBorder,
                    borderWidth: 1.3,
                  }}
                />
              </View>

              <View style={{ marginBottom: Spacing.xl }}>
                <InputField
                  label="Celular"
                  value={cellular}
                  onChangeText={setCellular}
                  editable
                  keyboardType="phone-pad"
                  error={errors.cellular}
                  onFocus={() => setEditingField("cellular")}
                  onBlur={() => setEditingField(null)}
                  style={{
                    borderColor:
                      editingField === "cellular"
                        ? colors.brandCommon
                        : colors.inputBorder,
                    borderWidth: 1.3,
                  }}
                />
              </View>

              <View style={{ marginBottom: Spacing.xxl, marginTop: Spacing.md }}>
                {/* Select Rubros */}
                <SelectRubros
                  label="¿Desea vender? Elija el/los rubro/s"
                  section="seller"
                  selected={roles}
                  onChange={setRoles}
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
                  onPress={handleSave} //TODO: guardar cambios
                >
                  Guardar
                </Button>
              </View>

            </View>
          </View>
          </View>

        </ScrollView>

      </KeyboardAvoidingView>

      {/* Modal de verificación de email */}
      <EmailVerificationModal
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
      />
    </SafeAreaView>
  );
}
