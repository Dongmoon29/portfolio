'use client';

import Link from 'next/link';
import Navbar from './navbar';
import ThemeToggleSwitch from './themeToggle';
import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const Header = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <header className="stext-sm flex justify-between items-center px-5 py-2 lg:py-0 bg-transparent">
      <Link href="/">
        <div className="flex items-center">
          <div className="avatar">
            <div className="rounded-full w-6 md:w-8">
              <Image src={'/profile.jpeg'} width={20} height={20} alt="Logo" />
            </div>
          </div>
          <span
            className={`hidden sm:inline text-xl ${
              theme === 'light' ? 'text-gray-700' : 'text-white'
            } ml-5`}>
            {'Dongmoon Kim'}
          </span>
        </div>
      </Link>
      <div className="flex justify-center items-center gap-5">
        <Navbar />
        <ThemeToggleSwitch />
      </div>
    </header>
  );
};

export default Header;
