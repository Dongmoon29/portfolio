import { FILE_EXTENSIONS } from './constants';
import { FileExtension } from '@/types/vscodeTypes';

export const getFileExtension = (filename: string): FileExtension | null => {
  const extension = filename.split('.').pop()?.toLowerCase();
  if (!extension) return null;

  return `.${extension}` as FileExtension;
};

export const isImageFile = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  return extension ? FILE_EXTENSIONS.IMAGE.includes(extension as any) : false;
};

export const isPdfFile = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  return extension === FILE_EXTENSIONS.PDF;
};

export const isMarkdownFile = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  return extension === FILE_EXTENSIONS.MARKDOWN;
};

export const isCodeFile = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  return extension ? FILE_EXTENSIONS.CODE.includes(extension as any) : false;
};

export const getFileType = (
  filename: string
): 'image' | 'pdf' | 'markdown' | 'code' | 'text' => {
  if (isImageFile(filename)) return 'image';
  if (isPdfFile(filename)) return 'pdf';
  if (isMarkdownFile(filename)) return 'markdown';
  if (isCodeFile(filename)) return 'code';
  return 'text';
};

export const getLanguageFromFilename = (filename: string): string => {
  const extension = getFileExtension(filename);
  if (!extension) return 'text';

  const languageMap: Record<string, string> = {
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.css': 'css',
    '.html': 'html',
    '.json': 'json',
    '.md': 'markdown',
  };

  return languageMap[extension] || 'text';
};
