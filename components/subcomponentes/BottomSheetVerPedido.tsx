//Este es el sheet q se abre al presionar Ver pedido
import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollView, Text, View } from "react-native";

export type BottomSheetVerPedidoRef = {
  present: () => void;
  dismiss: () => void;
};

interface Item {
  id: string | number;
  label: string;
}

interface Props {
  fechaSeleccion?: string;
  items?: Item[];
  snapPoints?: string[];
  isVisible: boolean;
  onClose: () => void;
  backgroundColor?: string;
  role?: "buyer" | "seller";
}

const BottomSheetVerPedido = forwardRef<BottomSheetVerPedidoRef, Props>(
  (
    {
      fechaSeleccion,
      items = [],
      isVisible,
      onClose,
      backgroundColor,
      role = "buyer",
    },
    ref,
  ) => {
    const { colors, fonts } = useTheme();
    const brandColor =
      role === "buyer" ? colors.brandBuyer : colors.brandSeller;
    const sheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      present: () => sheetRef.current?.snapToIndex(0),
      dismiss: () => sheetRef.current?.close(),
    }));

    return (
      <BottomSheet
        ref={sheetRef}
        index={isVisible ? 0 : -1} // -1 = cerrado, 0 = abierto
        enableDynamicSizing
        onClose={onClose}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: colors.fondoPedidos,
          borderTopWidth: 2,
          borderTopColor: brandColor,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          elevation: 25,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
        handleIndicatorStyle={{
          backgroundColor: brandColor,
          marginTop: 8,
          width: 60,
        }}
      >
        <BottomSheetView style={{ padding: Spacing.lg, paddingBottom: 36 }}>
          {fechaSeleccion && (
            <Text
              style={{
                fontSize: FontSizes.md,
                fontFamily: fonts.robotoBold,
                color: colors.textDefault,
                marginBottom: Spacing.sm,
              }}
            >
              {new Date(fechaSeleccion).toLocaleString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          )}

          <ScrollView contentContainerStyle={{ paddingBottom: 48 }}>
            {items.length > 0 ? (
              items.map((it) => (
                <View
                  key={it.id}
                  style={{ paddingVertical: 8, paddingBottom: 48 }}
                >
                  <Text
                    style={{
                      color: colors.textDefault,
                      fontSize: FontSizes.base,
                      lineHeight: 20,
                    }}
                  >
                    {it.label}
                  </Text>
                </View>
              ))
            ) : (
              <Text
                style={{
                  color: colors.textMuted,
                  fontSize: FontSizes.base,
                  textAlign: "center",
                  marginTop: Spacing.md,
                }}
              >
                No hay detalles para este pedido.
              </Text>
            )}
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

BottomSheetVerPedido.displayName = "BottomSheetVerPedido";

export default BottomSheetVerPedido;
