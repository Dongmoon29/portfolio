'use client';

import { useOsContext } from '@/context/OsContext';
import { useThemeContext } from '@/context/ThemeContext';
import Link from 'next/link';
import { FaApple } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';
import { IoMdMoon } from 'react-icons/io';

export const OsxMenuBar = () => {
  const { theme, handleThemeToggle } = useThemeContext();
  const { os, handleOsToggle } = useOsContext();

  const newOs = os === 'MacOs' ? 'Window' : 'MacOs';

  return (
    <div
      className={`flex items-center ${
        theme === 'dark' ? 'bg-gray-400' : 'bg-gray-200'
      } text-black w-full px-3 py-2 text-xs sm:text-lg`}>
        <div tabIndex={0} role="button" className="mr-5">
          <FaApple />
        </div>
      {/* Toggle theme */}
      <div className="ml-auto cursor-pointer">
        {theme === 'dark' ? (
          <IoMdMoon onClick={() => handleThemeToggle('light')} />
        ) : (
          <IoMdSunny
            onClick={() => handleThemeToggle('dark')}
            className={`text-yellow-500`}
          />
        )}
      </div>
    </div>
  );
};
