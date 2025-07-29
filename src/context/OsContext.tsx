'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { OPERATING_SYSTEMS, STORAGE_KEYS } from '@/utils/constants';

type Os = typeof OPERATING_SYSTEMS.MACOS | typeof OPERATING_SYSTEMS.WINDOWS;

type OsContextType = {
  os: Os;
  handleOsToggle: (os: Os) => void;
};

export const OsContext = createContext<OsContextType>({
  os: OPERATING_SYSTEMS.MACOS,
  handleOsToggle: (os: Os) => {},
});

export const OsProvider = ({ children }: { children: ReactNode }) => {
  const [os, setOs] = useState<Os>(OPERATING_SYSTEMS.MACOS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedOs = localStorage.getItem(STORAGE_KEYS.OS) as Os;
    const validOs =
      storedOs && Object.values(OPERATING_SYSTEMS).includes(storedOs)
        ? storedOs
        : OPERATING_SYSTEMS.MACOS;
    setOs(validOs);
  }, []);

  const handleOsToggle = (newOs: Os) => {
    setOs(newOs);
    localStorage.setItem(STORAGE_KEYS.OS, newOs);
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
    throw new Error('useOsContext must be used within an OsProvider');
  }
  return context;
};
