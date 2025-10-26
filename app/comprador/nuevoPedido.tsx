import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { rubrosVendedor } from "../../components/SelectRubros/rubrosConfig";
import SelectRubros from "../../components/SelectRubros/SelectRubros";
import TipsBottomSheet from "../../components/TipsBottomSheet";
import Button from "../../components/UI/Button/Button";

const NuevoPedido = () => {
  const { colors } = useTheme();

  // Estados
  const [selectedRubros, setSelectedRubros] = useState<string[]>([]);
  const [rubrosDisponibles, setRubrosDisponibles] = useState(rubrosVendedor);

  // referencia al BottomSheet
  const tipsRef = useRef<BottomSheetModal>(null);

  // función para abrir/cerrar el modal
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
          // si no hay datos guardados, se guarda la lista base
          await AsyncStorage.setItem("rubros", JSON.stringify(rubrosVendedor));
        }
      } catch (err) {
        console.error("Error al cargar rubros:", err);
      }
    };
    loadRubros();
  }, []);

  // Maneja cambio de selección
  const handleChange = (values: string[]) => {
    setSelectedRubros(values);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
      style={{ backgroundColor: colors.background}}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: Spacing.sm, paddingTop: Spacing.xl, gap: Spacing.lg }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ color: colors.textDefault, fontSize: FontSizes.lg}}>
          ¿Qué necesitas comprar?
        </Text>

        {/* Selector de rubro versión buyer (sin opción “+ Nuevo Rubro”) */}
        <View style={{ backgroundColor: colors.cardBg, padding: Spacing.md, borderRadius: Spacing.lg}}>
          <SelectRubros
            section="buyer"
            label={""}
            selected={selectedRubros}
            onChange={handleChange}
          />
        </View>

        {/* Textarea de descripción */}
        <View style={{ backgroundColor: colors.cardBg, padding: Spacing.md, borderRadius: Spacing.lg}}>

        <TextInput   
          placeholder={`Ejemplo:\n- 1K manzana\n- 2 paquetes de harina (prefiero marca Blancaflor)\n- 1 Litro de aceite`}
          multiline
          textAlignVertical="top"
          style={{
            minHeight: 120,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: Spacing.lg,
            padding: Spacing.md,
            color: colors.textDefault,
            backgroundColor: colors.cardBg,
          }}
        />
        
        </View>

        

        {/* BottomSheet de Tips */}
          <TipsBottomSheet
            ref={tipsRef}
            onClose={closeTips}
          />

        {/* Botón principal */}
        <Button  section="buyer" width="full" variant="primary" >Solicitar presupuesto</Button> 
        {/* //TODO onPress={pedirPresupuesto} y agregarlo al btn de solicitar presupuesto */}
      </ScrollView>

      
    </KeyboardAvoidingView>
  );
};

export default NuevoPedido;
