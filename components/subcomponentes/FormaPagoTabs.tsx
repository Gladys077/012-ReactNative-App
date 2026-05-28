import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { BorderRadius, FontSizes, Spacing } from "../../constants/Tokens";

interface Props {
  formaPago: "transferencia" | "efectivo";
  setFormaPago: (value: "transferencia" | "efectivo") => void;
}

const FormaPagoTabs: React.FC<Props> = ({ formaPago, setFormaPago }) => {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      {/* Título Forma de Pago */}
      <Text
        style={{
          fontFamily: fonts.robotoBold,
          fontSize: FontSizes.base,
          color: colors.textDefault,
          textAlign: "center",
          marginBottom: Spacing.md,
          backgroundColor: colors.cardBg,
          marginTop: 4,
          paddingVertical: 4,
        }}
      >
        FORMA DE PAGO
      </Text>

      {/* Selector de forma de pago (tabs) */}
      <View
        style={{
          flexDirection: "row",
          borderRadius: BorderRadius.md,
          padding: 8,
          // marginBottom: Spacing.lg,
          gap: 8,
        }}
      >
        {/* -----Transferencia----- */}
        <Pressable
          onPress={() => setFormaPago("transferencia")}
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: Spacing.sm,
            borderRadius: BorderRadius.sm,
            gap: 10,
            borderBottomWidth: formaPago === "transferencia" ? 4 : 0,
            borderColor:
              formaPago === "transferencia" ? colors.brandBuyer : "transparent",
          }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              borderWidth: formaPago === "transferencia" ? 5 : 2,
              borderColor:
                formaPago === "transferencia"
                  ? colors.textDefault
                  : colors.textMuted,
            }}
          />
          <Text
            style={{
              fontFamily: fonts.robotoMedium,
              fontSize: FontSizes.sm,
              color:
                formaPago === "transferencia"
                  ? colors.textDefault
                  : colors.textMuted,
              textAlign: "center",
            }}
          >
            Transferencia
          </Text>
        </Pressable>

        {/* -----Efectivo contra entrega----- */}
        <Pressable
          onPress={() => setFormaPago("efectivo")}
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: Spacing.sm,
            borderRadius: BorderRadius.sm,
            gap: 10,
            borderBottomWidth: formaPago === "efectivo" ? 4 : 0,
            borderColor:
              formaPago === "efectivo" ? colors.brandBuyer : "transparent",
          }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              borderWidth: formaPago === "efectivo" ? 5 : 2,
              borderColor:
                formaPago === "efectivo"
                  ? colors.textDefault
                  : colors.textMuted,
            }}
          />
          <Text
            style={{
              fontFamily: fonts.robotoMedium,
              fontSize: FontSizes.sm,
              color:
                formaPago === "efectivo"
                  ? colors.textDefault
                  : colors.textMuted,
              textAlign: "center",
            }}
          >
            Efectivo contra entrega
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FormaPagoTabs;
