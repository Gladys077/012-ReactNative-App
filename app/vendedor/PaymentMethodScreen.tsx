import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../../components/UI/Button/Button";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type PaymentMethod = "card" | "transfer" | null;

// ─── Íconos inline ────────────────────────────────────────────────────────────

function IconCard({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: color + "18",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 22 }}>💳</Text>
    </View>
  );
}

function IconTransfer({ color }: { color: string }) {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: color + "18",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 22 }}>🏦</Text>
    </View>
  );
}

// ─── Subcomponentes ───────────────────────────────────────────────────────────

function PaymentOption({
  id,
  title,
  description,
  icon,
  selected,
  onSelect,
  badge,
}: {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  badge?: string;
}) {
  const { colors, fonts } = useTheme();

  return (
    <View style={({} = {})}>
      <View
        onTouchEnd={onSelect}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.md,
          paddingHorizontal: Spacing.xl,
          paddingVertical: Spacing.lg,
          borderRadius: BorderRadius.xl,
          backgroundColor: selected ? colors.brandSeller + "18" : colors.cardBg,
          borderWidth: 1.5,
          borderColor: selected ? colors.brandSeller : colors.border,
          marginBottom: Spacing.sm,
        }}
      >
        {icon}

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: Spacing.sm,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.robotoMedium,
                fontSize: FontSizes.base,
                color: colors.textDefault,
              }}
            >
              {title}
            </Text>
            {badge && (
              <View
                style={{
                  backgroundColor: colors.brandSeller,
                  borderRadius: BorderRadius.sm,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.robotoMedium,
                    fontSize: FontSizes.xs,
                    color: "#fff",
                  }}
                >
                  {badge}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={{
              fontFamily: fonts.robotoRegular,
              fontSize: FontSizes.sm,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            {description}
          </Text>
        </View>

        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 2,
            borderColor: selected ? colors.brandSeller : colors.border,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selected && (
            <View
              style={{
                width: 11,
                height: 11,
                borderRadius: 6,
                backgroundColor: colors.brandSeller,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

function OrderSummary({ creditAmount }: { creditAmount: number }) {
  const { colors, fonts } = useTheme();

  // Guard: si por alguna razón llega NaN/undefined no rompe
  if (!creditAmount || isNaN(creditAmount)) return null;

  return (
    <View
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border,
        padding: Spacing.xl,
        marginBottom: Spacing.xxl,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: Spacing.sm,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.sm,
            color: colors.textMuted,
          }}
        >
          Créditos a acreditar
        </Text>
        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          {creditAmount.toLocaleString("es-AR")} créditos
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: colors.border,
          marginVertical: Spacing.sm,
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontFamily: fonts.robotoBold ?? fonts.robotoMedium,
            fontSize: FontSizes.base,
            color: colors.textDefault,
          }}
        >
          Total a pagar
        </Text>
        <Text
          style={{
            fontFamily: fonts.robotoBold ?? fonts.robotoMedium,
            fontSize: FontSizes.base,
            color: colors.brandSeller,
          }}
        >
          $ {creditAmount.toLocaleString("es-AR")}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.xs,
          color: colors.textMuted,
          marginTop: Spacing.sm,
        }}
      >
        * Por cada venta, se descontará automáticamente el 5% del valor en
        créditos.{"\n"}Ejemplo: una venta de $25.000 descuenta 1.250 créditos a
        su saldo.
      </Text>
    </View>
  );
}

// ─── Screen principal ─────────────────────────────────────────────────────────

export default function PaymentMethodScreen() {
  const { colors, fonts } = useTheme();

  // ✅ Expo Router: leemos el param con useLocalSearchParams
  const { creditAmount: creditAmountParam } = useLocalSearchParams<{
    creditAmount: string;
  }>();

  // Expo Router pasa todo como string → parseamos a número
  const creditAmount = parseInt(String(creditAmountParam ?? "0"), 10);

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!selectedMethod) {
      Alert.alert(
        "Seleccioná un método",
        "Elegí cómo querés pagar antes de continuar.",
      );
      return;
    }

    if (selectedMethod === "card") {
      // TODO: invocar el SDK/WebView de VISA con `creditAmount`
      Alert.alert("Tarjeta", "Aquí se abriría la vista de VISA.");
    } else {
      router.push({
        pathname: "/vendedor/TransferScreen",
        params: { creditAmount },
      });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: Spacing.xl * 2,
          maxWidth: 500,
          width: "100%",
          alignSelf: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Título ── */}
        <Text
          style={{
            fontFamily: fonts.robotoBold ?? fonts.robotoMedium,
            fontSize: FontSizes.md,
            color: colors.textDefault,
            marginTop: Spacing.lg,
            paddingBottom: Spacing.xl,
          }}
        >
          Resumen
        </Text>

        {/* ── Resumen del pedido ── */}
        <OrderSummary creditAmount={creditAmount} />

        {/* ── Método de pago ── */}
        <Text
          style={{
            fontFamily: fonts.robotoBold ?? fonts.robotoMedium,
            fontSize: FontSizes.md,
            color: colors.textDefault,
            paddingBottom: Spacing.xl,
          }}
        >
          Método de pago
        </Text>

        <PaymentOption
          id="card"
          title="Tarjeta"
          description="Crédito o débito — procesado por VISA"
          icon={<IconCard color={colors.brandSeller} />}
          selected={selectedMethod === "card"}
          onSelect={() => setSelectedMethod("card")}
          badge="Recomendado"
        />

        <PaymentOption
          id="transfer"
          title="Transferencia bancaria"
          description="Acreditación en 1–2 días hábiles"
          icon={<IconTransfer color={colors.brandSeller} />}
          selected={selectedMethod === "transfer"}
          onSelect={() => setSelectedMethod("transfer")}
        />

        {/* ── Botón confirmar ── */}
        <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.xl }}>
          <Button
            section="seller"
            width="full"
            onPress={handleConfirm}
            disabled={!selectedMethod || loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : "Confirmar y pagar"}
          </Button>
        </View>

        {/* Nota seguridad */}
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.xs,
            color: colors.textMuted,
            textAlign: "center",
            marginTop: Spacing.md,
            paddingHorizontal: Spacing.lg,
          }}
        >
          🔒 Tu información de pago está protegida {"\n"}con cifrado SSL
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
