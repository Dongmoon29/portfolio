'use client';

import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggleSwitch = () => {
  const { theme, handleThemeToggle } = useContext(ThemeContext);
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center cursor-pointer gap-1 mr-3 lg:mr-6">
        <FaSun
          className={theme === 'light' ? 'text-yellow-300' : 'text-white'}
        />
        <input
          type="checkbox"
          value="synthwave"
          checked={theme === 'dark'}
          className={`toggle theme-controller ${
            theme === 'light' ? 'text-yellow-300' : 'text-white'
          }`}
          onChange={() =>
            handleThemeToggle(theme === 'light' ? 'dark' : 'light')
          }
        />
        <FaMoon
          className={theme === 'light' ? 'text-yellow-300' : 'text-white'}
        />
      </div>
    </div>
  );
};

export default ThemeToggleSwitch;
