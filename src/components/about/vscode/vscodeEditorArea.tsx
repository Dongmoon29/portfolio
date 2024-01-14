'use client';
import { FC, useState, ChangeEvent, useEffect, useMemo } from 'react';
import { useThemeContext } from '@/context/ThemeContext';

type VsCodeEditorAreaProps = {
  content: string | { src: string };
};

export const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ content }) => {
  const { theme } = useThemeContext();
  const [currentContents, setCurrentContents] = useState(content);
  const [mediaContent, setMediaContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentContents(content ?? '');
  }, [content]);

  useEffect(() => {
    const fetchMediaContent = async (currentContents: { src: string }) => {
      try {
        const response = await fetch(`/api/media?uri=${currentContents.src}`);
        if (!response.ok)
          throw new Error(`Error fetching content: ${response.statusText}`);
        const blob = await response.blob();
        setMediaContent(URL.createObjectURL(blob));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (typeof currentContents !== 'string') {
      setLoading(true);
      fetchMediaContent(currentContents);
    }
  }, [currentContents]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContents(e.target.value);
  };

  const editorClassName = useMemo(
    () => (theme === 'dark' ? 'bg-black' : 'bg-gray-50'),
    [theme]
  );

  return (
    <div
      className={`${editorClassName} w-full flex-1 flex flex-col rounded-br-xl`}>
      <div className="flex flex-1 overflow-auto">
        <div
          className={`${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          } w-10`}></div>
        <EditorContent
          currentContents={currentContents}
          loading={loading}
          mediaContent={mediaContent}
          onChange={handleInputChange}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

const EditorContent = ({
  currentContents,
  loading,
  mediaContent,
  onChange,
}: {
  currentContents: string | { src: string };
  loading: boolean;
  mediaContent: string | null;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  if (typeof currentContents === 'string') {
    return (
      <textarea
        className="p-3 w-full bg-inherit h-full resize-none focus:outline-none overflow-x-auto"
        value={currentContents}
        wrap="off"
        onChange={onChange}
      />
    );
  }

  if (!loading && mediaContent) {
    return (
      <iframe
        className="w-full p-3 bg-inherit flex-1"
        src={mediaContent}
        title="vscode"
      />
    );
  }

  return null;
};
