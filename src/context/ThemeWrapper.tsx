'use client';
import { ReactNode, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      data-theme={theme}
      className={`bg-gradient-to-r ${
        theme === 'light'
          ? ' from-sky-200 to-sky-500'
          : 'from-sky-950 to-orange-900'
      }`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
