'use client';

import { ThemeContext } from '@/context/ThemeContext';
import Link from 'next/link';
import { useContext } from 'react';
import { FaApple } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';
import { IoMdMoon } from 'react-icons/io';

export const OsxMenuBar = () => {
  const { theme, handleThemeToggle } = useContext(ThemeContext);
  return (
    <div
      className={`flex items-center ${
        theme === 'dark' ? 'bg-gray-400' : 'bg-gray-200'
      } text-black w-full px-3 py-1`}>
      <div className="mr-5">
        <FaApple />
      </div>
      <div className="flex gap-5">
        <div>
          <span className="font-semibold">Dongmoon Kim</span>
        </div>
        <div>
          <ul className="flex gap-3">
            <li>
              <Link href={'/introduction'}>Instroduction</Link>
            </li>
            <li>
              <Link href={'/about'}>About</Link>
            </li>
          </ul>
        </div>
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
