import { useNavigation } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { getColorByRole } from "../../constants/Colors";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Monedas, TiendaIcon, Volver } from "../icons";

type HeaderProps = {
  title?: string;             // título opcional, se puede sobreescribir
  showBackArrow?: boolean;    // fuerza la flecha de volver
};

export default function Header({ title, showBackArrow }: HeaderProps) {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { colors, mode } = useTheme();

  if (!user) return null;

  const isSeller = user.role === "seller";

  // Determinar si mostrar flecha
  const useBackArrow =
    showBackArrow || (!isSeller ? true : false); // buyer siempre flecha, seller según prop

  // Título a mostrar
  let displayTitle = title ?? "";
  if (!displayTitle) {
    if (!isSeller) displayTitle = "Historial"; // default comprador sin prop
    else displayTitle = user.commerceName || "Mi negocio";
  }

  return (
    <View
      className="flex-row items-center justify-between px-4 py-3 border-b"
      style={{
        backgroundColor: colors.headerBg,
        borderBottomColor: colors.border,
      }}
    >
      {/* Lado izquierdo: flecha o icono Tienda */}
      {useBackArrow ? (
        <Pressable onPress={() => navigation.goBack()}>
          <Volver
            width={24}
            height={24}
            stroke={colors.textDefault} // gris oscuro
          />
        </Pressable>
      ) : isSeller ? (
        <TiendaIcon width={24} height={24} fill={getColorByRole("seller", mode)} />
      ) : (
        <View style={{ width: 24 }} /> // placeholder
      )}

      {/* Título */}
      <Text
        className="text-lg font-Roboto-Bold"
        style={{ color: colors.textDefault }}
        numberOfLines={1} // evita que nombres largos se desborden
        ellipsizeMode="tail"
      >
        {displayTitle}
      </Text>

      {/* Lado derecho: icono Monedas + cantidad d créditos para seller */}
      {isSeller ? (
        <View className="flex-row items-center">
          <Monedas
            width={20}
            height={20}
            fill={getColorByRole("seller", mode)}
          />
          <Text
            className="ml-2 font-Roboto-Medium"
            style={{ color: colors.textDefault }}
          >
            {user.credits ?? 0}
          </Text>
        </View>
      ) : (
        <View style={{ width: 44 }} /> // placeholder para alinear con icono Monedas
      )}
    </View>
  );
}
