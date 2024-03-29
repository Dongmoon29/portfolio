'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from './windowModal';
import Link from 'next/link';
import { useThemeContext } from '@/context/ThemeContext';
import { Tooltip } from '@/components/tooltip';

export const WindowMenuBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, handleThemeToggle } = useThemeContext();

  const newTheme = theme === 'dark' ? 'light' : 'dark';

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="h-10 w-full bg-gray-300 flex justify-center items-center gap-6">
      <button
        role="button"
        className="hover:scale-110 transition duration-200 ease-in-out cursor-pointer"
        onClick={openModal}>
        <Image src={'/svgs/windows.svg'} width={30} height={30} alt="icon" />
      </button>
      <Tooltip title="Working on progress.." direction="top">
        <div className="hover:scale-110 transition duration-200 ease-in-out cursor-pointer">
          <Image
            src={'/svgs/translation.svg'}
            width={30}
            height={30}
            alt="icon"
          />
        </div>
      </Tooltip>
      <Tooltip title="Working on progress.." direction="top">
        <div className="hover:scale-110 transition duration-200 ease-in-out cursor-pointer">
          <Image src={'/svgs/email.svg'} width={30} height={30} alt="icon" />
        </div>
      </Tooltip>

      {modalOpen && <Modal isOpen={modalOpen} onClose={closeModal} />}
    </div>
  );
};
