import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Carrito, TiendaIcon } from "../../components/icons";
import RoleButton from "../../components/UI/Button/RolButton";
import { Spacing } from "../../constants/Tokens";
import { useTheme } from "../../context/ThemeContext";

export default function ElegirRolScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleSelectRole = (role: "comprador" | "vendedor") => {
    // Redirige a la primera screen de cada rol
    if (role === "comprador") {
      router.push("./(comprador)/home");
    } else {
      router.push("./(vendedor)/home");
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
          <View style={{ alignItems: "center", marginBottom: Spacing.xxl, marginTop: Spacing.xxl  }}>
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
                    fontWeight: "bold",
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
                fontWeight: "bold",
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
              onPress={() => handleSelectRole('comprador')}
            />

            <RoleButton
              section="seller"
              icon={TiendaIcon}
              title="Vendedor"
              subtitle="Pasa presupuestos y vende ahora"
              onPress={() => handleSelectRole('vendedor')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
