import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  Reducer,
} from 'react';
import { vscodeReducer } from '@/reducers/vscodeReducer';
import {
  VsCodeBuffer,
  VsCodeFileType,
  VsCodeFolderType,
  ApiError,
} from '@/types/vscodeTypes';
import { VsCodeActions } from '@/actions/vscodeActions';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/utils/constants';
import { handleApiError } from '@/utils/errorHandler';

export type VsCodeState = {
  files: VsCodeFileType[];
  currentFile?: VsCodeFileType;
  buffers: VsCodeBuffer[];
  fileExplorer: { files: VsCodeFileType[]; folders: VsCodeFolderType[] };
};

export const initialState: VsCodeState = {
  files: [],
  currentFile: undefined,
  buffers: [],
  fileExplorer: { files: [], folders: [] },
};

export const VscodeContext = createContext<{
  state: VsCodeState;
  dispatch: Dispatch<VsCodeActions>;
  error: ApiError | null;
  isLoading: boolean;
}>({
  state: initialState,
  dispatch: () => null,
  error: null,
  isLoading: false,
});

export const VscodeProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [state, dispatch] = useReducer<Reducer<VsCodeState, VsCodeActions>>(
    vscodeReducer,
    initialState
  );

  useEffect(() => {
    const initializeState = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_ENDPOINTS.DATAS);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: { files: VsCodeFileType[]; folders: VsCodeFolderType[] } =
          await response.json();

        dispatch({ type: 'INITIALIZE', payload: { data } });
        setInitialized(true);
      } catch (err: unknown) {
        const apiError = handleApiError(err);
        setError(apiError);
        console.error('Failed to initialize VS Code state:', apiError);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isInitialized) {
      initializeState();
    }
  }, [isInitialized]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-sky-200 to-sky-500 dark:from-sky-950 dark:to-orange-900">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-white mb-4"></div>
          <p className="text-white font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-500 font-semibold mb-2">
            Failed to load portfolio
          </p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
          <button
            onClick={() => {
              setError(null);
              setInitialized(false);
            }}
            className="btn btn-primary btn-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return isInitialized ? (
    <VscodeContext.Provider value={{ state, dispatch, error, isLoading }}>
      {children}
    </VscodeContext.Provider>
  ) : null;
};

export const useVscodeContext = () => {
  const context = useContext(VscodeContext);
  if (!context) {
    throw new Error('useVscodeContext must be used within a VscodeProvider');
  }
  return context;
};
