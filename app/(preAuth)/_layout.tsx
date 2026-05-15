import "react-native-reanimated";

import { Routes } from "@/constants/Routes";
import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  Slot,
  useLocalSearchParams,
  useRouter,
  useSegments,
} from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../../components/UI/Header";

export default function PreAuthLayout() {
  const { colors } = useTheme();
  const segments = useSegments();

  const currentPage = segments[segments.length - 1] as string;

  const router = useRouter();
  const { origin } = useLocalSearchParams();

  const getTitleByPage = () => {
    switch (currentPage) {
      case "registro":
        return "Registro";
      case "elegirRol":
        return "Bienvenido";
      case "perfil":
        return "Perfil";
      case "cambiarContrasena":
        return "Cambiar Contraseña";
      case "olvideContrasena":
        return "Recuperar Contraseña";
      case "terms":
        return "Términos y condiciones";
      case "privacidad":
        return "Política de privacidad";
      case "FAQ":
        return "Preguntas frecuentes (FAQ)";
      default:
        return "";
    }
  };

  const handleGoBack = () => {
    switch (origin) {
      case "comprador-ajustes":
        router.replace(Routes.comprador.ajustes);
        return;

      case "vendedor-ajustes":
        router.replace(Routes.vendedor.ajustes);
        return;

      default:
        router.back();
    }
  };

  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <Header
            showBackArrow
            title={getTitleByPage()}
            onBack={handleGoBack}
          />

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
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
}
