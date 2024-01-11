'use client';

import { ThemeContext } from '@/context/ThemeContext';
import { VscodeContext } from '@/context/VscodeContext';
import Image from 'next/image';
import { FC, MouseEventHandler, useContext } from 'react';

export const VsCodeBuffers: FC = () => {
  const { state } = useContext(VscodeContext);
  const buffers = state.buffers;
  if (!buffers) {
    return null;
  }

  return (
    <div className="flex justify-start items-end">
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
  const { dispatch } = useContext(VscodeContext);
  const { theme } = useContext(ThemeContext);

  let icon = (
    <div>
      <Image
        src={'/svgs/default_file.svg'}
        priority
        height={32}
        width={32}
        alt="icon"
      />
    </div>
  );
  if (buffer.filename.endsWith('.json')) {
    icon = (
      <div>
        <Image
          src={'/svgs/json.svg'}
          priority
          height={32}
          width={32}
          alt="icon"
        />
      </div>
    );
  }
  if (buffer.filename.endsWith('.tsx')) {
    icon = (
      <div>
        <Image
          src={'/svgs/tsx.svg'}
          priority
          height={32}
          width={32}
          alt="icon"
        />
      </div>
    );
  }

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
      {icon}
      <span>{buffer.filename}</span>
      <span onClick={handleTabDeleteClick}>x</span>
    </div>
  );
};
