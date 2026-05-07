import { FontSizes } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, Text, View } from "react-native";
import AttentionRebote from "../UI/Animations/AttentionRebote";
import { Chat } from "../icons";

type NotaDelVendedorProps = {
  nota?: string;
  onVerNota?: (nota: string) => void;
};

const NotaDelVendedor: React.FC<NotaDelVendedorProps> = ({
  nota,
  onVerNota,
}) => {
  const { colors, fonts } = useTheme();
  const hayNota = nota && nota.trim() !== "";

  if (hayNota) {
    return (
      <Pressable
        onPress={() => onVerNota?.(nota!)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: colors.background,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.robotoBold,
            fontSize: FontSizes.sm,
            color: colors.brandBuyer,
            textDecorationLine: "underline",
          }}
        >
          Ver nota
        </Text>
        <AttentionRebote>
          <Chat
            width={20}
            height={20}
            stroke={colors.brandBuyer}
            strokeWidth={1.5}
            fill={"white"}
          />
        </AttentionRebote>
      </Pressable>
    );
  }

  // si no hay nota:
  return (
    <View>
      <Text
        style={{
          fontFamily: fonts.robotoRegular,
          fontSize: FontSizes.sm,
          color: colors.textMuted,
        }}
      >
        Sin nota del vendedor
      </Text>
    </View>
  );
};

export default NotaDelVendedor;
