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
import { TiendaIcon } from "../../components/icons";
import {
    RubroConfig,
    rubrosVendedor,
} from "../../components/SelectRubros/rubrosConfig";
import { rubrosServicios } from "../../components/SelectRubros/rubrosServiciosConfig";
import SelectRubros from "../../components/SelectRubros/SelectRubros";
import EmailVerificationModal from "../../components/subcomponentes/EmailVerificationModal";
import Button from "../../components/UI/Button/Button";
import { InputField } from "../../components/UI/InputField";
import LineaDivisoria from "../../components/UI/LineaDivisoria";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

// ── Tipos ──
type TipoRubro = "producto" | "servicio";

interface RubroSeleccionado {
  value: string;
  tipo: TipoRubro;
  aprobado: boolean;
  esCustom?: boolean;
}

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
  const [rubrosSeleccionados, setRubrosSeleccionados] = useState<
    RubroSeleccionado[]
  >([]);
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
    rubros: "",
  });

  // ── Handlers de rubros (mismo esquema que en perfil.tsx) ──

  const handleRubrosChange = (values: string[], tipo: TipoRubro) => {
    setRubrosSeleccionados((prev) => {
      const otros = prev.filter((r) => r.tipo !== tipo);
      const nuevos = values.map((v) => {
        const existente = prev.find((r) => r.value === v && r.tipo === tipo);
        return existente ?? { value: v, tipo, aprobado: true };
      });
      return [...otros, ...nuevos];
    });
    if (errors.rubros) {
      setErrors((prev) => ({ ...prev, rubros: "" }));
    }
  };

  const marcarComoPendiente = (nombre: string, tipo: TipoRubro) => {
    setRubrosSeleccionados((prev) => {
      const yaExiste = prev.some(
        (r) =>
          r.value.toLowerCase() === nombre.toLowerCase() && r.tipo === tipo,
      );
      if (yaExiste) return prev;
      return [
        ...prev,
        { value: nombre, tipo, aprobado: false, esCustom: true },
      ];
    });
  };

  const quitarRubro = (value: string, tipo: TipoRubro) => {
    setRubrosSeleccionados((prev) =>
      prev.filter((r) => !(r.value === value && r.tipo === tipo)),
    );
    if (tipo === "producto") {
      handleRubrosChange(
        productosSeleccionados.filter((v) => v !== value),
        "producto",
      );
    } else {
      handleRubrosChange(
        serviciosSeleccionados.filter((v) => v !== value),
        "servicio",
      );
    }
  };

  const customRubroToConfig = (r: RubroSeleccionado): RubroConfig => ({
    label: r.value,
    value: r.value.toLowerCase().replace(/\s+/g, "-"),
    IconComponent: TiendaIcon,
    color: "#CFD8DC",
    iconColor: "#607D8B",
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
      rubros: "",
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
      if (rubrosSeleccionados.length === 0) {
        newErrors.rubros =
          "Selecciona al menos un producto o servicio que ofrezcas";
        hasError = true;
      }
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

    // TODO: VER CON LIO — payload esperado al backend, por ejemplo:
    // rubrosSeleccionados.map(({ value, tipo, aprobado }) => ({ value, tipo, aprobado }))

    setShowModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      setName("");
      setUserName("");
      setEmail("");
      setAddress("");
      setCellular("");
      setPassword("");
      setConfirmPassword("");
      setRubrosSeleccionados([]);
      setIsSeller(false);
      setAlias("");
      setBanco("");
      setTitular("");
    }, []),
  );

  const productosSeleccionados = rubrosSeleccionados
    .filter((r) => r.tipo === "producto")
    .map((r) => r.value);

  const serviciosSeleccionados = rubrosSeleccionados
    .filter((r) => r.tipo === "servicio")
    .map((r) => r.value);

  const pendientesDeAprobacion = rubrosSeleccionados.filter(
    (r) => r.esCustom && !r.aprobado,
  );

  const productosCustomConfig = pendientesDeAprobacion
    .filter((r) => r.tipo === "producto")
    .map(customRubroToConfig);

  const serviciosCustomConfig = pendientesDeAprobacion
    .filter((r) => r.tipo === "servicio")
    .map(customRubroToConfig);

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
                  Deseo vender u ofrecer servicios
                </Text>
              </Pressable>

              {/* Rubros */}
              {isSeller && (
                <View
                  style={{ marginBottom: Spacing.xl, marginTop: Spacing.md }}
                >
                  {/* ── Bloque productos ── */}
                  <View style={{ marginBottom: Spacing.xxl }}>
                    <SelectRubros
                      label="Productos que vendo"
                      section="seller"
                      selected={productosSeleccionados}
                      onChange={(values) =>
                        handleRubrosChange(values, "producto")
                      }
                      rubros={rubrosVendedor}
                      rubrosCustom={productosCustomConfig}
                      onNuevoRubro={(nombre) =>
                        marcarComoPendiente(nombre, "producto")
                      }
                    />
                  </View>

                  {/* ── Bloque servicios para la versión 2── */}
                  <View>
                    <SelectRubros
                      label="Servicios que ofrezco"
                      placeholder="Selecciona el servicio que ofreces"
                      section="seller"
                      selected={serviciosSeleccionados}
                      onChange={(values) =>
                        handleRubrosChange(values, "servicio")
                      }
                      rubros={rubrosServicios}
                      rubrosCustom={serviciosCustomConfig}
                      onNuevoRubro={(nombre) =>
                        marcarComoPendiente(nombre, "servicio")
                      }
                    />
                  </View>

                  {errors.rubros && (
                    <Text
                      style={{
                        color: colors.textError,
                        fontSize: 12,
                        marginTop: Spacing.sm,
                      }}
                    >
                      {errors.rubros}
                    </Text>
                  )}

                  {/* ── Pendientes de aprobación ── */}
                  {pendientesDeAprobacion.length > 0 && (
                    <View style={{ marginTop: Spacing.lg }}>
                      <Text
                        style={{
                          color: colors.textMuted,
                          fontSize: 12,
                          marginBottom: Spacing.xs,
                        }}
                      >
                        Estos rubros ya están activos para recibir consultas,
                        mientras esperan aprobación del equipo:
                      </Text>
                      {pendientesDeAprobacion.map((r) => (
                        <View
                          key={`${r.tipo}-${r.value}`}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: colors.cardBg,
                            borderRadius: 12,
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            marginBottom: 6,
                          }}
                        >
                          <Text style={{ color: colors.textDefault, flex: 1 }}>
                            {r.value}
                          </Text>
                          <View
                            style={{
                              backgroundColor: "#FFF3CD",
                              borderRadius: 8,
                              paddingHorizontal: 8,
                              paddingVertical: 2,
                              marginRight: 8,
                            }}
                          >
                            <Text style={{ fontSize: 11, color: "#856404" }}>
                              Pendiente de aprobación
                            </Text>
                          </View>
                          <Pressable
                            onPress={() => quitarRubro(r.value, r.tipo)}
                            hitSlop={8}
                          >
                            <Text
                              style={{
                                color: colors.textError,
                                fontSize: 12,
                              }}
                            >
                              Quitar
                            </Text>
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
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
