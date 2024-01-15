'use client';
import { FC, useState, ChangeEvent, useEffect, useMemo } from 'react';
import { useThemeContext } from '@/context/ThemeContext';
import { VsCodeFileType } from '@/types/vscodeTypes';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import CodeEditor from '@uiw/react-textarea-code-editor';

type VsCodeEditorAreaProps = {
  file?: VsCodeFileType;
};

export const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ file }) => {
  const { theme } = useThemeContext();
  // string or {src: string} that is not a text file
  const [currentContents, setCurrentContents] = useState<
    string | { src: string } | undefined
  >(file?.content ?? undefined);
  // for storing blob data
  const [mediaContent, setMediaContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentContents(file?.content);
  }, [file]);

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

    if (currentContents && typeof currentContents !== 'string') {
      setLoading(true);
      fetchMediaContent(currentContents);
    }
  }, [currentContents]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContents(e.target.value);
  };

  const editorClassName = useMemo(
    () => (theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'),
    [theme]
  );

  return (
    <div
      className={`${editorClassName} w-full flex-1 flex flex-col rounded-br-xl`}>
      <div className="flex flex-1">
        <div
          className={`hidden ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
          } sm:w-10`}></div>
        <EditorContent
          file={file}
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
  file,
}: {
  loading: boolean;
  mediaContent: string | null;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  file?: VsCodeFileType;
  currentContents?: string | { src: string };
}) => {
  const { theme } = useThemeContext();
  if (!file || !currentContents) {
    return (
      <div>
        <h1>no content</h1>
      </div>
    );
  }

  if (typeof currentContents === 'string') {
    if (file.filename.endsWith('.md')) {
      return (
        <div className="h-full pb-20 overflow-auto">
          <ReactMarkDown
            components={{
              img: () => (
                <div className="flex justify-center items-center rounded-full mb-10">
                  <Image
                    className="rounded-full"
                    src={`/dongmoon_kim.jpg`}
                    alt={'alt'}
                    width="300"
                    height="300"
                  />
                </div>
              ),
            }}
            className={`h-0 ${
              theme === 'dark' ? 'dark' : 'light'
            } markdown p-4`}
            remarkPlugins={[remarkGfm]}>
            {currentContents}
          </ReactMarkDown>
        </div>
      );
    }

    return (
      <CodeEditor
        value={currentContents}
        language={file.filename.split('.').pop()}
        onChange={(evn: any) => onChange(evn.target.value)}
        padding={15}
        data-color-mode={theme === 'dark' ? 'dark' : 'light'}
        style={{
          backgroundColor: theme === 'dark' ? 'rgb(17 24 39)' : '#fff',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    );
  }

  if (!loading && mediaContent) {
    return (
      <iframe
        className="w-full h-full bg-inherit flex-1"
        src={mediaContent}
        title="vscode"
      />
    );
  }

  return null;
};
