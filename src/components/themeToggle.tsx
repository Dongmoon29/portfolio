'use client';

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggleSwitch = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    setTheme(prefersDarkMode ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('class', theme);
  }, [theme]);

  const handleThemeToggle = (event: any) => {
    if (event.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center cursor-pointer gap-1 mr-3 lg:mr-6">
        <FaSun className="text-yellow-300 dark:text-white" />
        <input
          type="checkbox"
          value="synthwave"
          checked={theme === 'dark'}
          className="toggle theme-controller text-yellow-300 dark:text-white"
          onChange={handleThemeToggle}
        />
        <FaMoon className="text-yellow-300 dark:text-white" />
      </div>
    </div>
  );
};

export default ThemeToggleSwitch;
