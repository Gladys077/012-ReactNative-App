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
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function PerfilScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  // TODO: VER CON LIO. Por ahora datos del usuario simulados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cellular, setCellular] = useState("");
  const [rubros, setRubros] = useState<string[]>([]);

  // Si desea vender
  const [isSeller, setIsSeller] = useState(false);

  // Datos para cobrar x transferencia
  const [alias, setAlias] = useState("");
  const [banco, setBanco] = useState("");
  const [titular, setTitular] = useState("");

  // Estados de edición
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Validaciones
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    cellular: "",
    alias: "",
    banco: "",
    titular: "",
  });

  const handleSave = async () => {
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
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   newErrors.email = "Correo inválido";
    //   hasError = true;
    // }
    if (!address.trim()) {
      newErrors.address = "Por favor ingresa tu dirección";
      hasError = true;
    }
    if (!cellular.trim()) {
      newErrors.cellular = "Por favor ingresa tu número de celular";
      hasError = true;
    }

    // Validaciones extra SOLO si elige rubros (o sea: si quiere vender)
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

    // Si cambia email -> modal de verificación
    if (email !== "maria@mail.com") {
      setShowModal(true);
      return;
    }

    // -----------------> GUARDAR EN EL BACKEND - VER CON LIO <------------- //
    try {
      const resp = await fetch("https://api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          address,
          cellular,
          rubros,
          alias,
          banco,
          titular,
        }),
      });

      if (!resp.ok) {
        console.log("Error del servidor:", await resp.text());
        return;
      }

      console.log("Datos actualizados correctamente");

      // 2) REDIRECCIÓN AUTOMÁTICA SOLO SI ELIGE RUBROS
      if (rubros.length > 0) {
        await router.replace("/(auth)/elegirRol");
      } else {
        // Si NO elige rubros, simplemente vuelve a donde estaba
        router.back();
      }
    } catch (err) {
      console.log("Error al conectar al servidor:", err);
    }
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
              // justifyContent: "center",
              paddingHorizontal: Spacing.lg,
              paddingBottom: Spacing.xl,
              paddingTop: Spacing.xl,
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
                  placeholder="Escribe tu nombre y apellido"
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
                ></View>

                <Text style={{ color: colors.textDefault }}>
                  También deseo vender
                </Text>
              </Pressable>

              {/* Select Rubros */}
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

              {/* --- Datos para recibir pagos por transferencia --- */}
              {isSeller && (
                <>
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

                    <Text
                      style={{
                        color: colors.textMuted,
                        fontSize: 12,
                      }}
                    >
                      Estos datos le llegarán a tus clientes cuando elijan
                      abonarte por transferencia.
                    </Text>

                    {/* Alias */}
                    <View style={{ marginBottom: Spacing.xl }}>
                      <InputField
                        label="Alias"
                        value={alias}
                        onChangeText={setAlias}
                        editable
                        error={errors.alias}
                      />
                    </View>

                    {/* Banco */}
                    <View style={{ marginBottom: Spacing.xl }}>
                      <InputField
                        label="Banco o billetera virtual"
                        value={banco}
                        onChangeText={setBanco}
                        editable
                        error={errors.banco}
                      />
                    </View>

                    {/* Titular */}
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
                </>
              )}

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
                    onPress={() => router.back()}
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
    </SafeAreaView>
  );
}
