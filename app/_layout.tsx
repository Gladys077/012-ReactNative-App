import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import "./global.css";

SplashScreen.preventAutoHideAsync(); // evita que la pantalla de presentación se cierre automáticamente, lo que te da tiempo para cargar activos en segundo plano o preparar la interfaz antes de que el usuario vea la aplicación principal. 

// StatusBar que respeta el tema
function ThemedStatusBar() {
  const { mode } = useTheme();
  return (
    <StatusBar 
      style={mode === "dark" ? "light" : "dark"}
      backgroundColor="transparent"
      translucent
  />
  );
}

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require('../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Bold": require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Medium": require('../assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Black": require('../assets/fonts/Roboto-Black.ttf'),
  });
  
  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
      SplashScreen.hideAsync(); // Hide splash even on error
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  
  return (
    <ThemeProvider> 
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemedStatusBar />
          <Slot/>
        </GestureHandlerRootView>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default RootLayout;

// ThemeProvider: Componente que proporciona el contexto del tema (claro/oscuro) a toda la aplicación.
// AuthProvider: Componente que proporciona el contexto de autenticación a toda la aplicación.
// GestureHandlerRootView: Componente necesario para que react-native-gesture-handler funcione correctamente.
// ThemedStatusBar: Componente que ajusta el estilo de la barra de estado según el tema actual.
// Slot: Componente de expo-router que representa la ubicación donde se renderizarán las rutas hijas.