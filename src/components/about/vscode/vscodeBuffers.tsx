'use client';

import { FileIcon } from '@/components/fileIcons/icons';
import { useThemeContext } from '@/context/ThemeContext';
import { useVscodeContext } from '@/context/VscodeContext';
import { FC, MouseEventHandler } from 'react';

export const VsCodeBuffers: FC = () => {
  const { state } = useVscodeContext();
  const { theme } = useThemeContext();
  const buffers = state.buffers;

  if (!buffers) {
    return null;
  }

  return (
    <div
      className={`flex justify-start items-end overflow-auto border-b-2 sm:border-b-8 ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
      }`}>
      {buffers.map((buffer) => (
        <VsCodeBuffer
          key={`TAB_${buffer.filename}_${buffer.id}`}
          buffer={buffer}
        />
      ))}
    </div>
  );
};

type VsCodeBufferProps = {
  buffer: {
    id: string;
    filename: string;
    isActive: boolean;
  };
};

const VsCodeBuffer: FC<VsCodeBufferProps> = ({ buffer }) => {
  const { dispatch } = useVscodeContext();
  const { theme } = useThemeContext();

  const handleTabDeleteClick: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    dispatch({ type: 'DELETE_BUFFER', payload: { id: buffer.id } });
  };

  const handleTabClick: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    dispatch({ type: 'SET_CURRENT_FILE', payload: { id: buffer.id } });
  };

  return (
    <div
      onClick={handleTabClick}
      className={`cursor-pointer flex gap-x-3 p-3 justify-center items-center ${
        buffer.isActive
          ? theme === 'light'
            ? 'border-t-4 border-blue-500 bg-gray-50'
            : 'border-t-4 border-blue-500 bg-black'
          : ''
      }
      
      `}>
      <FileIcon filename={buffer.filename} size={20} />
      <span className="text-nowrap">{buffer.filename}</span>
      <span onClick={handleTabDeleteClick}>x</span>
    </div>
  );
};
