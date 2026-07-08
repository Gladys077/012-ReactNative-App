import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Enviar } from "../../components/icons";
import { rubrosVendedor } from "../../components/SelectRubros/rubrosConfig";
import { rubrosServicios } from "../../components/SelectRubros/rubrosServiciosConfig";
import SelectRubros from "../../components/SelectRubros/SelectRubros";
import { TipsSheet } from "../../components/subcomponentes/TipsBottomSheet";
import Button from "../../components/UI/Button/Button";
import TipsFAB from "../../components/UI/FAB";
import { useAuthContext } from "../../context/AuthContext";

const NuevoPedido = () => {
  const { colors, fonts } = useTheme();
  const { switchRole } = useAuthContext();

  const [modo, setModo] = useState<"producto" | "servicio">("producto");
  const [selectedRubros, setSelectedRubros] = useState<string[]>([]);
  const [rubrosDisponibles, setRubrosDisponibles] = useState(rubrosVendedor);
  const [pedidoTexto, setPedidoTexto] = useState("");
  const [errors, setErrors] = useState<{ rubros?: string; pedido?: string }>(
    {},
  );
  const [tipsOpen, setTipsOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      switchRole("buyer");
    }, [switchRole]),
  );

  const handleModoChange = (nuevoModo: "producto" | "servicio") => {
    setModo(nuevoModo);
    setSelectedRubros([]);
    setErrors({});
  };

  const handleChange = (values: string[]) => {
    setSelectedRubros(values);
    if (values.length > 0 && errors.rubros)
      setErrors((prev) => ({ ...prev, rubros: undefined }));
  };

  const handleTextChange = (text: string) => {
    setPedidoTexto(text);
    if (text.trim().length > 0 && errors.pedido)
      setErrors((prev) => ({ ...prev, pedido: undefined }));
  };

  const PEDIDO_STORAGE_KEY = "pedidoBorrador";

  const savePedidoLocal = async (payload: {
    tipo: "producto" | "servicio";
    rubros: string[];
    texto: string;
    createdAt: string;
  }) => {
    try {
      const existing = await AsyncStorage.getItem(PEDIDO_STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(payload);
      await AsyncStorage.setItem(PEDIDO_STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error("Error guardando pedido local:", err);
    }
  };

  const handleSubmit = async () => {
    const newErrors: { rubros?: string; pedido?: string } = {};
    if (selectedRubros.length === 0)
      newErrors.rubros = "Por favor, selecciona al menos un rubro.";
    if (!pedidoTexto.trim())
      newErrors.pedido =
        modo === "producto"
          ? "Describe brevemente tu pedido."
          : "Describí el servicio que necesitás.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      tipo: modo,
      rubros: selectedRubros,
      texto: pedidoTexto.trim(),
      createdAt: new Date().toISOString(),
    };
    await savePedidoLocal(payload);

    setSelectedRubros([]);
    setPedidoTexto("");
    setErrors({});
    setTipsOpen(false);
    router.push("/comprador/estadoPedido");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.background }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 10}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: Spacing.sm,
          paddingTop: Spacing.xl,
          gap: Spacing.xl,
          flexGrow: 1,
          paddingBottom: Spacing.xxl,
        }}
        keyboardShouldPersistTaps="always"
      >
        {/* ── Toggle Comprar / Solicitar servicio ── */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.cardBg,
            borderRadius: Spacing.lg,
            padding: 4,
          }}
        >
          {(["producto", "servicio"] as const).map((m) => (
            <Pressable
              key={m}
              onPress={() => handleModoChange(m)}
              style={{
                flex: 1,
                paddingVertical: Spacing.sm,
                borderRadius: Spacing.md,
                alignItems: "center",
                backgroundColor: modo === m ? colors.brandBuyer : "transparent",
                borderWidth: 2,
                borderColor: colors.textSecondaryBg,
              }}
            >
              <Text
                style={{
                  color: modo === m ? "#fff" : colors.textMuted,
                  fontFamily: fonts.robotoMedium,
                  fontSize: FontSizes.md,
                }}
              >
                {m === "producto" ? "Comprar" : "Solicitar servicio"}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ── Selector de rubros ── */}
        <View
          style={{
            backgroundColor: colors.cardBg,
            padding: Spacing.lg,
            borderRadius: Spacing.lg,
          }}
        >
          <SelectRubros
            section="buyer"
            label=""
            selected={selectedRubros}
            onChange={handleChange}
            borderColor={colors.textSecondaryBg}
            rubros={modo === "producto" ? rubrosDisponibles : rubrosServicios}
          />
          {errors.rubros && (
            <Text
              style={{
                color: colors.textError,
                fontSize: FontSizes.sm,
                marginTop: Spacing.xs,
              }}
            >
              {errors.rubros}
            </Text>
          )}
        </View>

        {/* ── Texto del pedido ── */}
        <View
          style={{
            backgroundColor: colors.cardBg,
            padding: Spacing.lg,
            borderRadius: Spacing.lg,
            flex: 1,
            minHeight: 120,
          }}
        >
          <Text
            style={{ paddingBottom: Spacing.md, color: colors.textDefault }}
          >
            {modo === "producto"
              ? "Escribe tu pedido:"
              : "Describí el servicio:"}
          </Text>

          <TextInput
            placeholder={
              modo === "producto"
                ? `Ejemplo:\n- 1K manzana\n- 2 paquetes de harina (prefiero marca Blancaflor)\n- 1 Litro de aceite`
                : `Ejemplo:\n- Necesito un electricista para cambiar el tablero\n- Zona: Palermo\n- Disponibilidad: mañana a la tarde`
            }
            placeholderTextColor={colors.textMuted}
            multiline
            textAlignVertical="top"
            value={pedidoTexto}
            onChangeText={handleTextChange}
            style={{
              flex: 1,
              minHeight: 120,
              borderWidth: 1,
              borderColor: colors.textSecondaryBg,
              borderRadius: Spacing.lg,
              padding: Spacing.md,
              color: colors.textDefault,
              backgroundColor: colors.cardBg,
            }}
          />

          {errors.pedido && (
            <Text
              style={{
                color: colors.textError,
                fontSize: FontSizes.sm,
                marginBottom: Spacing.lg,
              }}
            >
              {errors.pedido}
            </Text>
          )}

          <Button
            section="buyer"
            width="full"
            variant="primary"
            icon={Enviar}
            iconPosition="left"
            onPress={handleSubmit}
          >
            {modo === "producto"
              ? "Solicitar presupuesto"
              : "Solicitar servicio"}
          </Button>
        </View>
      </ScrollView>

      <View
        pointerEvents="box-none"
        style={{ position: "absolute", bottom: 120, right: 0 }}
      >
        <TipsFAB
          section="buyer"
          onPress={() => setTipsOpen((prev) => !prev)}
          style={{ marginVertical: 4 }}
        />
      </View>

      <TipsSheet isOpen={tipsOpen} onClose={() => setTipsOpen(false)} />
    </KeyboardAvoidingView>
  );
};

export default NuevoPedido;
