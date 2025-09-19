import { useTheme } from "@/context/ThemeContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

function ThemedStatusBar() {
  const { mode, colors } = useTheme();

  return (
    <>
      {/* Fondo para StatusBar */}
      <View
        style={{
          height: 50, // o StatusBar.currentHeight
          backgroundColor: colors.background,
        }}
      />
      <StatusBar 
        style={mode === "dark" ? "light" : "dark"}
        translucent
      />
    </>
  );
}

export default function AppLayout() {
  const { colors } = useTheme(); 
  
  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ThemedStatusBar />

      <Slot />
    </View>
  );
}