'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaBuilding,
  FaHome,
  FaInfoCircle,
  FaMoon,
  FaPhone,
  FaSun,
} from 'react-icons/fa';
import Navbar from './navbar';

const Header = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
    <header className="sticky top-0 z-50 text-sm flex justify-between p-5">
      <Navbar />
      <div className="flex items-center">
        <div className="flex items-center justify-center cursor-pointer gap-1 mr-3 lg:mr-6">
          <FaSun className="text-yellow-300 dark:text-white" />
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller text-yellow-300 dark:text-white"
            onChange={handleThemeToggle}
          />
          <FaMoon className="text-yellow-300 dark:text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
