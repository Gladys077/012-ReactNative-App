import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import "./global.css";

SplashScreen.preventAutoHideAsync(); //evita que el splash screen (pantalla de carga inicial) desaparezca automáticamente

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts ({ //aquí desestructuramos una variable 'fontsLoaded' y otra "error" por si hubiera errores en la carga 
    "WorkSans-Black": require('../assets/fonts/WorkSans-Black.ttf'), 
    "WorkSans-Light": require('../assets/fonts/WorkSans-Light.ttf'), 
    "WorkSans-Medium": require('../assets/fonts/WorkSans-Medium.ttf')
  })
  

  useEffect(() => {
    if(error) throw error;
  
    if(fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null;
  
  return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <StatusBar style="dark" /> */}
            <Slot />
        </GestureHandlerRootView>

    
  );
  
}

export default RootLayout