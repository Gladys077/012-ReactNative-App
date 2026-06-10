import Check from "@/components/icons/Check";
import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { TipLamparita } from "../icons";

export function useTipsBottomSheet() {
  const { user } = useAuthContext();
  const { colors, fonts } = useTheme();

  const role = user?.role || "buyer";
  const title = role === "buyer" ? "Tips" : "Tips";
  const tips =
    role === "buyer"
      ? [
          "Escribe tu pedido en forma de lista, como el ejemplo.",
          "Especifica cantidades.",
          "Incluye las marcas, si tienes alguna preferencia.",
          "Antes de transferir, verifica que el vendedor tenga al menos 10 calificaciones. Si no te convence, puedes pagar contra entrega.",
        ]
      : [
          "Usa la sección 'Nota del vendedor' para hacer cualquier aclaración. (Ej.: Cambio de marca / Producto en falta / Demora en la entrega)",
        ];
  const colorRole =
    role === "buyer" ? colors.tipsColorBuyer : colors.brandSeller;
  const bgSoft =
    role === "buyer" ? colors.brandBuyerSoft : colors.brandSellerSoft;

  return { colors, fonts, title, tips, colorRole, bgSoft };
}

// Botón que va DENTRO del ScrollView
interface TipsButtonProps {
  isOpen: boolean;
  onPress: () => void;
}

export function TipsButton({ isOpen, onPress }: TipsButtonProps) {
  const { colors, fonts, title, colorRole } = useTipsBottomSheet();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
        marginTop: Spacing.lg,
        height: 48,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.textDefault,
        }}
      >
        <TipLamparita width={24} height={24} color={colorRole} />
        <Text
          style={{
            color: colorRole,
            fontSize: FontSizes.base,
            fontFamily: fonts.robotoRegular,
            marginLeft: 4,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

// Sheet que va FUERA del ScrollView
interface TipsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TipsSheet({ isOpen, onClose }: TipsSheetProps) {
  const { colors, tips, colorRole, bgSoft } = useTipsBottomSheet();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%"], []);

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
    [],
  );

  if (!isOpen) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onClose={onClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: bgSoft }}
      handleIndicatorStyle={{ backgroundColor: colorRole }}
      enablePanDownToClose
    >
      <BottomSheetView
        style={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: Spacing.xl,
          paddingTop: Spacing.md,
        }}
      >
        {tips.map((tip, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 12,
              gap: Spacing.sm,
            }}
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
      </BottomSheetView>
    </BottomSheet>
  );
}
