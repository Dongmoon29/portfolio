'use client';

import { ThemeContext } from '@/context/ThemeContext';
import { FC, useContext, useState, ChangeEvent, useEffect } from 'react';

type VsCodeEditorAreaProps = {
  content?: string;
};

export const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ content }) => {
  const { theme } = useContext(ThemeContext);
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
              } w-14 text-center text-sm`}
              key={index}>
              {index + 1}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <textarea
            className={`${
              theme === 'dark' ? 'bg-black' : 'bg-gray-50'
            } w-full h-full text-sm resize-none focus:outline-none overflow-hidden`}
            value={currentContents}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};
