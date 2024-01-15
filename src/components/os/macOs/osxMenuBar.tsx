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
      } text-black w-full px-3 py-1 text-xs sm:text-lg`}>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="mr-5">
          <FaApple />
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-5 shadow bg-gray-300 rounded-box w-52">
          <li onClick={() => handleOsToggle(newOs)}>
            <a>Change to {newOs}</a>
          </li>
        </ul>
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
