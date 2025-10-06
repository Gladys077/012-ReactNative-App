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

  // Título dinámico por rol
  let displayTitle = title ?? "";
  if (!displayTitle) {
    if (!isSeller) displayTitle = "Mi pedido";
    else displayTitle = user.commerceName || "Mi negocio";
  }

  return (
    <SafeAreaView edges={["left", "right"]}>
      {/*Este View se extiende hacia arriba y pinta el fondo detrás de la hora/batería.*/}
      <View
        style={{
          backgroundColor: colors.headerFooterBg,
          borderBottomColor: colors.border,
          width: "100%",
          maxWidth: 500,
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="flex-row items-center justify-between px-2 py-2 border-b gap-4"
      >
        
        {/* Lado izquierdo */}
        {leftContent ? (
          leftContent
        ) : showBackArrow ? (
          <Pressable
            className="h-11 w-11 items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Volver width={24} height={24} fill={colors.textDefault} />
          </Pressable>
        ) : isSeller ? (
          <TiendaIcon width={24} height={24} fill={colors.brandSeller} />
        ) : (
          <Carrito
            width={24}
            height={24}
            fill={colors.brandBuyer}
            stroke={colors.textDefault}
          />
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
            <Monedas
              width={22}
              height={22}
              fill={colors.brandSeller}
              strokeWidth={1}
            />
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
