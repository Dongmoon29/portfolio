'use client';

import { FC, MouseEvent, useState } from 'react';
import { OsxWindowHeader } from '../../os/macOs/osxWindowHeader';
import { useVscodeContext } from '@/context/VscodeContext';
import { VsCodeBuffers } from './vscodeBuffers';
import { VsCodeEditorArea } from './vscodeEditorArea';
import { VscodeSidebar } from './sidebar/vscodeSidebar';
import { useOsContext } from '@/context/OsContext';
import { useThemeContext } from '@/context/ThemeContext';
import { FaGithub, FaRegCopy } from 'react-icons/fa';
import Link from 'next/link';
import { Tooltip } from '@/components/tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { KEYBOARD_SHORTCUTS } from '@/utils/constants';

type VsCodeComponentProps = {
  toggleMaximize?: () => void;
  isMaximize: boolean;
};

const VsCodeComponent: FC<VsCodeComponentProps> = ({
  toggleMaximize,
  isMaximize,
}) => {
  const { state, dispatch } = useVscodeContext();
  const { os } = useOsContext();
  const { theme } = useThemeContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useHotkeys(
    KEYBOARD_SHORTCUTS.CLOSE_TAB,
    () => {
      if (!state.currentFile) {
        return;
      }
      dispatch({
        type: 'DELETE_BUFFER',
        payload: { id: state.currentFile.id },
      });
    },
    { enableOnFormTags: true }
  );

  const toggleSidebar = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col ${
        theme === 'dark' ? 'text-white' : 'text-black'
      } h-full rounded-2xl overflow-hidden`}
    >
      <OsxWindowHeader
        title="about me"
        toggleMaximize={toggleMaximize}
        isMaximize={isMaximize}
      />
      <div className="flex flex-col h-full w-full text-xs md:text-sm">
        <div className="flex flex-1 rounded-br-xl">
          <div
            className={`flex flex-col p-5 gap-10 ${
              theme === 'dark'
                ? 'bg-gray-600 text-gray-300'
                : 'bg-gray-950 text-gray-200'
            }`}
          >
            <Tooltip title="explorer" direction="bottom">
              <div
                className={`text-xl cursor-pointer hover:${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-100'
                } hover:scale-150 transition ease-in-out`}
                onClick={toggleSidebar}
              >
                <FaRegCopy />
              </div>
            </Tooltip>
            <Tooltip title="Github" direction="right">
              <div
                className={`text-xl cursor-pointer hover:${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-100'
                } hover:scale-150 transition ease-in-out`}
                onClick={toggleSidebar}
              >
                <Link
                  href={'https://github.com/Dongmoon29/portfolio'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </Link>
              </div>
            </Tooltip>
          </div>
          {isSidebarOpen ? (
            <VscodeSidebar toggleSidebar={toggleSidebar} />
          ) : null}
          <div
            className={`flex flex-col w-full ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            } overflow-auto`}
          >
            <VsCodeBuffers />
            <VsCodeEditorArea file={state.currentFile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VsCodeComponent;
