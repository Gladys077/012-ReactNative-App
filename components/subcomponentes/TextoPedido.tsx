import { BorderRadius, FontSizes, Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "react-native";

interface TextoPedidoProps {
  texto: string;
}

export default function TextoPedido({ texto }: TextoPedidoProps) {
  const { colors, fonts } = useTheme();

  return (
    <Text
      style={{
        fontSize: FontSizes.base,
        fontFamily: fonts.robotoRegular,
        color: colors.textDefault,
        lineHeight: 18,
        backgroundColor: colors.fondoPedidos,
        borderRadius: BorderRadius.md,
        borderBottomColor: colors.textMuted,
        borderBottomWidth: 0.5,
        padding: Spacing.md,
      }}
    >
      {texto}
    </Text>
  );
}
