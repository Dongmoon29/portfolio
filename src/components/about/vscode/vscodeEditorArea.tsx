'use client';
import { FC, useState, ChangeEvent, useEffect, useMemo } from 'react';
import { useThemeContext } from '@/context/ThemeContext';
import { VsCodeFileType } from '@/types/vscodeTypes';
import ReactMarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { API_ENDPOINTS } from '@/utils/constants';
import {
  getLanguageFromFilename,
  isMarkdownFile,
  isPdfFile,
} from '@/utils/fileUtils';

type VsCodeEditorAreaProps = {
  file?: VsCodeFileType;
};

export const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ file }) => {
  const { theme } = useThemeContext();
  const [currentContents, setCurrentContents] = useState<
    string | { src: string } | undefined
  >(file?.content);
  const [mediaContent, setMediaContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  console.log(API_ENDPOINTS.MEDIA);

  useEffect(() => {
    setCurrentContents(file?.content);
    setError(null);
  }, [file]);

  useEffect(() => {
    const fetchMediaContent = async (currentContents: { src: string }) => {
      try {
        setLoading(true);
        setError(null);

        const fullUrl = `${window.location.origin}${API_ENDPOINTS.MEDIA}?uri=${currentContents.src}`;
        console.log('fullUrl ==> , ', fullUrl);
        setMediaContent(fullUrl);
        setLoading(false);
      } catch (err: unknown) {
        console.error('Media fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load media');
        setLoading(false);
      }
    };

    if (currentContents && typeof currentContents !== 'string') {
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

  if (error) {
    return (
      <div
        className={`${editorClassName} flex-1 flex flex-col overflow-auto p-4`}
      >
        <div className="text-red-500 text-center">
          <p className="font-semibold">Error loading content</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${editorClassName} flex-1 flex flex-col overflow-auto rounded-r-xl`}
    >
      <EditorContent
        file={file}
        currentContents={currentContents}
        loading={loading}
        mediaContent={mediaContent}
        onChange={handleInputChange}
      />
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
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No content to display</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (typeof currentContents === 'string') {
    if (isMarkdownFile(file.filename)) {
      return (
        <div className="h-full overflow-auto">
          <ReactMarkDown
            components={{
              img: () => (
                <div className="flex justify-center items-center rounded-full mb-10">
                  <Image
                    className="rounded-full"
                    src="/dongmoon_kim.jpg"
                    alt="Dongmoon Kim"
                    width={250}
                    height={250}
                    priority
                  />
                </div>
              ),
            }}
            className={`h-0 ${
              theme === 'dark' ? 'dark' : 'light'
            } markdown p-4`}
            remarkPlugins={[remarkGfm]}
          >
            {currentContents}
          </ReactMarkDown>
        </div>
      );
    }

    const language = getLanguageFromFilename(file.filename);

    return (
      <div className="h-full w-full relative">
        <div className="absolute inset-0 overflow-auto">
          <CodeEditor
            value={currentContents}
            language={language}
            onChange={(evn: ChangeEvent<HTMLTextAreaElement>) => onChange(evn)}
            data-color-mode={theme === 'dark' ? 'dark' : 'light'}
            style={{
              backgroundColor: theme === 'dark' ? 'rgb(17 24 39)' : '#fff',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              fontSize: '14px',
              lineHeight: '1.5',
              padding: '15px',
            }}
          />
        </div>
      </div>
    );
  }

  if (!loading && mediaContent) {
    // PDF 파일인 경우
    if (isPdfFile(file.filename)) {
      return (
        <div className="w-full h-full flex flex-col">
          <iframe
            className="w-full h-full bg-inherit flex-1"
            src={mediaContent}
            title="PDF content"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      );
    }

    // 이미지 파일인 경우
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={mediaContent}
          alt={file.filename}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            console.error('Image failed to load:', e);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Unable to display content</p>
    </div>
  );
};
