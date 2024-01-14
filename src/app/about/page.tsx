'use client';

import VsCodeComponent from '@/components/about/vscode/vscode';
import { OsxMenuBar } from '@/components/os/macOs/osxMenuBar';
import { WindowMenuBar } from '@/components/os/windowOs/windowMenuBar';
import { useOsContext } from '@/context/OsContext';
import { useThemeContext } from '@/context/ThemeContext';
import { VscodeProvider } from '@/context/VscodeContext';
import { FC, useEffect, useState } from 'react';

const AboutMe: FC = () => {
  const { theme } = useThemeContext();
  const { os } = useOsContext();
  const [isMaximize, setIsMaximize] = useState(false);

  const toggleMaximize = () => {
    setIsMaximize((prev) => !prev);
  };

  return (
    <div
      id="aboutMe"
      className={`flex flex-col justify-between overflow-auto gap-9 h-screen max-h-screen bg-gradient-to-r ${
        theme === 'dark'
          ? 'from-sky-950 to-orange-900'
          : 'from-sky-200 to-sky-500'
      }
      `}>
      {os === 'MacOs' ? <OsxMenuBar /> : null}
      <div className={`flex-grow ${isMaximize ? '' : 'p-6'} flex-1`}>
        <VscodeProvider>
          <VsCodeComponent toggleMaximize={toggleMaximize} />
        </VscodeProvider>
      </div>
      {os === 'Window' ? <WindowMenuBar /> : null}
    </div>
  );
};

export default AboutMe;
