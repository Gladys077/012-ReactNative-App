import { Colors } from '@/constants/Colors';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Appearance, AppearancePreferences } from 'react-native';

// Fuentes
const fonts = {
  robotoRegular: 'Roboto_400Regular',
  robotoBold: 'Roboto_700Bold',
  robotoMedium: 'Roboto_500Medium',
  robotoLight: 'Roboto_300Light',
};

type ThemeMode = 'light' | 'dark';

interface Theme {
  colors: typeof Colors.light;
  fonts: typeof fonts;
}

interface ThemeContextType extends Theme {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemPref = (Appearance.getColorScheme() as ThemeMode) || 'light';
  const [mode, setMode] = useState<ThemeMode>(systemPref);

  // Listener para cambios de modo en tiempo real
  useEffect(() => {
    const listener = ({ colorScheme }: AppearancePreferences) => {
      setMode((colorScheme as ThemeMode) || 'light');
    };
    const subscription = Appearance.addChangeListener(listener);

    return () => subscription.remove();
  }, []);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextType = {
    mode,
    setMode,
    toggleMode,
    colors: Colors[mode],
    fonts,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  return context;
};
