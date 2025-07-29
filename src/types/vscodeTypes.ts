export type VsCodeFolderType = {
  id: string;
  files: VsCodeFileType[];
  foldername: string;
  path: string;
  folders?: VsCodeFolderType[];
  fileType: 'folder';
  isActive: boolean;
};

export type VsCodeFileType = {
  id: string;
  filename: string;
  content: string | { src: string };
  path: string;
  fileType: 'file';
  isActive: boolean;
};

export type VsCodeBuffer = { id: string; filename: string; isActive: boolean };

// 추가 타입 정의
export type FileExtension =
  | '.md'
  | '.json'
  | '.ts'
  | '.tsx'
  | '.js'
  | '.jsx'
  | '.css'
  | '.html'
  | '.txt'
  | '.pdf'
  | '.png'
  | '.jpg'
  | '.jpeg'
  | '.gif';

export type MediaFileType = {
  src: string;
  type: 'image' | 'pdf';
};

export type TextFileType = string;

export type FileContent = TextFileType | MediaFileType;

export type ApiError = {
  message: string;
  status: number;
  code?: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
  success: boolean;
};
