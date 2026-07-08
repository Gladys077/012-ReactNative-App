import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { Chevron, Monedas } from "../../components/icons";
import Button from "../../components/UI/Button/Button";
import { useAuthContext } from "../../context/AuthContext";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type CreditOption = {
  id: string;
  label: string;
  creditAmount: number | null; // null = personalizado
};

type FaqItem = {
  question: string;
  answer: string;
};

// ─── Datos ────────────────────────────────────────────────────────────────────

const CREDIT_OPTIONS: CreditOption[] = [
  { id: "opt1", label: "5.000 créditos", creditAmount: 5000 },
  { id: "opt2", label: "10.000 créditos", creditAmount: 10000 },
  { id: "opt3", label: "20.000 créditos", creditAmount: 20000 },
  { id: "custom", label: "Personalizado", creditAmount: null },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué son los créditos?",
    answer:
      "Los créditos son la moneda interna de la plataforma. Se utilizan para publicar y gestionar tus ventas. Cada vez que realizás una venta, se descuenta automáticamente un 5% de tu saldo de créditos.",
  },
  {
    question: "¿Cómo se descuentan los créditos?",
    answer:
      "Al confirmar una venta, el sistema descuenta automáticamente el 5% del valor de la transacción de tu saldo de créditos. No necesitás hacer nada manual, el proceso es completamente automático.",
  },
  {
    question: "¿Cuándo se confirma una venta?",
    answer: "Cuando el vendedor confirma que ha entregado el producto.",
  },
  {
    question: "¿Los créditos vencen?",
    answer:
      "No, los créditos no tienen fecha de vencimiento. Una vez adquiridos, permanecen en tu cuenta hasta que los uses en tus ventas.",
  },
  {
    question: "¿Qué métodos de pago están disponibles?",
    answer:
      "Aceptamos tarjetas de crédito y débito, transferencia bancaria y otros métodos de pago locales. Al presionar 'Comprar ahora' verás las opciones disponibles para tu región.",
  },
];

// ─── Subcomponentes ───────────────────────────────────────────────────────────

/** Comprar créditos */
function CreditCard({
  option,
  selected,
  onSelect,
  customAmount,
  onCustomChange,
}: {
  option: CreditOption;
  selected: boolean;
  onSelect: () => void;
  customAmount: string;
  onCustomChange: (v: string) => void;
}) {
  const { colors, fonts } = useTheme();

  const isCustom = option.creditAmount === null;

  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Spacing.xl,
        minHeight: 64,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.xl,
        backgroundColor: selected ? colors.brandSeller + "18" : colors.cardBg,
        borderWidth: 1.5,
        borderColor: selected ? colors.brandSeller : colors.border,
        marginBottom: Spacing.xs,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      {/* Etiquetas créditos */}
      <Text
        style={{
          fontFamily: fonts.robotoMedium,
          fontSize: FontSizes.base,
          color: colors.textDefault,
          flex: 1,
        }}
      >
        {option.label}
      </Text>

      {/* Precio o input */}
      {isCustom ? (
        <TextInput
          value={customAmount}
          onChangeText={onCustomChange}
          onFocus={onSelect}
          keyboardType="numeric"
          placeholder="Importe"
          placeholderTextColor={colors.textMuted}
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.base,
            color: colors.textDefault,
            textAlign: customAmount ? "right" : "center",
            minWidth: 90,
            borderWidth: 1,
            borderColor: selected ? colors.brandSeller : colors.border,
            borderRadius: BorderRadius.sm,
            paddingHorizontal: Spacing.sm,
            paddingVertical: Platform.OS === "ios" ? 6 : 4,
            backgroundColor: colors.bgPressed,
            marginRight: Spacing.md,
          }}
        />
      ) : (
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.base,
            color: colors.textMuted,
            marginRight: Spacing.md,
          }}
        >
          $ {option.creditAmount!.toLocaleString("es-AR")}
        </Text>
      )}

      {/* Radio button */}
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
    </Pressable>
  );
}

/** Ítem de FAQ con acordeón */
function FaqAccordion({ item }: { item: FaqItem }) {
  const { colors, fonts } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      onPress={() => setOpen((prev) => !prev)}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.brandSeller + "0D" : colors.cardBg,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: open ? colors.brandSeller + "55" : colors.border,
        marginBottom: Spacing.xs,
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.sm,
        overflow: "hidden",
      })}
    >
      {/* Cabecera */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.lg,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
            flex: 1,
            paddingRight: Spacing.sm,
          }}
        >
          {item.question}
        </Text>
        {/* Chevron */}
        <Chevron width="18" height="18" color={colors.brandSeller} />
        {/* <Text
          style={{
            fontSize: 24,
            color: colors.brandSeller,
            transform: [{ rotate: open ? "180deg" : "0deg" }],
          }}
        >
          ▾
        </Text> */}
      </View>

      {/* Respuesta */}
      {open && (
        <View
          style={{
            paddingHorizontal: Spacing.md,
            paddingBottom: Spacing.md,
            paddingTop: 0,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.robotoRegular,
              fontSize: FontSizes.sm,
              color: colors.textDefault,
              lineHeight: 20,
              marginTop: Spacing.sm,
            }}
          >
            {item.answer}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

/** Banner de saldo */
function SaldoBanner({ credits }: { credits: number }) {
  const { colors, fonts } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.brandSeller + "15",
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: colors.brandSeller + "40",
        padding: Spacing.md,
        marginBottom: Spacing.xxl,
        gap: Spacing.xs,
      }}
    >
      {/* Fila 1 */}
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: Spacing.md }}
      >
        <Monedas width={26} height={25} color={colors.brandSeller} />

        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          Tenés{" "}
          <Text style={{ color: colors.brandSeller }}>
            {credits.toLocaleString("es-AR")} créditos
          </Text>{" "}
          disponibles
        </Text>
      </View>

      {/* Fila 2 */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.md,
        }}
      >
        <Text style={{ fontSize: 24, color: "yellow" }}>⚠</Text>
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
            flex: 1,
          }}
        >
          Se descuentan automáticamente con cada venta (5%)
        </Text>
      </View>
    </View>
  );
}

/** Títulos de cada sección */
function SectionLabel({ label }: { label: string }) {
  const { colors, fonts } = useTheme();
  return (
    <Text
      style={{
        fontFamily: fonts.robotoBold ?? fonts.robotoMedium,
        fontSize: FontSizes.md,
        color: colors.textDefault,
        marginTop: Spacing.lg,
        paddingBottom: Spacing.xl,
      }}
    >
      {label}
    </Text>
  );
}

// ─── Screen principal ─────────────────────────────────────────────────────────

export default function CreditosVendedorScreen() {
  const { colors } = useTheme();

  // Créditos del usuario (vendrá del contexto/backend)
  const { user } = useAuthContext();
  const userCredits = user?.credits ?? 0;

  const [selectedId, setSelectedId] = useState<string>("opt2");
  const [customAmount, setCustomAmount] = useState("");

  // Formatea el string con puntos cada 3 dígitos (ej: "1.500.000")
  const formatWithDots = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(formatWithDots(value));
  };

  const handleComprar = () => {
    const selected = CREDIT_OPTIONS.find((o) => o.id === selectedId);
    if (!selected) return;

    let creditAmount: number;

    if (selected.creditAmount === null) {
      const parsed = parseInt(customAmount.replace(/\D/g, ""), 10);
      if (!parsed || parsed <= 0) {
        Alert.alert(
          "Importe inválido",
          "Ingresá un importe válido para continuar.",
        );
        return;
      }
      creditAmount = parsed;
    } else {
      creditAmount = selected.creditAmount;
    }

    router.push({
      pathname: "/vendedor/PaymentMethodScreen",
      params: { creditAmount },
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Saldo actual ── */}
          <SectionLabel label="Saldo actual" />
          <SaldoBanner credits={userCredits} />

          {/* ── Comprar créditos ── */}
          <SectionLabel label="Comprar más créditos" />

          {CREDIT_OPTIONS.map((opt) => (
            <CreditCard
              key={opt.id}
              option={opt}
              selected={selectedId === opt.id}
              onSelect={() => setSelectedId(opt.id)}
              customAmount={customAmount}
              onCustomChange={handleCustomChange}
            />
          ))}

          {/* Botón comprar */}
          <View
            style={{ paddingHorizontal: Spacing.lg, marginBottom: Spacing.xl }}
          >
            <Button
              section="seller"
              width="full"
              onPress={handleComprar}
              styleAdd={{
                marginBottom: Spacing.xl,
              }}
            >
              Comprar ahora
            </Button>
          </View>

          {/* ── Preguntas frecuentes ── */}
          <SectionLabel label="Preguntas frecuentes" />

          {FAQ_ITEMS.map((item, i) => (
            <FaqAccordion key={i} item={item} />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
