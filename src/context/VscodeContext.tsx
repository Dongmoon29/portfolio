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
} from '@/types/vscodeTypes';
import { VsCodeActions } from '@/actions/vscodeActions';

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
}>({
  state: initialState,
  dispatch: () => null,
});

export const VscodeProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setInitialized] = useState(false);
  const [state, dispatch] = useReducer<Reducer<VsCodeState, VsCodeActions>>(
    vscodeReducer,
    initialState
  );

  useEffect(() => {
    const initializeState = async () => {
      const response = await fetch('/api/datas');
      const data: { files: VsCodeFileType[]; folders: VsCodeFolderType[] } =
        await response.json();
      dispatch({ type: 'INITIALIZE', payload: { data } });
      setInitialized(true);
    };

    if (!isInitialized) {
      initializeState();
    }
  }, [isInitialized]);

  return isInitialized ? (
    <VscodeContext.Provider value={{ state, dispatch }}>
      {children}
    </VscodeContext.Provider>
  ) : (
    <div>Loading...</div>
  );
};

export const useVscodeContext = () => {
  const context = useContext(VscodeContext);
  if (!context) {
    throw new Error('useVscodeContext must be used within a VscodeProvider');
  }
  return context;
};
