import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, LightTheme, DarkTheme } from '../theme';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';
import { createColorSchemeTheme } from '../theme/colorSchemes';

type ThemeMode = 'light' | 'dark' | 'system';
type ColorSchemeId = 'sunset-orange' | 'royal-purple' | 'ocean-blue' | 'forest-green' | 'rose-pink' | 'teal-breeze';

interface ThemeContextType {
  theme: LightTheme | DarkTheme;
  themeMode: ThemeMode;
  colorScheme: ColorSchemeId;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setColorScheme: (scheme: ColorSchemeId) => Promise<void>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [colorScheme, setColorSchemeState] = useState<ColorSchemeId>('sunset-orange');
  // Initialize with system preference immediately
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await storage.getItem(STORAGE_KEYS.THEME);
      const savedColorScheme = await storage.getItem(STORAGE_KEYS.COLOR_SCHEME);
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        setThemeModeState(savedTheme as ThemeMode);
        // Update isDark immediately based on saved preference
        if (savedTheme === 'light') {
          setIsDark(false);
        } else if (savedTheme === 'dark') {
          setIsDark(true);
        } else {
          setIsDark(systemColorScheme === 'dark');
        }
      }
      
      if (savedColorScheme && [
        'sunset-orange',
        'royal-purple',
        'ocean-blue',
        'forest-green',
        'rose-pink',
        'teal-breeze'
      ].includes(savedColorScheme)) {
        setColorSchemeState(savedColorScheme as ColorSchemeId);
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  // Determine if dark mode based on theme mode and system preference
  useEffect(() => {
    if (themeMode === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(themeMode === 'dark');
    }
  }, [themeMode, systemColorScheme]);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await storage.setItem(STORAGE_KEYS.THEME, mode);
  };

  const setColorScheme = async (scheme: ColorSchemeId) => {
    setColorSchemeState(scheme);
    await storage.setItem(STORAGE_KEYS.COLOR_SCHEME, scheme);
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  const baseTheme = isDark ? darkTheme : lightTheme;
  
  // Apply color scheme to theme
  const theme = useMemo(() => {
    return createColorSchemeTheme(baseTheme, colorScheme);
  }, [baseTheme, colorScheme, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, colorScheme, isDark, setThemeMode, setColorScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

