'use client';

import { useOsContext } from '@/context/OsContext';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const osS = ['MacOs', 'Window'];

export const BootLoader = () => {
  const { os: storedOs, handleOsToggle } = useOsContext();
  const [currentSelectedOs, setCurrentSelectedOs] = useState<
    'MacOs' | 'Window'
  >(storedOs);
  useHotkeys('keyup, keydown', () => {
    if (currentSelectedOs === 'MacOs') {
      setCurrentSelectedOs('Window');
    } else {
      setCurrentSelectedOs('MacOs');
    }
  });

  useHotkeys('enter', () => {
    handleOsToggle(currentSelectedOs);
    window.location.href = '/introduction';
  });

  return (
    <div className="bg-black text-white font-mono text-xl w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-center">Bootloader</h1>
      <div className="p-4 w-3/4 h-3/4 border-4 border-white flex flex-col justify-between">
        <ul className="space-y-2">
          {osS.map((os, index) => {
            return (
              <li
                onMouseEnter={() => handleOsToggle(os as 'Window' | 'MacOs')}
                onClick={() => {
                  window.location.href = '/introduction';
                }}
                key={`OS_${index}`}
                className={`cursor-pointer hover:bg-gray-700 p-2 ${
                  currentSelectedOs === os ? 'bg-gray-700' : ''
                }`}>
                {os}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-gray-500">
          Use the ↑ and ↓ keys to select which entry is highlighted. Press enter
          to boot the selected OS, &apos;e&apos; to edit the commands before
          booting or &apos;c&apos; for a command-line.
        </p>
      </div>
    </div>
  );
};
