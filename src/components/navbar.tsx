'use client';

import { FaHome, FaInfoCircle, FaBuilding, FaPhone } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import Image from 'next/image';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
      <div className="flex justify-center dropdown dropdown-left sm:hidden">
        <div className="flex none">
          <div tabIndex={0} role="button">
            <GiHamburgerMenu />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 flex justify-center">
          <li>
            <Link className="py-2" href="/">
              <div className="flex gap-2 rounded-full p-2">
                <FaHome className="text-sm lg:text-3xl" />
                <p>Home</p>
              </div>
            </Link>
          </li>
          <li>
            <Link className="py-2" href="#about">
              <div className="flex gap-2 rounded-full p-2">
                <FaInfoCircle className="text-xl lg:text-3xl" />
                <p>About me</p>
              </div>
            </Link>
          </li>
          <li>
            <Link className="py-2" href="#works">
              <div className="flex gap-2 rounded-full p-2">
                <FaBuilding className="text-xl lg:text-3xl" />
                <p>Works</p>
              </div>
            </Link>
          </li>
          <li>
            <Link className="py-2" href="#contact">
              <div className="flex gap-2 rounded-full p-2">
                <FaPhone className="text-xl lg:text-3xl" />
                <p>Contact me</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="hidden sm:flex justify-center items-center gap-2">
        <Link className="py-2" href="#about">
          <div className="rounded-full hover:scale-150 transition-transform p-2">
            <FaInfoCircle className="text-sm lg:text-lg" />
          </div>
        </Link>
        <Link className="py-2" href="#works">
          <div className="rounded-full hover:scale-150 transition-transform p-2">
            <FaBuilding className="text-sm lg:text-lg" />
          </div>
        </Link>
        <Link className="py-2" href="#contact">
          <div className="rounded-full hover:scale-150 transition-transform p-2">
            <FaPhone className="text-sm lg:text-lg" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
