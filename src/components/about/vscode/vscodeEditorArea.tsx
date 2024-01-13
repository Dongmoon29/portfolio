'use client';

import { useThemeContext } from '@/context/ThemeContext';
import { FC, useState, ChangeEvent, useEffect } from 'react';

type VsCodeEditorAreaProps = {
  content?: string;
};

export const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ content }) => {
  const { theme } = useThemeContext();
  const [currentContents, setCurrentContents] = useState(content ?? '');
  const lines = currentContents.split('\n');

  useEffect(() => {
    setCurrentContents(content ?? '');
  }, [content]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContents(e.target.value);
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      } w-full flex-1 overflow-auto`}>
      <div className=" flex gap-2">
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
        <div className="flex-1">
          <textarea
            className={`${
              theme === 'dark' ? 'bg-black' : 'bg-gray-50'
            } w-full h-full resize-none focus:outline-none overflow-hidden text-nowrap overflow-x-auto`}
            value={currentContents}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};
