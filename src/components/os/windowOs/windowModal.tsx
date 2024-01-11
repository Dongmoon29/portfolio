import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  const handleContentClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <dialog
      ref={dialogRef}
      className="relative bg-transparent backdrop:backdrop-blur-sm w-1/2 h-1/2"
      onClick={handleOverlayClick}>
      <div
        onClick={handleContentClick}
        className="gap-20 text-black p-5 sm:p-20 absolute flex flex-col items-center w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-100  rounded-xl shadow">
        <div>Search Component will be here</div>
        <div className="flex flex-col items-start w-full gap-10 px-10 md:px-20">
          <h1 className="font-semibold text-xl">Links</h1>
          <nav className="flex w-full">
            <ul className="flex flex-col sm:flex-row flex-wrap items-center w-full gap-3">
              <li className="w-1/2 gap-2 flex items-center">
                <Image
                  src="/svgs/profile_4.svg"
                  width={30}
                  height={30}
                  priority
                  alt="profile.svg"
                />
                <Link href="/introduction">introduction</Link>
              </li>
              <li className="w-1/2 gap-2 flex items-center justify-center">
                <Image
                  src="/svgs/aboutme.svg"
                  width={30}
                  height={30}
                  priority
                  alt="profile.svg"
                />
                <Link href="/about">About me</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </dialog>
  );
};
