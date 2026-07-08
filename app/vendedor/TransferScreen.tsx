import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../../components/UI/Button/Button";
import { useAuthContext } from "../../context/AuthContext";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

// ─── Datos bancarios ──────────────────────────────────────────────────────────

const BANK_INFO = {
  banco: "Banco Galicia",
  titular: "MiApp S.A.",
  cbu: "0070999020000001234567",
  alias: "MIAPP.CREDITOS",
  cuit: "30-71234567-8",
};

// ─── Subcomponentes ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const { colors, fonts } = useTheme();
  const steps = ["Datos", "Transferí", "Confirmá"];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Spacing.xxl,
        paddingTop: Spacing.lg,
      }}
    >
      {steps.map((label, i) => {
        const stepNum = (i + 1) as Step;
        const isActive = stepNum === current;
        const isDone = stepNum < current;

        return (
          <React.Fragment key={label}>
            <View style={{ alignItems: "center", gap: 4 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor:
                    isActive || isDone ? colors.brandSeller : colors.cardBg,
                  borderWidth: 1.5,
                  borderColor:
                    isActive || isDone ? colors.brandSeller : colors.border,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isDone ? (
                  <Text style={{ color: "#fff", fontSize: 14 }}>✓</Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: fonts.robotoMedium,
                      fontSize: FontSizes.sm,
                      color: isActive ? "#fff" : colors.textMuted,
                    }}
                  >
                    {stepNum}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  fontFamily: isActive
                    ? fonts.robotoMedium
                    : fonts.robotoRegular,
                  fontSize: FontSizes.xs,
                  color: isActive ? colors.brandSeller : colors.textMuted,
                }}
              >
                {label}
              </Text>
            </View>

            {i < steps.length - 1 && (
              <View
                style={{
                  flex: 1,
                  height: 1.5,
                  backgroundColor:
                    stepNum < current ? colors.brandSeller : colors.border,
                  marginHorizontal: Spacing.sm,
                  marginBottom: Spacing.lg,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

function BankRow({
  label,
  value,
  copyable,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  const { colors, fonts } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.xs,
            color: colors.textMuted,
            marginBottom: 2,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.sm,
            color: colors.textDefault,
          }}
        >
          {value}
        </Text>
      </View>

      {copyable && (
        <Pressable
          onPress={handleCopy}
          style={({ pressed }) => ({
            paddingHorizontal: Spacing.md,
            paddingVertical: Spacing.xs,
            borderRadius: BorderRadius.sm,
            backgroundColor: copied
              ? colors.brandSeller + "20"
              : colors.bgPressed,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: fonts.robotoMedium,
              fontSize: FontSizes.xs,
              color: copied ? colors.brandSeller : colors.textMuted,
            }}
          >
            {copied ? "✓ Copiado" : "Copiar"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

function AmountHighlight({ amount }: { amount: number }) {
  const { colors, fonts } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.brandSeller + "15",
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: colors.brandSeller + "40",
        padding: Spacing.xl,
        alignItems: "center",
        marginBottom: Spacing.xl,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.sm,
          color: colors.textMuted,
          marginBottom: Spacing.xs,
        }}
      >
        Transferí exactamente
      </Text>
      <Text
        style={{
          fontFamily: fonts.robotoBold ?? fonts.robotoMedium,
          fontSize: 28,
          color: colors.brandSeller,
          letterSpacing: 0.5,
        }}
      >
        $ {amount.toLocaleString("es-AR")}
      </Text>
      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.xs,
          color: colors.textMuted,
          marginTop: Spacing.xs,
        }}
      >
        El monto debe coincidir exactamente para acreditar tus créditos
      </Text>
    </View>
  );
}

// ─── Pasos ────────────────────────────────────────────────────────────────────

function Step1({ amount, onNext }: { amount: number; onNext: () => void }) {
  const { colors, fonts } = useTheme();

  return (
    <>
      <AmountHighlight amount={amount} />

      <View
        style={{
          backgroundColor: colors.cardBg,
          borderRadius: BorderRadius.xl,
          borderWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: Spacing.xl,
          marginBottom: Spacing.xl,
        }}
      >
        <BankRow label="Banco" value={BANK_INFO.banco} />
        <BankRow label="Titular" value={BANK_INFO.titular} />
        <BankRow label="CBU" value={BANK_INFO.cbu} copyable />
        <BankRow label="Alias" value={BANK_INFO.alias} copyable />
        <BankRow label="CUIT" value={BANK_INFO.cuit} />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: Spacing.sm,
          backgroundColor: colors.cardBg,
          borderRadius: BorderRadius.md,
          borderWidth: 1,
          borderColor: colors.border,
          padding: Spacing.md,
          marginBottom: Spacing.xxl,
        }}
      >
        <Text style={{ fontSize: 18 }}>⚠️</Text>
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.xs,
            color: colors.textMuted,
            flex: 1,
            lineHeight: 18,
          }}
        >
          Solo transferencias desde cuentas a tu nombre. No aceptamos depósitos
          en efectivo ni de terceros.
        </Text>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg }}>
        <Button section="seller" width="full" onPress={onNext}>
          Ya transferí →
        </Button>
      </View>
    </>
  );
}

function Step2({ amount, onNext }: { amount: number; onNext: () => void }) {
  const { colors, fonts } = useTheme();

  return (
    <>
      <View
        style={{
          backgroundColor: colors.cardBg,
          borderRadius: BorderRadius.xl,
          borderWidth: 1,
          borderColor: colors.border,
          padding: Spacing.xl,
          marginBottom: Spacing.xl,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.robotoMedium,
            fontSize: FontSizes.base,
            color: colors.textDefault,
            marginBottom: Spacing.sm,
          }}
        >
          Envianos el comprobante
        </Text>
        <Text
          style={{
            fontFamily: fonts.robotoRegular,
            fontSize: FontSizes.sm,
            color: colors.textMuted,
            lineHeight: 20,
          }}
        >
          Para acreditar tus{" "}
          <Text
            style={{
              color: colors.brandSeller,
              fontFamily: fonts.robotoMedium,
            }}
          >
            {amount.toLocaleString("es-AR")} créditos
          </Text>{" "}
          necesitamos que nos envíes el comprobante de transferencia.
        </Text>
      </View>

      {[
        { emoji: "📧", title: "Por email", desc: "pagos@miapp.com.ar" },
        { emoji: "💬", title: "Por WhatsApp", desc: "+54 9 11 1234-5678" },
      ].map((opt) => (
        <View
          key={opt.title}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.md,
            backgroundColor: colors.cardBg,
            borderRadius: BorderRadius.xl,
            borderWidth: 1,
            borderColor: colors.border,
            padding: Spacing.lg,
            marginBottom: Spacing.sm,
          }}
        >
          <Text style={{ fontSize: 24 }}>{opt.emoji}</Text>
          <View>
            <Text
              style={{
                fontFamily: fonts.robotoMedium,
                fontSize: FontSizes.sm,
                color: colors.textDefault,
              }}
            >
              {opt.title}
            </Text>
            <Text
              style={{
                fontFamily: fonts.robotoRegular,
                fontSize: FontSizes.sm,
                color: colors.brandSeller,
              }}
            >
              {opt.desc}
            </Text>
          </View>
        </View>
      ))}

      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.xs,
          color: colors.textMuted,
          textAlign: "center",
          marginTop: Spacing.md,
          marginBottom: Spacing.xxl,
        }}
      >
        La acreditación puede demorar hasta 2 días hábiles
      </Text>

      {/* ✅ onNext ya viene desde TransferScreen con updateCredits adentro */}
      <View style={{ paddingHorizontal: Spacing.lg }}>
        <Button section="seller" width="full" onPress={onNext}>
          Ya lo envié →
        </Button>
      </View>
    </>
  );
}

function Step3({ amount, onFinish }: { amount: number; onFinish: () => void }) {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ alignItems: "center", paddingTop: Spacing.xxl }}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.brandSeller + "20",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: Spacing.xl,
        }}
      >
        <Text style={{ fontSize: 40 }}>✅</Text>
      </View>

      <Text
        style={{
          fontFamily: fonts.robotoBold ?? fonts.robotoMedium,
          fontSize: FontSizes.lg,
          color: colors.textDefault,
          marginBottom: Spacing.sm,
          textAlign: "center",
        }}
      >
        ¡Solicitud enviada!
      </Text>

      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.sm,
          color: colors.textMuted,
          textAlign: "center",
          lineHeight: 22,
          paddingHorizontal: Spacing.xl,
          marginBottom: Spacing.xxl,
        }}
      >
        Una vez que verifiquemos tu transferencia, acreditaremos{" "}
        <Text
          style={{ color: colors.brandSeller, fontFamily: fonts.robotoMedium }}
        >
          {amount.toLocaleString("es-AR")} créditos
        </Text>{" "}
        en tu cuenta. Te avisaremos por email.
      </Text>

      {[
        { emoji: "🕐", text: "Verificación: hasta 2 días hábiles" },
        { emoji: "📩", text: "Te notificamos por email al acreditar" },
        { emoji: "📋", text: "Podés seguir el estado en tu perfil" },
      ].map((item) => (
        <View
          key={item.text}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: Spacing.md,
            marginBottom: Spacing.sm,
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 18, width: 28, textAlign: "center" }}>
            {item.emoji}
          </Text>
          <Text
            style={{
              fontFamily: fonts.robotoRegular,
              fontSize: FontSizes.sm,
              color: colors.textMuted,
            }}
          >
            {item.text}
          </Text>
        </View>
      ))}

      <View
        style={{
          paddingHorizontal: Spacing.lg,
          marginTop: Spacing.xxl,
          width: "100%",
        }}
      >
        <Button section="seller" width="full" onPress={onFinish}>
          Volver al inicio
        </Button>
      </View>
    </View>
  );
}

// ─── Screen principal ─────────────────────────────────────────────────────────

export default function TransferScreen() {
  const { colors } = useTheme();

  // ✅ Expo Router: leemos el param igual que en PaymentMethodScreen
  const { creditAmount: creditAmountParam } = useLocalSearchParams<{
    creditAmount: string;
  }>();
  const amount = parseInt(String(creditAmountParam ?? "0"), 10);

  // ✅ Hook en el lugar correcto: dentro del componente
  const { updateCredits } = useAuthContext();

  const [step, setStep] = useState<Step>(1);

  // ✅ handleComprobante tiene acceso a amount, setStep y updateCredits
  //TODO Cuando esté hecho el backend debería enviar la solicitud al backend con el monto (No llamar updateCredits acá. El backend lo hará cuando apruebe)
  const handleComprobante = () => {
    updateCredits(amount); // suma los créditos al saldo del usuario
    setStep(3);
  };

  const handleFinish = () => {
    router.replace("/vendedor/homeVendedor");
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
        <StepIndicator current={step} />

        {step === 1 && <Step1 amount={amount} onNext={() => setStep(2)} />}
        {/* ✅ onNext apunta a handleComprobante, que actualiza créditos y avanza */}
        {step === 2 && <Step2 amount={amount} onNext={handleComprobante} />}
        {step === 3 && <Step3 amount={amount} onFinish={handleFinish} />}
      </ScrollView>
    </SafeAreaView>
  );
}
