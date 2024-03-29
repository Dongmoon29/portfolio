import { useOsContext } from '@/context/OsContext';
import { useThemeContext } from '@/context/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, useEffect, useRef } from 'react';

const fetchMediaContent = async () => {
  try {
    const res = await fetch(`/api/media?uri=resume.pdf`);
    if (!res.ok) {
      throw new Error(`Error fetching media content: ${res.statusText}`);
    }

    const blob = await res.blob();
    const uri = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = uri;
    link.download = 'Dongmoon_Kim_Software_Developer.pdf';
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(uri);
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
  }
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { os, handleOsToggle } = useOsContext();
  const { theme, handleThemeToggle } = useThemeContext();
  const pathname = usePathname();

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
      className="overflow-auto bg-transparent backdrop:backdrop-blur-sm w-1/2 h-1/2 flex justify-center items-center"
      onClick={handleOverlayClick}>
      <div
        onClick={handleContentClick}
        className="bg-gray-100 gap-20 text-black py-5 xl:p-10 absolute flex flex-col items-center w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto">
        <div className="flex flex-col w-full gap-10 px-10 md:px-20">
          <div className="flex flex-col text-lg font-bold">Options</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 gap-3 text-xs">
            <div
              className={`flex flex-col items-center md:justify-left gap-2 cursor-pointer`}
              onClick={() =>
                handleOsToggle(os === 'MacOs' ? 'Window' : 'MacOs')
              }>
              <Image
                src={os === 'MacOs' ? '/svgs/windows.svg' : '/svgs/macos.svg'}
                width={32}
                height={32}
                alt={'icon'}
              />
              <span className="text-center">{'Change OS'}</span>
            </div>
            <div
              className={`flex flex-col items-center md:justify-left  gap-2 cursor-pointer`}
              onClick={() =>
                handleThemeToggle(theme === 'dark' ? 'light' : 'dark')
              }>
              <Image
                src={theme === 'dark' ? '/svgs/sun.svg' : '/svgs/moon.svg'}
                width={32}
                height={32}
                alt={'icon'}
              />
              <span className="text-center">Change theme</span>
            </div>
            <div
              className={`flex flex-col items-center md:justify-left gap-2 cursor-pointer`}
              onClick={() => fetchMediaContent()}>
              <Image
                src={'/svgs/resume.svg'}
                width={32}
                height={32}
                alt={'icon'}
              />
              <span className="text-center">Resume</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-10 px-10 md:px-20">
          <div className="flex flex-col text-lg font-bold">Links</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 gap-3 text-xs">
            <Link
              className={`flex flex-col items-center md:justify-left gap-2 cursor-pointer`}
              href="/introduction">
              <div className="relative">
                {pathname === '/introduction' && (
                  <Image
                    src={'/svgs/star.svg'}
                    width={10}
                    height="10"
                    alt="icon"
                    className="absolute -top-0 -right-0 md:-right-3 md:-top-3 text-white w-3 h-3"
                  />
                )}
                <Image
                  src={'/svgs/hello.svg'}
                  width={32}
                  height={32}
                  alt={'icon'}
                />
              </div>
              <span>Greeting</span>
            </Link>
            <Link
              className={`flex flex-col items-center md:justify-left gap-2 cursor-pointer`}
              href="/about">
              <div className="relative">
                {pathname === '/about' && (
                  <Image
                    src={'/svgs/star.svg'}
                    width={10}
                    height="10"
                    alt="icon"
                    className="absolute -top-0 -right-0 md:-right-3 md:-top-3 text-white w-3 h-3"
                  />
                )}
                <Image
                  src={'/svgs/about.svg'}
                  width={32}
                  height={32}
                  alt={'icon'}
                />
              </div>
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </dialog>
  );
};
