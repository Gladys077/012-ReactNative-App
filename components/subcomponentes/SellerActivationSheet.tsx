//Si el comprador presiona "vender" desde el footer, pero no se ha registrado como vendedor, este componente le avisará que para vender necesita completar el perfil y lo llevará a la page "peril" abriédolo justo donde agregar la info.

import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, View } from "react-native";
import Button from "../../components/UI/Button/Button";
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
      pathname: "/(preAuth)/Ajustes/perfil",
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
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button
              variant="secondary"
              section="common"
              width="full"
              onPress={onClose}
            >
              Ahora no
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              variant="primary"
              section="common"
              width="full"
              onPress={handleGoToProfile}
            >
              Configurar perfil
            </Button>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
