import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Carrito, TiendaIcon } from "../../components/icons";
import RoleButton from "../../components/UI/Button/RolButton";
import { Spacing } from "../../constants/Tokens";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function ElegirRolScreen() {
  const { colors, fonts } = useTheme();
  const { switchRole } = useAuthContext();
  const router = useRouter();

  const handleSelectRole = (role: "buyer" | "seller") => {
    // Actualiza el contexto global antes de navegar
    switchRole(role);

    // Redirige según el rol
    if (role === "buyer") {
      router.push("/comprador/nuevoPedido" as any);
    } else {
      router.push("/vendedor/homeVendedor" as any);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Spacing.lg,
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.xl,
            marginTop: Spacing.lg,
            paddingTop: Spacing.xxl,
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {/* Logo Section */}
          <View
            style={{
              alignItems: "center",
              marginBottom: Spacing.xxl,
              marginTop: Spacing.xxl,
            }}
          >
            <View
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                backgroundColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: Spacing.xxl,
              }}
            >
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: colors.background,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.textMuted,
                    fontFamily: fonts.robotoBold,
                    fontSize: 14,
                  }}
                >
                  LOGO
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: colors.textDefault,
                fontSize: 24,
                fontFamily: fonts.robotoBold,
                marginTop: Spacing.md,
                marginBottom: Spacing.sm,
              }}
            >
              ¡Hola! 👋
            </Text>

            <Text style={{ color: colors.textMuted, fontSize: 14 }}>
              ¿Cómo deseas comenzar?
            </Text>
          </View>

          {/* Btns Roles */}
          <View style={{ gap: Spacing.lg }}>
            <RoleButton
              section="buyer"
              icon={Carrito}
              title="Comprador"
              subtitle="Haz tu pedido y elige la mejor opción"
              onPress={() => handleSelectRole("buyer")}
            />

            <RoleButton
              section="seller"
              icon={TiendaIcon}
              title="Vendedor"
              subtitle="Pasa presupuestos y vende ahora"
              onPress={() => handleSelectRole("seller")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
