'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

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

  if (!isMounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
