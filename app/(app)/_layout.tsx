import { useTheme } from "@/context/ThemeContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

function ThemedStatusBar() {
  const { mode } = useTheme();
  return (
    <StatusBar translucent backgroundColor="transparent" style={mode === "dark" ? "light" : "dark"} />
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