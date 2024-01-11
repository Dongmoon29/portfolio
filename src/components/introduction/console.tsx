'use client';
import { ThemeContext } from '@/context/ThemeContext';
import { useTypingEffect } from '@/hooks/useTyping';
import { useContext } from 'react';
import { OsxWindowHeader } from '../os/macOs/osxWindowHeader';
import { OsContext } from '@/context/OsContext';
import { WindowHeader } from '../os/windowOs/windowHeader';

const asciiDog = `
  __      _
o'')}____//
 \`_/      )
 (_(_/-(_/
`;
const Console = () => {
  const text = useTypingEffect();
  const { theme } = useContext(ThemeContext);
  const { os } = useContext(OsContext);

  return (
    <div
      className={`rounded-xl ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
      } w-4/5 md:w-2/5 h-60 md:h-96`}>
      {os === 'MacOs' ? (
        <OsxWindowHeader title="terminal" />
      ) : (
        <WindowHeader title="terminal" />
      )}
      <div className="rounded-b-xl p-3 pb-1 min-h-60">
        <div className="text-center mb-5">
          <pre>{asciiDog}</pre>
        </div>
        <div
          className={`m-auto ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
          } text-sm text-left h-50 w-150`}>
          <span>$ {text}</span>
        </div>
      </div>
    </div>
  );
};

export default Console;
