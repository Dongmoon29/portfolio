'use client';

import VsCodeComponent from '@/components/about/vscode/vscode';
import { OsxMenuBar } from '@/components/os/macOs/osxMenuBar';
import { useThemeContext } from '@/context/ThemeContext';
import { VscodeProvider } from '@/context/VscodeContext';
import { FC, useState } from 'react';
import { THEMES } from '@/utils/constants';

const AboutMe: FC = () => {
  const { theme } = useThemeContext();
  const [isMaximize, setIsMaximize] = useState(false);

  const toggleMaximize = () => {
    setIsMaximize((prev) => !prev);
  };

  return (
    <div
      id="aboutMe"
      className={`flex flex-col justify-between ${
        isMaximize ? '' : 'sm:gap-9'
      } h-screen max-h-screen bg-gradient-to-r ${
        theme === THEMES.DARK
          ? 'from-sky-950 to-orange-900'
          : 'from-sky-200 to-sky-500'
      }
      `}
    >
      <OsxMenuBar />
      <div
        className={`${isMaximize ? '' : 'sm:px-8 sm:py-4'} flex-1 max-h-full`}
      >
        <VscodeProvider>
          <VsCodeComponent
            isMaximize={isMaximize}
            toggleMaximize={toggleMaximize}
          />
        </VscodeProvider>
      </div>
    </div>
  );
};

export default AboutMe;
