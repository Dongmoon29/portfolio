'use client';

import Image from 'next/image';
import Console from './console';
import { useEffect, useState } from 'react';

const profileImages = ['/profile-removebg-preview.png', '/profile_2.png'];

const Intruduction = () => {
  const [profileImageIndex, setProfileImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfileImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={
        'relative flex-col gap-3 flex items-center justify-center max-h-screen h-screen'
      }>
      <div
        className={
          'flex-col lg:flex-row gap-5 flex justify-center items-center mb-10'
        }>
        <div
          className={
            'bg-gradient-to-r from-yellow-100 to-pink-200 dark:from-orange-300 dark:to-orange-900 rounded-full mr-5'
          }>
          <Image
            className="w-48 lg:w-96"
            src={profileImages[profileImageIndex]}
            width={600}
            height={600}
            alt="profile picture"
          />
        </div>
        <div className="p-1 flex-col w-80 lg:w-96 dark:text-white text-gray-600">
          <h1 className="text-sm lg:text-3xl font-bold mb-3 lg:mb-10">
            Hi, I&apos;m Dongmoon Software dev
          </h1>
          <p className="text-sm">
            Welcome! I&apos;m Dongmoon, a software developer specializing in
            crafting intuitive web experiences. Explore my work and the code
            behind it.
          </p>
        </div>
      </div>
      <Console />
    </div>
  );
};

export default Intruduction;
