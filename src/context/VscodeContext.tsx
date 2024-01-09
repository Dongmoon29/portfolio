'use client';

import {
  VsCodeState,
  initialState,
  vscodeReducer,
} from '@/reducers/vscodeReducer';
import { ReactNode, createContext, useContext, useReducer } from 'react';

export const VscodeContext = createContext<{
  state: VsCodeState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const VscodeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(vscodeReducer, initialState);

  return (
    <VscodeContext.Provider value={{ state, dispatch }}>
      {children}
    </VscodeContext.Provider>
  );
};

export const useVscodeContext = () => {
  const context = useContext(VscodeContext);
  if (!context) {
    throw new Error('useVscodeContext must be used within a VscodeProvider');
  }
  return context;
};
