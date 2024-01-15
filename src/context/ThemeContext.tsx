'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  handleThemeToggle: (theme: 'light' | 'dark') => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  handleThemeToggle: (theme: 'light' | 'dark') => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('theme') ?? 'light';
    setTheme(storedTheme as 'light' | 'dark');
  }, []);

  const handleThemeToggle = (theme: 'light' | 'dark') => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  if (!isMounted) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
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
    throw new Error('useThemeContext must be used within a VscodeProvider');
  }
  return context;
};
