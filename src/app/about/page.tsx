'use client';

import VsCodeComponent from '@/components/about/vscode/vscode';
import { OsxMenuBar } from '@/components/os/macOs/osxMenuBar';
import { WindowMenuBar } from '@/components/os/windowOs/windowMenuBar';
import { OsContext } from '@/context/OsContext';
import { ThemeContext } from '@/context/ThemeContext';
import { VscodeProvider } from '@/context/VscodeContext';
import { FC, useContext } from 'react';

const AboutMe: FC = () => {
  const { theme } = useContext(ThemeContext);
  const { os } = useContext(OsContext);
  return (
    <div
      id="aboutMe"
      className={`flex flex-col gap-9 h-screen max-h-screen bg-gradient-to-r ${
        theme === 'dark'
          ? 'from-sky-950 to-orange-900'
          : 'from-sky-200 to-sky-500'
      }
      ${os === 'MacOs' ? '' : 'pb-20'} 
      `}>
      {os === 'MacOs' ? <OsxMenuBar /> : null}
      <div className="p-10 overflow-hidden h-full">
        <VscodeProvider>
          <VsCodeComponent />
        </VscodeProvider>
      </div>
      {os === 'Window' ? <WindowMenuBar /> : null}
    </div>
  );
};

export default AboutMe;