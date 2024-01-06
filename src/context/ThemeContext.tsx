'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  handleThemeChange: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  handleThemeChange: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('theme') ?? 'light';
    setTheme(storedTheme as 'light' | 'dark');
  }, []);

  const handleThemeChange = () => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };
  if (!isMounted) return <div>loading...</div>;
  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
