// 파일 확장자 관련 상수
export const FILE_EXTENSIONS = {
  IMAGE: ['.png', '.jpg', '.jpeg', '.gif'] as const,
  PDF: '.pdf' as const,
  MARKDOWN: '.md' as const,
  CODE: ['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.json'] as const,
} as const;

// API 관련 상수
export const API_ENDPOINTS = {
  DATAS: '/api/datas',
  MEDIA: '/api/media',
} as const;

// 테마 관련 상수
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// OS 관련 상수
export const OPERATING_SYSTEMS = {
  MACOS: 'MacOs',
  WINDOWS: 'Window',
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  THEME: 'theme',
  OS: 'os',
} as const;

// 키보드 단축키
export const KEYBOARD_SHORTCUTS = {
  CLOSE_TAB: 'alt+w',
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data',
  FILE_NOT_FOUND: 'File not found',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

// 로딩 메시지
export const LOADING_MESSAGES = {
  INITIALIZING: 'Initializing...',
  LOADING_FILE: 'Loading file...',
} as const;
