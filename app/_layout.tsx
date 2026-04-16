import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ModalComponent from "../components/UI/ModalComponent";

SplashScreen.preventAutoHideAsync();

// StatusBar que respeta el tema
function ThemedStatusBar() {
  const { mode, colors } = useTheme();

  useEffect(() => {
    const setColors = async () => {
      try {
        // Controla el color de fondo del sistema (edge-to-edge compatible)
        await SystemUI.setBackgroundColorAsync(colors.background);
      } catch (error) {
        console.warn("Error configurando SystemUI:", error);
      }
    };
    setColors();
  }, [mode, colors]);

  return (
    <StatusBar
      style={mode === "dark" ? "light" : "dark"}
      backgroundColor="transparent"
      translucent={true}
    />
  );
}

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),

    AlarmClock: require("../assets/fonts/AlarmClock.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Font loading error:", error);
      SplashScreen.hideAsync();
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  const AppContent = () => {
    const { colors } = useTheme();
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ModalProvider>
            <AuthProvider>
              <SafeAreaView
                style={{ flex: 1, backgroundColor: colors.background }}
              >
                <ThemedStatusBar />
                <ModalComponent />
                <Slot />
              </SafeAreaView>
            </AuthProvider>
          </ModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  };

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default RootLayout;
