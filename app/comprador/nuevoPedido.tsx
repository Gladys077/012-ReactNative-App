import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import { TipLamparita } from "../../components/icons";
import SelectRubros from "../../components/SelectRubros/SelectRubros";
import TipsBottomSheet from "../../components/TipsBottomSheet";
import Button from "../../components/UI/Button/Button";

const NuevoPedido = () => {
  const { colors } = useTheme();

  // 1️⃣ referencia al BottomSheet
  const tipsRef = useRef<BottomSheetModal>(null);

  // 2️⃣ función para abrir/cerrar el modal
  const openTips = () => tipsRef.current?.present();
  const closeTips = () => tipsRef.current?.dismiss();


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: Spacing.lg, gap: Spacing.lg }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Selector de rubro sin opción “+ Nuevo Rubro” */}
        <SelectRubros
          section="buyer"
          label={""}
          selected={[]}
          rubros={[]}
          onChange={() => { }}
        />


        {/* Textarea de descripción */}
        <TextInput
          placeholder="Describí brevemente tu pedido..."
          multiline
          textAlignVertical="top"
          style={{
            minHeight: 120,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            padding: Spacing.md,
            color: colors.textDefault,
            backgroundColor: colors.cardBg,
          }}
        />

        {/* Botón para abrir tips */}
        <Button
          variant="secondary"
          icon={TipLamparita}
          onPress={openTips}
        >Tips para tu pedido</Button> 

        {/* Botón principal */}
        <Button  section="common" width="full" variant="primary" >Solicitar presupuesto</Button> 
        {/* //TODO onPress={pedirPresupuesto} y agregarlo al btn de solicitar presupuesto */}
      </ScrollView>

      {/* BottomSheet de Tips */}
      <TipsBottomSheet
        ref={tipsRef}
        onClose={closeTips}
      />
    </KeyboardAvoidingView>
  );
};

export default NuevoPedido;
