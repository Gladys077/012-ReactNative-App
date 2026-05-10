import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { TiendaIconOutline } from "../icons";

interface SellerActivationSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SellerActivationSheet({
  isOpen,
  onClose,
}: SellerActivationSheetProps) {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["35%"], []);

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

  const handleGoToProfile = () => {
    onClose();

    router.push({
      pathname: "/(preAuth)/perfil",
      params: {
        mode: "seller-setup",
      },
    });
  };

  if (!isOpen) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onClose={onClose}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: colors.cardBg,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.border,
      }}
    >
      <BottomSheetView
        style={{
          paddingHorizontal: Spacing.xl,
          paddingTop: Spacing.md,
          paddingBottom: Spacing.xl,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <View
            style={{
              alignItems: "center",
              marginBottom: Spacing.md,
            }}
          >
            <TiendaIconOutline
              width={36}
              height={36}
              color={colors.brandSeller}
            />
          </View>

          <Text
            style={{
              fontSize: FontSizes.lg,
              fontFamily: fonts.robotoBold,
              color: colors.textDefault,
              textAlign: "center",
              marginBottom: Spacing.sm,
            }}
          >
            Activá tu perfil de vendedor
          </Text>

          <Text
            style={{
              fontSize: FontSizes.base,
              fontFamily: fonts.robotoRegular,
              color: colors.textMuted,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Elegí tus rubros y configurá cómo querés cobrar para empezar a
            recibir pedidos.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: Spacing.md,
            marginTop: Spacing.lg,
          }}
        >
          <Pressable
            onPress={onClose}
            style={{
              flex: 1,
              height: 48,
              borderRadius: BorderRadius.full,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                color: colors.textDefault,
                fontFamily: fonts.robotoMedium,
              }}
            >
              Ahora no
            </Text>
          </Pressable>

          <Pressable
            onPress={handleGoToProfile}
            style={{
              flex: 1,
              height: 48,
              borderRadius: BorderRadius.full,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.brandSeller,
            }}
          >
            <Text
              style={{
                color: colors.textDefault,
                fontFamily: fonts.robotoMedium,
              }}
            >
              Configurar perfil
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
