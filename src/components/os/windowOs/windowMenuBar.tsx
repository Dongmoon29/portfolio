'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from './windowModal';

export const WindowMenuBar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-5 absolute bottom-0 left-0 w-full h-6 bg-gray-300 flex justify-center items-center gap-6">
      <button
        role="button"
        className="hover:scale-110 transition duration-200 ease-in-out cursor-pointer"
        onClick={openModal}>
        <Image src={'/svgs/windows.svg'} width={30} height={30} alt="icon" />
      </button>
      <div className="hover:scale-110 transition duration-200 ease-in-out cursor-pointer">
        <Image
          src={'/svgs/translation.svg'}
          width={30}
          height={30}
          alt="icon"
        />
      </div>
      <div className="hover:scale-110 transition duration-200 ease-in-out cursor-pointer">
        <Image src={'/svgs/email.svg'} width={30} height={30} alt="icon" />
      </div>
      <div className="hover:scale-110 transition duration-200 ease-in-out cursor-pointer">
        <Image src={'/svgs/resume.svg'} width={30} height={30} alt="icon" />
      </div>

      {modalOpen && <Modal isOpen={modalOpen} onClose={closeModal} />}
    </div>
  );
};
