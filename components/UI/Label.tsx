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
  className = "",
  subtextStyle,
  noMarginTop = false,
}: LabelProps) {
  const { colors } = useTheme();

  return (
    <View className={`flex flex-col ${noMarginTop ? "" : "mt-4"} ${className}`}>
      {children && (
        <View className="flex-row items-center gap-1">
          <Text
            style={{ color: colors.textDefault, fontSize: 12, fontFamily: "Roboto_500Medium" }}
          >
            {children}
          </Text>
          {required && (
            <Text
              style={{ color: colors.textError, fontSize: 14, fontFamily: "Roboto_500Medium" }}
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
            fontFamily: "Roboto_400Regular",
            ...subtextStyle,
          }}
        >
          {subtext}
        </Text>
      )}
    </View>
  );
}
