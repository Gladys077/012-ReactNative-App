import "react-native-reanimated"; // 👈 MUY IMPORTANTE (PRIMERA LÍNEA)

import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { Slot, useSegments } from "expo-router";
import { View } from "react-native";
import Header from "../../components/UI/Header";

import { GestureHandlerRootView } from "react-native-gesture-handler"; // 👈 NUEVO

export default function PreAuthLayout() {
  const { colors } = useTheme();
  const segments = useSegments();

  const currentPage = segments[segments.length - 1] as string;

  const getTitleByPage = () => {
    switch (currentPage) {
      case "registro":
        return "Registro";
      case "perfil":
        return "Perfil";
      case "cambiarContrasena":
        return "Cambiar Contraseña";
      case "olvideContrasena":
        return "Recuperar Contraseña";
      default:
        return "";
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {" "}
      {/* 👈 CLAVE */}
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Header showBackArrow title={getTitleByPage()} />

        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.xl,
            maxWidth: 500,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Slot />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
