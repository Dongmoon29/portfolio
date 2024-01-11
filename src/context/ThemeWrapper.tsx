'use client';
import { ReactNode, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return <div data-theme={theme}>{children}</div>;
};

export default ThemeWrapper;
