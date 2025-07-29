import { ApiError } from '@/types/vscodeTypes';
import { ERROR_MESSAGES } from './constants';

export class CustomError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    this.code = code;
  }
}

export const createApiError = (
  message: string,
  status: number = 500,
  code?: string
): ApiError => ({
  message,
  status,
  code,
});

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof CustomError) {
    return createApiError(error.message, error.status, error.code);
  }

  if (error instanceof Error) {
    return createApiError(error.message);
  }

  if (typeof error === 'string') {
    return createApiError(error);
  }

  return createApiError(ERROR_MESSAGES.UNKNOWN_ERROR);
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('Network') || error.message.includes('fetch');
  }
  return false;
};

export const isFileNotFoundError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.includes('404') || error.message.includes('not found');
  }
  return false;
};
