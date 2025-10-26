import Check from "@/components/icons/Check";
import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";

interface TipsBottomSheetProps {
  onClose?: () => void;
}

const TipsBottomSheet = forwardRef<BottomSheetModal, TipsBottomSheetProps>(
  ({ onClose }, ref) => {
    const { colors } = useTheme();
    const { user } = useAuthContext();

    // Detecta automáticamente el rol actual (fallback a buyer)
    const role = user?.role || "buyer";

    // Define título y tips según rol
    const title = role === "buyer" ? "Tips para tu pedido" : "Tips para tus respuestas";

    const tips = role === "buyer"
      ? [
          "Sé claro al describir lo que necesitás.",
          "Subí una foto si eso ayuda al proveedor.",
          "Verificá el rubro antes de enviar.",
        ]
      : [
          "Respondé rápido los pedidos nuevos.",
          "Agregá precios detallados por ítem.",
          "Incluí información de entrega y tiempo estimado.",
        ];

    // Colores dinámicos según rol y tema
    const colorRole = role === "buyer" ? colors.brandBuyer : colors.brandSeller;
    const bgSoft = role === "buyer" ? colors.brandBuyerSoft : colors.brandSellerSoft;

    // Snap points del BottomSheet
    const snapPoints = useMemo(() => ["30%"], []);

    // Backdrop con opacidad
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: bgSoft,
          borderTopLeftRadius: BorderRadius.xl,
          borderTopRightRadius: BorderRadius.xl,
          borderWidth: 1,
          borderColor: bgSoft,
        }}
        handleIndicatorStyle={{ backgroundColor: colorRole }}
      >
        {/* Título */}
        <View
          className="flex-row justify-between items-center px-5 font-Roboto-Medium"
          style={{ marginTop: Spacing.xl, marginBottom: Spacing.xl }}
        >
          <Text
            style={{
              fontSize: FontSizes.lg,
              fontWeight: "600",
              color: colorRole,
            }}
          >
            {title}
          </Text>
        </View>

        {/* Contenido */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Spacing.lg,
            paddingBottom: Spacing.xl,
          }}
        >
          {tips.map((tip, index) => (
            <View
              key={index}
              className="flex-row items-start mb-3"
              style={{ gap: Spacing.sm }}
            >
              <Check width={18} height={18} fill={colorRole} />
              <Text
                style={{
                  fontSize: FontSizes.base,
                  color: colors.textDefault,
                  flex: 1,
                }}
              >
                {tip}
              </Text>
            </View>
          ))}
        </ScrollView>
      </BottomSheetModal>
    );
  }
);

TipsBottomSheet.displayName = "TipsBottomSheet";

export default TipsBottomSheet;

{/*
MODO DE USO:

//Función para abrir el bottomsheet:
const openTips = useCallback(() => {
  bottomSheetRef.current?.present();
}, []);

//Poner el componente en el jsx:
<TipsBottomSheet ref={bottomSheetRef} />

//Btn u otro trigger para abrirlo:
<Button title="Mostrar Tips" onPress={openTips} />


 */}