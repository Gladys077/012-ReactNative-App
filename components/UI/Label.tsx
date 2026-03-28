import { useTheme } from "@/context/ThemeContext";
import { Text, TextStyle, View } from "react-native";

interface LabelProps {
  children?: React.ReactNode;
  required?: boolean;
  icon?: React.ReactNode;
  subtext?: string;
  className?: string;
  subtextStyle?: TextStyle; // prop para color/estilo dinámico (si es error: rojo)
  noMarginTop?: boolean;
}

export default function Label({
  children,
  required = false,
  icon,
  subtext,
  subtextStyle,
  noMarginTop = false,
}: LabelProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={{ flexDirection: "column", marginTop: noMarginTop ? 0 : 16 }}>
      {children && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Text
            style={{
              color: colors.textDefault,
              fontSize: 14,
              fontFamily: fonts.robotoMedium,
            }}
          >
            {children}
          </Text>
          {required && (
            <Text
              style={{
                color: colors.textError,
                fontSize: 12,
                fontFamily: fonts.robotoMedium,
              }}
            >
              *
            </Text>
          )}
          {icon && <View style={{ marginLeft: 4 }}>{icon}</View>}
        </View>
      )}

      {subtext && (
        <Text
          style={{
            color: colors.textMuted,
            fontSize: 12,
            fontFamily: fonts.robotoRegular,
            ...subtextStyle,
          }}
        >
          {subtext}
        </Text>
      )}
    </View>
  );
}
