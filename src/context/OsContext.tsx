'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type OsContextType = {
  os: 'MacOs' | 'Window';
  handleOsToggle: (os: 'MacOs' | 'Window') => void;
};

export const OsContext = createContext<OsContextType>({
  os: 'MacOs',
  handleOsToggle: (os: 'MacOs' | 'Window') => {},
});

export const OsProvider = ({ children }: { children: ReactNode }) => {
  const [os, setOs] = useState<'MacOs' | 'Window'>('MacOs');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedOs = localStorage.getItem('os') ?? 'MacOs';
    setOs(storedOs as 'MacOs' | 'Window');
  }, []);

  const handleOsToggle = (os: 'MacOs' | 'Window') => {
    setOs(os);
    localStorage.setItem('os', os);
  };

  if (!isMounted) return null;

  return (
    <OsContext.Provider value={{ os, handleOsToggle }}>
      {children}
    </OsContext.Provider>
  );
};

export const useOsContext = () => {
  const context = useContext(OsContext);
  if (!context) {
    throw new Error('useOsContext must be used within a VscodeProvider');
  }
  return context;
};
