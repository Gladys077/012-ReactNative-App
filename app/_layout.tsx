import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from 'react';
import { Platform, StatusBar as RNStatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from 'expo-status-bar';

import "./global.css";

SplashScreen.preventAutoHideAsync();

// StatusBar que respeta el tema
function ThemedStatusBar() {
  const { mode, colors } = useTheme();

  useEffect(() => {
    const setNavColor = async () => {
      try {
        // Definimos color de fondo del NavigationBar
        await NavigationBar.setBackgroundColorAsync(colors.headerFooterBg);

        // Ajuste del color de íconos según tema
        await NavigationBar.setButtonStyleAsync(mode === "dark" ? "light" : "dark");

        // Efecto suave (solo visual)
        // NavigationBar.setVisibilityAsync("visible");
      } catch (error) {
        console.warn("Error configurando NavigationBar:", error);
      }
    };

    // Ejecutar la función asíncrona; no devolver JSX desde useEffect
    setNavColor();
  }, [mode, colors]);

  return (
    <>
      {/* Fondo detrás del StatusBar */}
      {Platform.OS === 'android' && (
        <View
          style={{
            height: RNStatusBar.currentHeight,
            backgroundColor: colors.background,
          }}
        />
      )}
      <StatusBar
        style={mode === "dark" ? "light" : "dark"}
        translucent
      />
    </>
  );
}

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require('../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Bold": require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Medium": require('../assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Black": require('../assets/fonts/Roboto-Black.ttf'),

    "AlarmClock": require('../assets/fonts/AlarmClock.ttf'),

  });
  
  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      SplashScreen.hideAsync();
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <BottomSheetModalProvider>
            <ThemedStatusBar />
            <Slot />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
