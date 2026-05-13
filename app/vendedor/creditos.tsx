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
import { Monedas } from "../../components/icons";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type CreditOption = {
  id: string;
  label: string;
  amount: number | null; // null = personalizado
};

type FaqItem = {
  question: string;
  answer: string;
};

// ─── Datos ────────────────────────────────────────────────────────────────────

const CREDIT_OPTIONS: CreditOption[] = [
  { id: "opt1", label: "5.000 créditos", amount: 5000 },
  { id: "opt2", label: "10.000 créditos", amount: 10000 },
  { id: "opt3", label: "20.000 créditos", amount: 20000 },
  { id: "custom", label: "Personalizado", amount: null },
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
    question: "¿Puedo pedir reintegro?",
    answer:
      "Sí, podés solicitar el reintegro de créditos no utilizados contactando a nuestro equipo de soporte. El proceso puede demorar hasta 72 horas hábiles y está sujeto a nuestros términos y condiciones.",
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

/** Tarjeta de opción de crédito */
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

  const isCustom = option.amount === null;

  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.md,
        backgroundColor: selected ? colors.brandSeller + "18" : colors.cardBg,
        borderWidth: 1.5,
        borderColor: selected ? colors.brandSeller : colors.border,
        marginBottom: Spacing.xs,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      {/* Etiqueta */}
      <Text
        style={{
          fontFamily: fonts.robotoMedium,
          fontSize: FontSizes.sm,
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
            fontSize: FontSizes.sm,
            color: colors.textDefault,
            textAlign: "right",
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
            fontSize: FontSizes.sm,
            color: colors.textMuted,
            marginRight: Spacing.md,
          }}
        >
          $ {option.amount!.toLocaleString("es-AR")}
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
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: open ? colors.brandSeller + "55" : colors.border,
        marginBottom: Spacing.xs,
        overflow: "hidden",
      })}
    >
      {/* Cabecera */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm + 4,
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
        <Text
          style={{
            fontSize: 16,
            color: colors.brandSeller,
            transform: [{ rotate: open ? "180deg" : "0deg" }],
          }}
        >
          ▾
        </Text>
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
        marginBottom: Spacing.lg,
        gap: Spacing.xs,
      }}
    >
      {/* Fila 1 */}
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: Spacing.md }}
      >
        {/* <Text style={{ fontSize: 20 }}>🪙</Text> */}

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
        style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}
      >
        <Text style={{ fontSize: 24, color: "yellow" }}>⚠</Text>
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          Se descuentan automáticamente con cada venta (5%)
        </Text>
      </View>
    </View>
  );
}

/** Label de sección */
function SectionLabel({ label }: { label: string }) {
  const { colors, fonts } = useTheme();
  return (
    <Text
      style={{
        fontFamily: fonts.robotoBold ?? fonts.robotoMedium,
        fontSize: FontSizes.base,
        color: colors.textDefault,
        marginBottom: Spacing.sm,
        marginTop: Spacing.lg,
      }}
    >
      {label}
    </Text>
  );
}

// ─── Screen principal ─────────────────────────────────────────────────────────

export default function CreditosVendedorScreen() {
  const { colors, fonts } = useTheme();

  // Créditos del usuario (vendrá del contexto/backend)
  const userCredits = 5000;

  const [selectedId, setSelectedId] = useState<string>("opt2");
  const [customAmount, setCustomAmount] = useState("");

  const handleComprar = () => {
    const selected = CREDIT_OPTIONS.find((o) => o.id === selectedId);
    if (!selected) return;

    if (selected.amount === null) {
      const parsed = parseInt(customAmount.replace(/\D/g, ""), 10);
      if (!parsed || parsed <= 0) {
        Alert.alert(
          "Importe inválido",
          "Ingresá un importe válido para continuar.",
        );
        return;
      }
      // TODO: navegar a pantalla de pago con amount=parsed
      Alert.alert(
        "Compra",
        `Vas a comprar ${parsed.toLocaleString("es-AR")} créditos.`,
      );
    } else {
      // TODO: navegar a pantalla de pago con amount=selected.amount
      Alert.alert("Compra", `Vas a comprar ${selected.label}.`);
    }
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
              onCustomChange={setCustomAmount}
            />
          ))}

          {/* Botón comprar */}
          <Pressable
            onPress={handleComprar}
            style={({ pressed }) => ({
              backgroundColor: colors.brandSeller,
              borderRadius: BorderRadius.md,
              paddingVertical: Spacing.md,
              alignItems: "center",
              marginTop: Spacing.md,
              marginBottom: 32,
              opacity: pressed ? 0.88 : 1,
            })}
          >
            <Text
              style={{
                fontFamily: fonts.robotoMedium,
                fontSize: FontSizes.md,
                color: "#FFFFFF",
                letterSpacing: 0.3,
              }}
            >
              Comprar ahora
            </Text>
          </Pressable>

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
