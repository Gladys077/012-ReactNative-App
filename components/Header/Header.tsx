import { useNavigation } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Carrito, Monedas, TiendaIcon, Volver } from "../icons";

type HeaderProps = {
  title?: string;
  showBackArrow?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onBackPress?: () => void;
};

export default function Header({
  title,
  showBackArrow,
  leftContent,
  rightContent,
}: HeaderProps) {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { colors } = useTheme();

  if (!user) return null;
  const isSeller = user.role === "seller";

  // Título dinámico
  let displayTitle = title ?? "";
  if (!displayTitle) {
    if (!isSeller) displayTitle = "Mi pedido";
    else displayTitle = user.commerceName || "Mi negocio";
  }

  return (
    <SafeAreaView>
        <View
          className="flex-row items-center justify-between px-4 py-4 border-b gap-4"
          style={{
            backgroundColor: colors.headerBg,
            borderBottomColor: colors.border,
          }}
        >
          {/* Lado izquierdo */}
          {leftContent ? (
            leftContent
          ) : showBackArrow ? (
            <Pressable onPress={() => navigation.goBack()}>
              <Volver width={24} height={24} fill={colors.textDefault} />
            </Pressable>
          ) : isSeller ? (
            <TiendaIcon width={24} height={24} fill={colors.brandSeller}/>
          ) : (
            <Carrito width={24} height={24} fill={colors.brandBuyer} stroke={colors.textDefault}/>
          )}

          {/* Título */}
          <Text
            className="flex-1 mr-3.5 text-lg font-Roboto-Medium"
            style={{ color: colors.textDefault }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {displayTitle}
          </Text>

          {/* Lado derecho */}
          {rightContent ? (
            rightContent
          ) : isSeller ? (
            <View className="flex-row items-center">
              <Monedas width={22} height={22} fill={colors.brandSeller} strokeWidth={1} />
              <Text
                className="ml-2 font-Roboto-Medium"
                style={{ color: colors.textDefault }}
              >
                {user.credits ?? 0}
              </Text>
            </View>
          ) : (
            <View style={{ width: 44 }} /> // placeholder
          )}
        </View>
    </SafeAreaView>
  );
}
