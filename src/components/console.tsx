'use client';
import { ThemeContext } from '@/context/ThemeContext';
import { useTypingEffect } from '@/hooks/useTyping';
import { useContext } from 'react';
import { OsxWindowButtons } from './osxWindowButtons';

const asciiDog = `
  __      _
o'')}____//
 \`_/      )
 (_(_/-(_/
`;
const Console = () => {
  const text = useTypingEffect();
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`rounded-xl ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
      }  w-full sm:w-3/5 h-96`}>
      <div className="flex bg-gray-600 min-h-8 rounded-t-xl p-2 gap-2">
        <OsxWindowButtons />
      </div>
      <div className="rounded-b-xl p-3 pb-1 min-h-60">
        <div className="text-center mb-5">
          <pre>{asciiDog}</pre>
        </div>
        <div
          className={`relative m-auto ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
          } text-sm text-left h-50 w-150`}>
          <span>$ {text}</span>
        </div>
      </div>
    </div>
  );
};

export default Console;
