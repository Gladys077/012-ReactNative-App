import { Colors } from "@/constants/Colors";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";

// Fuentes
const fonts = {
  robotoRegular: "Roboto-Regular",
  robotoBold: "Roboto-Bold",
  robotoMedium: "Roboto-Medium",
  robotoLight: "Roboto-Light",
};

type ThemeMode = "light" | "dark";

interface Theme {
  colors: (typeof Colors)["light" | "dark"];
  fonts: typeof fonts;
}

interface ThemeContextType extends Theme {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemPref = (Appearance.getColorScheme() as ThemeMode) || "light";
  const [mode, setMode] = useState<ThemeMode>(systemPref);

  // Listener para cambios de modo en tiempo real
  useEffect(() => {
    const listener = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      if (colorScheme) setMode(colorScheme as ThemeMode);
    };

    const subscription = Appearance.addChangeListener(listener);
    return () => subscription.remove();
  }, []);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    mode,
    setMode,
    toggleMode,
    colors: Colors[mode],
    fonts,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};
