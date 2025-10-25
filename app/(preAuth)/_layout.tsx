import { Spacing } from "@/constants/Tokens";
import { useTheme } from "@/context/ThemeContext";
import { Slot, useSegments } from "expo-router";
import { View } from "react-native";
import Header from "../../components/UI/Header";

export default function PreAuthLayout() {
  const { colors } = useTheme();
  const segments = useSegments(); // Obtiene la ruta actual como array
  
  const currentPage = segments[segments.length - 1] as string; // extrae el último segmento (nombre de la screen)
  
  const getTitleByPage = () => {
    switch (currentPage) {
      case 'registro': 
        return 'Registro';
      case 'perfil': 
        return 'Perfil';
      case 'olvideContrasena': 
        return 'Recuperar Contraseña';
      default: 
        return '';
    }
  };
  
  return (
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
  );
}