import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthContext';
import "./global.css";

SplashScreen.preventAutoHideAsync(); //evita que el splash screen (pantalla de carga inicial) desaparezca automáticamente

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts ({ //aquí desestructuramos una variable 'fontsLoaded' y otra "error" por si hubiera errores en la carga 
    "Roboto-Regular": require('../assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Bold": require('../assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Medium": require('../assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Black": require('../assets/fonts/Roboto-Black.ttf'),
  })
  

  useEffect(() => {
    if(error) throw error;
  
    if(fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;
  
  return (
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="dark" />
            <Slot />
        </GestureHandlerRootView>
      </AuthProvider>
  );
}

export default RootLayout