'use client';
import { ReactNode } from 'react';
import { useThemeContext } from './ThemeContext';

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useThemeContext();
  return <div data-theme={theme}>{children}</div>;
};

export default ThemeWrapper;
