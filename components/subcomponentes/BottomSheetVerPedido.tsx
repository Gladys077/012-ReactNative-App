import { FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { ScrollView, Text, View } from "react-native";

export type BottomSheetVerPedidoRef = {
  present: () => void;
  dismiss: () => void;
};

interface Item {
  id: string | number;
  label: string; // texto libre del pedido
}

interface Props {
  numeroPedido?: number | string;
  items?: Item[];
  snapPoints?: string[];
}

const BottomSheetVerPedido = forwardRef<BottomSheetVerPedidoRef, Props>(
  ({ numeroPedido, items = [], snapPoints = ["40%", "70%"] }, ref) => {
    const { colors, fonts } = useTheme();
    const sheetRef = useRef<BottomSheetModal>(null);

    // Métodos expuestos al padre
    useImperativeHandle(ref, () => ({
      present: () => sheetRef.current?.present(),
      dismiss: () => sheetRef.current?.dismiss(),
    }));

    const _snapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        snapPoints={_snapPoints}
        backgroundStyle={{ backgroundColor: colors.brandBuyerSoft }}
        handleIndicatorStyle={{ backgroundColor: colors.textMuted }}
      >
        <View style={{ padding: Spacing.lg, flex: 1 }}>
          {/* Header */}
          {numeroPedido && (
            <Text
              style={{
                fontSize: FontSizes.md,
                fontFamily: fonts.robotoBold,
                color: colors.textDefault,
                marginBottom: Spacing.sm,
              }}
            >
              Pedido #{numeroPedido}
            </Text>
          )}

          {/* Lista scrolleable */}
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
        </View>
      </BottomSheetModal>
    );
  },
);

BottomSheetVerPedido.displayName = "BottomSheetVerPedido";

export default BottomSheetVerPedido;
