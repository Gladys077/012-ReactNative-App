import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TiendaIcon } from "../../../components/icons";
import {
  RubroConfig,
  rubrosVendedor,
} from "../../../components/SelectRubros/rubrosConfig";
import { rubrosServicios } from "../../../components/SelectRubros/rubrosServiciosConfig";
import SelectRubros from "../../../components/SelectRubros/SelectRubros";
import Button from "../../../components/UI/Button/Button";
import { InputField } from "../../../components/UI/InputField";
import LineaDivisoria from "../../../components/UI/LineaDivisoria";
import Toast from "../../../components/UI/Toast";
import { Spacing } from "../../../constants/Tokens";
import { useTheme } from "../../../context/ThemeContext";

// ── Tipos ──
type TipoRubro = "producto" | "servicio";

interface RubroSeleccionado {
  value: string;
  tipo: TipoRubro;
  aprobado: boolean;
  esCustom?: boolean;
}

export default function PerfilScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email] = useState("");
  const [address, setAddress] = useState("");
  const [cellular, setCellular] = useState("");
  const [rubrosSeleccionados, setRubrosSeleccionados] = useState<
    RubroSeleccionado[]
  >([]);
  const [isSeller, setIsSeller] = useState(false);
  const [alias, setAlias] = useState("");
  const [banco, setBanco] = useState("");
  const [titular, setTitular] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sellerSectionY = useRef(0);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    cellular: "",
    alias: "",
    banco: "",
    titular: "",
    rubros: "",
  });

  // TODO: VER CON LIO — al montar, traer del backend los rubros que el
  // usuario ya tiene guardados (aprobados y pendientes) y precargar acá:
  // useEffect(() => {
  //   fetch("https://api/user/profile")
  //     .then((res) => res.json())
  //     .then((data) => setRubrosSeleccionados(data.rubros));
  // }, []);

  // ── Handlers de rubros ──

  const handleRubrosChange = (values: string[], tipo: TipoRubro) => {
    setRubrosSeleccionados((prev) => {
      // mantiene intactos los del otro tipo, reemplaza los de este tipo
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

  // Se llama cuando SelectRubros crea un rubro nuevo (botón "Nuevo Rubro").
  // No agrega el rubro a la selección (eso ya lo hace SelectRubros vía
  // onChange internamente), solo lo anota como "pendiente" para mostrar
  // el badge y, más adelante, mandarlo al backend con aprobado: false.
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
    // también hay que sacarlo de la selección activa del SelectRubros correspondiente
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

  // Convierte un rubro pendiente al shape que espera SelectRubros
  // (rubrosCustom), para que siga apareciendo en la lista con su
  // ícono genérico mientras no esté aprobado.
  const customRubroToConfig = (r: RubroSeleccionado): RubroConfig => ({
    label: r.value,
    value: r.value.toLowerCase().replace(/\s+/g, "-"),
    IconComponent: TiendaIcon,
    color: "#CFD8DC",
    iconColor: "#607D8B",
  });

  // ── Guardado ──

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
      rubros: "",
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
        newErrors.titular = "Ingresa el nombre del titular de la cuenta";
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (hasError) return;

    // TODO: VER CON LIO — conectar al backend cuando esté listo
    // payload de rubros esperado, por ejemplo:
    // rubrosSeleccionados.map(({ value, tipo, aprobado }) => ({ value, tipo, aprobado }))
    // fetch("https://api/user/update", { method: "PUT", ... })

    setToastVisible(true);
  };

  const params = useLocalSearchParams();

  const isSellerSetup = params.mode === "seller-setup";

  useEffect(() => {
    if (isSellerSetup) {
      setIsSeller(true);

      setTimeout(() => {
        scrollRef.current?.scrollTo({
          y: sellerSectionY.current - 60,
          animated: true,
        });
      }, 250);
    }
  }, [isSellerSetup]);

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
          ref={scrollRef}
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

              {/* sección de vendedor */}
              <View
                onLayout={(event) => {
                  // Guarda la posición Y del bloque vendedor
                  sellerSectionY.current = event.nativeEvent.layout.y; // para hacer scroll automático cuando el usuario // llega desde SellerActivationSheet
                }}
              >
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
                    También deseo vender u ofrecer servicios
                  </Text>
                </Pressable>
              </View>

              {isSeller && (
                <View
                  style={{ marginBottom: Spacing.xl, marginTop: Spacing.xl }}
                >
                  {/* ── Bloque productos ── */}
                  <View style={{ marginBottom: Spacing.xl }}>
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

                  {/* ── Bloque servicios ── */}
                  <View style={{ marginTop: Spacing.md }}>
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
                    onPress={() => router.replace("/comprador/nuevoPedido")}
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
