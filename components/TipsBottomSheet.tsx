import Check from "@/components/icons/Check";
import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { FlechaAbajo, TipLamparita } from "./icons";

interface TipsBottomSheetProps {
  onClose?: () => void;
}

const TipsBottomSheet = forwardRef<BottomSheetModal, TipsBottomSheetProps>(
  ({ onClose }, ref) => {
    const { colors } = useTheme();
    const { user } = useAuthContext();

    const role = user?.role || "buyer";
    const title = role === "buyer" ? "Tips para hacer tu pedido" : "Tips para tus respuestas";

    const tips =
      role === "buyer"
        ? [
            "Escribe tu pedido en forma de lista, como el ejemplo.",
            "Especifica cantidades.",
            "Incluye las marcas, si tienes alguna preferencia."
          ]
        : [
            "Usa la sección 'Nota del vendedor' para hacer cualquier aclaración'. (Ej.: Cambio de marca / Producto en falta / Demora en la entrega)"
          ];

    const colorRole = role === "buyer" ? colors.tipsColorBuyer : colors.brandSeller;
    const bgSoft = role === "buyer" ? colors.brandBuyerSoft : colors.brandSellerSoft;

    const snapPoints = useMemo(() => ["30%"], []);

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

    // Estado para controlar la rotación del chevron
    const [isOpen, setIsOpen] = useState(false);
    const rotateAnim = useMemo(() => new Animated.Value(0), []);

    const animateChevron = (open: boolean) => {
      Animated.timing(rotateAnim, {
        toValue: open ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

    const openTips = () => {
      if (ref && "current" in ref) {
        ref.current?.present?.();
        animateChevron(true);
        setIsOpen(true);
      }
    };

    const closeTips = () => {
      if (ref && "current" in ref) {
        ref.current?.dismiss?.();
        animateChevron(false);
        setIsOpen(false);
      }
      onClose?.();
    };

    const rotateInterpolate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"]
    });

    return (
      <>
        {/* Botón fuera del BottomSheet */}
        <Pressable
          onPress={isOpen ? closeTips : openTips}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingVertical: Spacing.lg,
            paddingHorizontal: Spacing.xl,
            borderRadius: BorderRadius.md,
            backgroundColor: colors.bgPressed,
            marginBottom: Spacing.sm,
            marginTop: Spacing.lg,
            height: 48
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TipLamparita width={24} height={24} color={colorRole} />
            <Text style={{ color: colorRole, fontSize: FontSizes.base, fontWeight: "regular", marginLeft: 4 }}>
              {title}
            </Text>
          </View>

          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <FlechaAbajo width={18} height={18} color={colorRole} />
          </Animated.View>
        </Pressable>

        {/* BottomSheet con la lista de tips */}
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onDismiss={closeTips}
          backgroundStyle={{
            backgroundColor: bgSoft,
            borderTopLeftRadius: BorderRadius.xl,
            borderTopRightRadius: BorderRadius.xl,
            borderWidth: 1,
            borderColor: bgSoft
          }}
          handleIndicatorStyle={{ backgroundColor: colorRole }}
          style={{
            width: "100%",
            maxWidth: 500,
            alignSelf: "center"
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Spacing.lg,
              paddingBottom: Spacing.xl,
              paddingTop: Spacing.md
            }}
          >
            {tips.map((tip, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 12, gap: Spacing.sm }}
              >
                <Check width={18} height={18} fill={colorRole} />
                <Text style={{ fontSize: FontSizes.base, color: colors.textDefault, flex: 1 }}>
                  {tip}
                </Text>
              </View>
            ))}
          </ScrollView>
        </BottomSheetModal>
      </>
    );
  }
);

TipsBottomSheet.displayName = "TipsBottomSheet";

export default TipsBottomSheet;
