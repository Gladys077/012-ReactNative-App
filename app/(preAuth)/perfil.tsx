import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { TiendaIcon } from "../../components/icons";
import SelectRubrosVendedor from "../../components/SelectRubros/SelectRubrosVendedor";
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

    // Si cambia el email → modal de verificación
    if (email !== "maria@mail.com") {
      setShowModal(true);
      return;
    }

    console.log("Datos guardados:", { name, email, address, cellular, roles });
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
              paddingHorizontal: Spacing.lg,
              paddingBottom: Spacing.xl,
              maxWidth: 500,
              width: "100%",
              alignSelf: "center",
            }}
          >
            {/* Inputs */}
            <View style={{ marginTop: Spacing.xxl }}>
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

              <InputField
                label="Correo electrónico"
                value={email}
                editable={false}
                onChangeText={() => {}}
                error={errors.email}
              />

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

              {/* Select Rubros */}
              <SelectRubrosVendedor
                label="¿Desea vender? Elija el/los rubro/s"
                selected={roles}
                rubros={[
                  { label: "Panadería", value: "panaderia", icon: <TiendaIcon width={18} height={18} color="#FB8C00" />, color: "#FFF3E0", iconColor: "#FB8C00" },
                  { label: "Verdulería", value: "verduleria", icon: <TiendaIcon width={18} height={18} color="#43A047" />, color: "#E8F5E9", iconColor: "#43A047" },
                ]}
                onChange={setRoles}
              />

            </View>

            {/* Botones */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Spacing.xxl,
              }}
            >
              <Button
                variant="secondary"
                section="common"
                width="half"
                onPress={() => router.back()}
              >
                Cancelar
              </Button>

              <Button
                variant="primary"
                section="common"
                width="half"
                onPress={handleSave}
              >
                Guardar
              </Button>
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
