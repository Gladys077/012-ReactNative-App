import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
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
}

const BottomSheetVerPedido = forwardRef<BottomSheetVerPedidoRef, Props>(
  (
    {
      fechaSeleccion,
      items = [],
      snapPoints = ["40%", "70%"],
      isVisible,
      onClose,
    },
    ref,
  ) => {
    const { colors, fonts } = useTheme();
    const sheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      present: () => sheetRef.current?.snapToIndex(0),
      dismiss: () => sheetRef.current?.close(),
    }));

    const _snapPoints = useMemo(() => snapPoints, [snapPoints]);

    if (!isVisible) return null;

    return (
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={_snapPoints}
        onClose={onClose}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: colors.brandBuyerSoft }}
        handleIndicatorStyle={{ backgroundColor: colors.textMuted }}
      >
        <BottomSheetView style={{ padding: Spacing.lg, flex: 1 }}>
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
                <View key={it.id} style={{ paddingVertical: 8 }}>
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
