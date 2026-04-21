import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Enviar } from "../../components/icons";
import { rubrosVendedor } from "../../components/SelectRubros/rubrosConfig";
import SelectRubros from "../../components/SelectRubros/SelectRubros";
import { TipsButton, TipsSheet } from "../../components/TipsBottomSheet";
import Button from "../../components/UI/Button/Button";
import { useAuthContext } from "../../context/AuthContext";

const NuevoPedido = () => {
  const { colors, fonts } = useTheme();

  const [selectedRubros, setSelectedRubros] = useState<string[]>([]);
  const [rubrosDisponibles, setRubrosDisponibles] = useState(rubrosVendedor);
  const [pedidoTexto, setPedidoTexto] = useState("");
  const [errors, setErrors] = useState<{ rubros?: string; pedido?: string }>(
    {},
  );
  const [tipsOpen, setTipsOpen] = useState(false); // ← estado del sheet

  useEffect(() => {
    const loadRubros = async () => {
      try {
        const stored = await AsyncStorage.getItem("rubros");
        if (stored) {
          setRubrosDisponibles(JSON.parse(stored));
        } else {
          await AsyncStorage.setItem("rubros", JSON.stringify(rubrosVendedor));
        }
      } catch (err) {
        console.error("Error al cargar rubros:", err);
      }
    };
    loadRubros();
  }, []);

  const handleChange = (values: string[]) => {
    setSelectedRubros(values);
    if (values.length > 0 && errors.rubros) {
      setErrors((prev) => ({ ...prev, rubros: undefined }));
    }
  };

  const handleTextChange = (text: string) => {
    setPedidoTexto(text);
    if (text.trim().length > 0 && errors.pedido) {
      setErrors((prev) => ({ ...prev, pedido: undefined }));
    }
  };

  const PEDIDO_STORAGE_KEY = "pedidoBorrador";

  const { switchRole } = useAuthContext();

  const savePedidoLocal = async (payload: {
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
    if (selectedRubros.length === 0) {
      newErrors.rubros = "Por favor, selecciona al menos un rubro.";
    }
    if (!pedidoTexto.trim()) {
      newErrors.pedido = "Describe brevemente tu pedido.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
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
        <Text
          style={{
            color: colors.textDefault,
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.md,
          }}
        >
          ¿Qué necesitas comprar?
        </Text>

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

        <View
          style={{
            backgroundColor: colors.cardBg,
            padding: Spacing.lg,
            borderRadius: Spacing.lg,
            flex: 1,
            minHeight: 120,
            paddingBottom: Spacing.xxl,
          }}
        >
          <Text
            style={{ paddingBottom: Spacing.md, color: colors.textDefault }}
          >
            Escribe tu pedido:
          </Text>

          <TextInput
            placeholder={`Ejemplo:\n- 1K manzana\n- 2 paquetes de harina (prefiero marca Blancaflor)\n- 1 Litro de aceite`}
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

          {/* Solo el botón — dentro del ScrollView */}
          <TipsButton
            isOpen={tipsOpen}
            onPress={() => setTipsOpen((prev) => !prev)}
          />

          <Button
            section="buyer"
            width="full"
            variant="primary"
            icon={Enviar}
            iconPosition="left"
            onPress={handleSubmit}
          >
            Solicitar presupuesto
          </Button>
        </View>

        <View style={{ alignItems: "center", marginVertical: 8 }}>
          <Text style={{ fontSize: FontSizes.base, color: colors.textMuted }}>
            ¿Deseas vender?{"  "}
            <Text
              onPress={() => {
                switchRole("seller");
                router.push("/vendedor/homeVendedor");
              }}
              style={{
                color: colors.brandBuyer,
                textDecorationLine: "underline",
                fontFamily: fonts.robotoRegular,
              }}
            >
              Sí, quiero vender
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* El sheet — FUERA del ScrollView, se renderiza sobre toda la pantalla */}
      <TipsSheet isOpen={tipsOpen} onClose={() => setTipsOpen(false)} />
    </KeyboardAvoidingView>
  );
};

export default NuevoPedido;
