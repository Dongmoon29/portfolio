'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { THEMES, STORAGE_KEYS } from '@/utils/constants';

type Theme = typeof THEMES.LIGHT | typeof THEMES.DARK;

type ThemeContextType = {
  theme: Theme;
  handleThemeToggle: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES.LIGHT,
  handleThemeToggle: (theme: Theme) => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(THEMES.DARK);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    const validTheme =
      storedTheme && Object.values(THEMES).includes(storedTheme)
        ? storedTheme
        : THEMES.LIGHT;
    setTheme(validTheme);
  }, []);

  const handleThemeToggle = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
