import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import LineaDivisoria from "../../components/subcomponentes/LineaDivisoria";
import Button from "../../components/UI/Button/Button";
import { InputField } from "../../components/UI/InputField";
import Toast from "../../components/UI/Toast";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function PerfilScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cellular, setCellular] = useState("");
  const [rubros, setRubros] = useState<string[]>([]);
  const [isSeller, setIsSeller] = useState(false);
  const [alias, setAlias] = useState("");
  const [banco, setBanco] = useState("");
  const [titular, setTitular] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    cellular: "",
    alias: "",
    banco: "",
    titular: "",
  });

  const handleSave = () => {
    let hasError = false;
    const newErrors = {
      name: "",
      email: "",
      address: "",
      cellular: "",
      alias: "",
      banco: "",
      titular: "",
    };

    if (!name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre y apellido";
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
    if (rubros.length > 0) {
      if (!alias.trim()) {
        newErrors.alias = "Ingresa tu alias bancario";
        hasError = true;
      }
      if (!banco.trim()) {
        newErrors.banco = "Ingresa el banco";
        hasError = true;
      }
      if (!titular.trim()) {
        newErrors.titular = "Ingresa el nombre del titular de la cuenta";
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (hasError) return;

    // TODO: VER CON LIO — conectar al backend cuando esté listo
    // fetch("https://api/user/update", { method: "PUT", ... })

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
              paddingHorizontal: Spacing.lg,
              paddingBottom: Spacing.xl,
              paddingTop: Spacing.xl,
              maxWidth: 500,
              width: "100%",
              alignSelf: "center",
            }}
          >
            <View style={{ marginBottom: Spacing.xxl }}>
              <View style={{ marginBottom: Spacing.xl }}>
                <InputField
                  label="Nombre y apellido"
                  placeholder="Escribe tu nombre y apellido"
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
                  placeholder="Escribe tu email"
                  value={email}
                  editable={false}
                  onChangeText={() => {}}
                  error={errors.email}
                />
              </View>

              <View style={{ marginBottom: Spacing.xl }}>
                <InputField
                  label="Dirección"
                  placeholder="Escribe tu dirección"
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

              <View style={{ marginBottom: Spacing.xxl }}>
                <InputField
                  label="Celular"
                  placeholder="Escribe tu celular"
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

              <LineaDivisoria />

              <Pressable
                onPress={() => setIsSeller((prev) => !prev)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: Spacing.lg,
                }}
              >
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderWidth: 1.5,
                    borderColor: colors.textDefault,
                    marginRight: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isSeller
                      ? colors.brandCommon
                      : "transparent",
                  }}
                />
                <Text style={{ color: colors.textDefault }}>
                  También deseo vender
                </Text>
              </Pressable>

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

              {isSeller && (
                <View
                  style={{
                    marginTop: Spacing.lg,
                    marginBottom: Spacing.xxl,
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

                  <View style={{ marginBottom: Spacing.xl }}>
                    <InputField
                      label="Alias"
                      value={alias}
                      onChangeText={setAlias}
                      editable
                      error={errors.alias}
                    />
                  </View>
                  <View style={{ marginBottom: Spacing.xl }}>
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
                    onPress={handleSave}
                  >
                    Guardar
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast
        mensaje="¡Perfil guardado!"
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
