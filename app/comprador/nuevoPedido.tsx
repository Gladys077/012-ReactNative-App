import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { Enviar } from "../../components/icons";
import { rubrosVendedor } from "../../components/SelectRubros/rubrosConfig";
import SelectRubros from "../../components/SelectRubros/SelectRubros";
import TipsBottomSheet from "../../components/TipsBottomSheet";
import Button from "../../components/UI/Button/Button";

const NuevoPedido = () => {
  const { colors } = useTheme();

  const [selectedRubros, setSelectedRubros] = useState<string[]>([]);
  // Se usará más adelante cuando carguemos los rubros dinámicamente desde base de datos
  const [rubrosDisponibles, setRubrosDisponibles] = useState(rubrosVendedor);
  const [pedidoTexto, setPedidoTexto] = useState(""); // Guarda el nuevo pedido
  const [errors, setErrors] = useState<{ rubros?: string; pedido?: string }>({}); // Errores


  // referencia al BottomSheet
  const tipsRef = useRef<BottomSheetModal>(null);

  const openTips = () => tipsRef.current?.present();
  const closeTips = () => tipsRef.current?.dismiss();

  // Carga rubros desde AsyncStorage al iniciar
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

  // Valida cuando cambia la selección de rubros
  const handleChange = (values: string[]) => {
    setSelectedRubros(values);
    if (values.length > 0 && errors.rubros) {
      setErrors((prev) => ({ ...prev, rubros: undefined }));
  };
  }

  // Valida cuando escribe en el textarea
  const handleTextChange = (text: string) => {
    setPedidoTexto(text);
    if (text.trim().length > 0 && errors.pedido) {
      setErrors((prev) => ({ ...prev, pedido: undefined }));
    }
  };

  // Guardado: ejemplo usando AsyncStorage (REEMPLAZAR por fetch - VER CON LIO)
  const PEDIDO_STORAGE_KEY = "pedidoBorrador";

  const savePedidoLocal = async (payload: {
    rubros: string[];
    texto: string;
    createdAt: string;
  }) => {
    try {
      const existing = await AsyncStorage.getItem(PEDIDO_STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(payload); // agrego al comienzo
      await AsyncStorage.setItem(PEDIDO_STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error("Error guardando pedido local:", err);
    }
  };

  // Validación al presionar el botón
  const handleSubmit = async () => {
    const newErrors: { rubros?: string; pedido?: string } = {};

    if (selectedRubros.length === 0) {
      newErrors.rubros = "Por favor, selecciona al menos un rubro.";
    }
    if (!pedidoTexto.trim()) {
      newErrors.pedido = "Describe brevemente tu pedido.";
    }

    setErrors(newErrors);

    // Si no hay errores, continuar
     if (Object.keys(newErrors).length === 0) {
    // payload listo para enviar
    const payload = {
      rubros: selectedRubros,
      texto: pedidoTexto.trim(),
      createdAt: new Date().toISOString(),
    };

    // Ejemplo: guardo localmente antes de enviar 
    await savePedidoLocal(payload);

    // TODO: Aquí iría la llamada al backend - VER CON LIO
    // await api.post('/pedidos', payload)

    // Limpio el formulario o navego según flow
    setSelectedRubros([]);
    setPedidoTexto("");
    setErrors({});
    tipsRef.current?.dismiss?.();

    console.log("Pedido guardado/enviado:", payload);
    // show toast / navegar / etc.
  }
};
  

  const FooterHeight = 130; 

  return (
    //KeyboardAvoidingView evita q el teclado oculte los campos de textInputs cuando el usuairo los está usando.
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: Spacing.sm, paddingTop: Spacing.xl, gap: Spacing.xl, flexGrow: 1, paddingBottom: FooterHeight}}
        keyboardShouldPersistTaps="handled" // Evita q el teclado bloquee toques (taps)
      >
        {/* Título */}
        <Text style={{ color: colors.textDefault, fontFamily: "Roboto-Medium", fontSize: FontSizes.md }}>
          ¿Qué necesitas comprar?
        </Text>

        {/* Selector de rubro versión buyer */}
        <View style={{ backgroundColor: colors.cardBg, padding: Spacing.lg, borderRadius: Spacing.lg }}>
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

        {/* ------ Subtítulo + Textarea de descripción + Tips + Btn principal ------- */}
        <View style={{ backgroundColor: colors.cardBg, padding: Spacing.lg, borderRadius: Spacing.lg, flex:1, minHeight: 120, paddingBottom: Spacing.xxl }}>
        
          {/* Subtítulo */}
          <Text style={{paddingBottom: Spacing.md, color: colors.textDefault}}>
            Escribe tu pedido:
          </Text>

          {/* Textarea */}
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
          
          {/* ----> Error debajo del textarea */}
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

          {/* Tips BottomSheet */}
          <TipsBottomSheet ref={tipsRef} onClose={closeTips}/>

          {/* Botón principal */}
          <Button section="buyer" 
              width="full" 
              variant="primary" 
              icon={Enviar}
              iconPosition="left"
              onPress={handleSubmit}
          >
            Solicitar presupuesto
          </Button>

          
        </View>

          {/* Línea para cambiar de sección */}
        <View style={{ alignItems: "center", marginVertical: 8,}}>
          <Text
            style={{
              fontSize: FontSizes.base,
              color: colors.textMuted,
            }}
          >
            ¿Deseas vender?{"  "}
            <Link
              href="/vendedor/homeVendedor"
              style={{
                color: colors.brandBuyer, 
                textDecorationLine: "underline",
                fontWeight: "regular",
              }}
            >
              Sí, quiero vender
            </Link>
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default NuevoPedido;
