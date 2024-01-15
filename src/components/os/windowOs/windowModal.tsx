import { useOsContext } from '@/context/OsContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useRef } from 'react';

const fetchMediaContent = async () => {
  try {
    const res = await fetch(`/api/media?uri=resume.pdf`);
    if (!res.ok) {
      throw new Error(`Error fetching media content: ${res.statusText}`);
    }

    const blob = await res.blob();
    const uri = URL.createObjectURL(blob);

    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = uri;
    link.download = 'Dongmoon_Kim_Software_Developer.pdf';
    document.body.appendChild(link);
    link.click();

    // Clean up
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
      className="overflow-auto bg-transparent backdrop:backdrop-blur-sm w-1/2 h-1/2"
      onClick={handleOverlayClick}>
      <div
        onClick={handleContentClick}
        className="gap-20 text-black p-5 xl:p-20 absolute flex flex-col items-center justify-center w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500  rounded-xl shadow overflow-auto">
        <div className="flex flex-col items-start w-full gap-10 px-10 md:px-20">
          <h1 className="font-semibold text-xl">Recommend</h1>
          <nav className="flex w-full">
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full ">
              <li
                className="gap-2 flex items-center text-sm cursor-pointer"
                onClick={fetchMediaContent}>
                <Image
                  src="/svgs/resume.svg"
                  width={30}
                  height={30}
                  priority
                  alt="profile.svg"
                />
                <span>Download Resume</span>
              </li>
              <li className="gap-2 flex items-center text-sm cursor-pointer">
                <Image
                  src="/svgs/email.svg"
                  width={30}
                  height={30}
                  priority
                  alt="profile.svg"
                />
                <Link href="/about">Send email</Link>
              </li>
              <div className="dropdown dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="gap-2 flex justify-center items-center dropdown dropdown-bottom text-sm">
                  <Image
                    src={
                      os === 'Window' ? '/svgs/macos.svg' : '/svgs/windows.svg'
                    }
                    width={30}
                    height={30}
                    priority
                    alt="profile.svg"
                  />
                  {/* Change OS */}
                  Send email
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 rounded-box w-52">
                    <li
                      onClick={
                        os === 'MacOs'
                          ? () => handleOsToggle('Window')
                          : () => handleOsToggle('MacOs')
                      }>
                      <a>
                        {os === 'MacOs'
                          ? 'Change to Window'
                          : 'Change to MacOS'}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col items-stretch w-full gap-10 px-10 md:px-20">
          <h1 className="font-semibold text-xl">Links</h1>
          <nav className="flex w-full">
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
              <li className="gap-2 flex items-center justify-center">
                <Image
                  src="/svgs/profile_4.svg"
                  width={30}
                  height={30}
                  priority
                  alt="profile.svg"
                />
                <Link href="/introduction">introduction</Link>
              </li>
              <li className="gap-2 flex items-center justify-center">
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
