import { useNavigation } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontSizes } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";
import { Carrito, Monedas, TiendaIcon, Volver } from "../icons";

type HeaderProps = {
  title?: string;
  showBackArrow?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  variant?: "buyer" | "seller" | "neutral";
  credits?: number;
};

export default function Header({
  title,
  showBackArrow,
  variant = "neutral",
  credits,
  leftContent,
  rightContent,
}: HeaderProps) {
  const { colors, fonts } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={["left", "right"]}>
      <View
        style={{
          backgroundColor: colors.headerFooterBg,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          minHeight: 56,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        {/* LADO IZQUIERDO */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            gap: 12,
          }}
        >
          {/* Contenido personalizado */}
          {leftContent ? (
            leftContent
          ) : showBackArrow ? (
            /* Flecha Volver */
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ padding: 8 }}
            >
              <Volver width={24} height={24} fill={colors.textDefault} />
            </Pressable>
          ) : (
            /* Iconos de rol (solo si no hay flecha) */
            <>
              {variant === "seller" && (
                <TiendaIcon
                  width={28}
                  height={28}
                  fill={colors.brandSeller}
                  // stroke={colors.textDefault}
                />
              )}
              {variant === "buyer" && (
                <Carrito
                  width={24}
                  height={24}
                  fill={colors.brandBuyer}
                  // stroke={colors.textDefault}
                />
              )}
            </>
          )}

          <Text
            style={{
              fontSize: FontSizes.md,
              fontFamily: fonts.robotoMedium,
              color: colors.textDefault,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        {/* LADO DERECHO */}
        <View style={{ marginLeft: 16 }}>
          {/* Contenido personalizado */}
          {rightContent ? (
            rightContent
          ) : variant === "seller" ? (
            /* Monedas automáticas para vendedor */
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Monedas
                width={24}
                height={24}
                fill={colors.brandSeller}
                strokeColor={colors.background}
              />
              <Text
                style={{
                  fontSize: FontSizes.md,
                  fontFamily: fonts.robotoMedium,
                  color: colors.textDefault,
                }}
              >
                {credits ?? 0} {/* Si credits es undefined, se mostrará 0 */}
              </Text>
            </View>
          ) : (
            /* Placeholder para mantener equilibrio visual si no hay nada */
            <View style={{ width: 24 }} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
