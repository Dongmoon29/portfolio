'use client';
import { ThemeContext } from '@/context/ThemeContext';
import { FC, useContext } from 'react';

type VsCodeEditorAreaProps = {
  content?: string;
};

export const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ content }) => {
  const { theme } = useContext(ThemeContext);
  const contents = typeof content === 'string' ? content : '';
  const lines = contents.split('\n');
  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      } w-full flex-1 flex gap-2 overflow-auto`}>
      <div className="flex flex-col">
        {lines.map((_, index) => (
          <div
            className={`${
              theme === 'dark' ? 'bg-black' : 'bg-gray-50'
            } w-14 text-center`}
            key={index}>
            {index + 1}
          </div>
        ))}
      </div>
      <div>
        <pre>
          <code>{contents ?? ''}</code>
        </pre>
      </div>
    </div>
  );
};
