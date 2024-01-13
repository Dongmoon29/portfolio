'use client';

import { useThemeContext } from '@/context/ThemeContext';
import { FC, useState, ChangeEvent, useEffect } from 'react';

type VsCodeEditorAreaProps = {
  content: string | { src: string };
};

// FIXME: need to fix layout when buffer x axis gets overflow, main content area also grow and breaks layout
export const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ content }) => {
  const { theme } = useThemeContext();
  const [currentContents, setCurrentContents] = useState(content);
  const [mediaContent, setMediaContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const lines =
    typeof currentContents === 'string' ? currentContents.split('\n') : null;

  useEffect(() => {
    setCurrentContents(content ?? '');
  }, [content]);
  useEffect(() => {
    if (typeof currentContents === 'string') return;
    setLoading(true);
    const fetchMediaContent = async () => {
      try {
        const res = await fetch(`/api/media?uri=${currentContents.src}`);
        if (!res.ok) {
          throw new Error(`Error fetching PDF content: ${res.statusText}`);
        }

        const blob = await res.blob();
        const uri = URL.createObjectURL(blob);
        setMediaContent(uri);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchMediaContent();
  }, [currentContents]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContents(e.target.value);
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      } w-full flex-1 overflow-auto flex`}>
      <div className=" flex gap-2 flex-1">
        {lines && (
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
        )}
        <div className="flex-1">
          {typeof currentContents === 'string' && (
            <textarea
              className={`${
                theme === 'dark' ? 'bg-black' : 'bg-gray-50'
              } w-full h-full resize-none focus:outline-none overflow-hidden text-nowrap overflow-x-auto`}
              value={currentContents}
              onChange={handleInputChange}
            />
          )}
          {typeof currentContents !== 'string' && !loading && (
            <iframe
              className="w-full h-full"
              src={`${mediaContent}`}
              title="vscode"
            />
          )}
        </div>
      </div>
    </div>
  );
};
