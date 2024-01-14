'use client';

import { FC, useState } from 'react';
import { OsxWindowHeader } from '../../os/macOs/osxWindowHeader';
import { useVscodeContext } from '@/context/VscodeContext';
import { VsCodeBuffers } from './vscodeBuffers';
import { VsCodeEditorArea } from './vscodeEditorArea';
import { VscodeSidebar } from './sidebar/vscodeSidebar';
import { useOsContext } from '@/context/OsContext';
import Image from 'next/image';
import { useThemeContext } from '@/context/ThemeContext';
import { FaRegCopy } from 'react-icons/fa';
import { WindowHeader } from '@/components/os/windowOs/windowHeader';

type VsCodeComponentProps = {
  toggleMaximize?: () => void;
};

const VsCodeComponent: FC<VsCodeComponentProps> = ({ toggleMaximize }) => {
  const { state } = useVscodeContext();
  const { os } = useOsContext();
  const { theme } = useThemeContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMaximize, setIsMaximize] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col ${
        theme === 'dark' ? 'text-white' : 'text-black'
      } rounded-xl ${isMaximize ? 'h-screen w-screen' : 'h-full w-full'}`}>
      {os === 'MacOs' ? (
        <OsxWindowHeader title="editor" />
      ) : (
        <WindowHeader
          toggleMaximize={toggleMaximize}
          title="editor"
          icon={
            <Image
              src={'/svgs/vscode.svg'}
              width={16}
              height={16}
              priority
              alt="vscode"
            />
          }
        />
      )}
      <div className="flex flex-col h-full w-full text-xs md:text-sm">
        <div className="flex flex-1 rounded-br-xl">
          <div
            className={`hidden sm:flex flex-col p-5 ${
              theme === 'dark'
                ? 'bg-gray-600 text-gray-300'
                : 'bg-gray-950 text-gray-200'
            } rounded-bl-xl `}>
            <div
              className={`text-xl cursor-pointer hover:${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-100'
              }`}
              onClick={toggleSidebar}>
              <FaRegCopy />
            </div>
          </div>
          {isSidebarOpen ? (
            <VscodeSidebar toggleSidebar={toggleSidebar} />
          ) : null}
          <div
            className={`flex flex-col flex-1 w-full ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
            <VsCodeBuffers />
            <VsCodeEditorArea content={state.currentFile?.content ?? ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VsCodeComponent;
