'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useThemeContext } from '@/context/ThemeContext';
import { Console } from '@/components/introduction/console';
import { useOsContext } from '@/context/OsContext';
import { OsxMenuBar } from '@/components/os/macOs/osxMenuBar';
import { WindowMenuBar } from '@/components/os/windowOs/windowMenuBar';

const profileImages = ['/profile-removebg-preview.png', '/profile_2.png'];

const Intruduction = () => {
  const [profileImageIndex, setProfileImageIndex] = useState(0);
  const { theme } = useThemeContext();
  const { os } = useOsContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setProfileImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`flex-col pb-32 sm:pt-10 lg:pb-10 sm:gap-9 md:gap-9 lg:gap-14 flex items-center max-h-screen h-screen bg-gradient-to-r ${
        theme === 'light'
          ? ' from-sky-200 to-sky-500'
          : 'from-sky-950 to-orange-900'
      } overflow-hidden ${os === 'MacOs' ? '' : 'pt-20'}`}
      id="introduction">
      {os === 'MacOs' ? <OsxMenuBar /> : null}
      <div
        className={
          'flex-col lg:flex-row gap-5 flex justify-center items-center'
        }>
        <div
          className={`bg-gradient-to-r ${
            theme === 'light'
              ? 'from-yellow-100 to-pink-200'
              : 'from-orange-300 to-orange-900'
          } rounded-full lg:mr-5`}>
          <div className="w-60">
            <Image
              src={profileImages[profileImageIndex]}
              width={400}
              height={400}
              alt="profile picture"
              priority
            />
          </div>
        </div>
        <div
          className={`p-10 flex-col sm:w-3/6 w-full ${
            theme === 'dark' ? 'text-white' : 'text-gray-600'
          } `}>
          <h1 className="text-center text-sm lg:text-3xl font-bold mb-3 lg:mb-10">
            Hi, I&apos;m Dongmoon Software dev
          </h1>
          <p className="text-sm ">
            Welcome! I&apos;m Dongmoon, a software developer with a flair for
            creating intuitive web experiences. Dive into my portfolio to
            uncover the secrets behind my code and the passion in my projects.
            Ready for a journey of discovery?
          </p>
        </div>
      </div>
      <Console />
      {os === 'Window' && (
        <div className="absolute bottom-0 left-0 w-full flex items-center justify-center">
          <WindowMenuBar />
        </div>
      )}
    </section>
  );
};

export default Intruduction;
