'use client';
import { useThemeContext } from '@/context/ThemeContext';
import { useTypingEffect } from '@/hooks/useTyping';
import { OsxWindowHeader } from '../os/macOs/osxWindowHeader';
import { useOsContext } from '@/context/OsContext';
import { WindowHeader } from '../os/windowOs/windowHeader';

const asciiDog = `
  __      _
o'')}____//
 \`_/      )
 (_(_/-(_/
`;
export const Console = () => {
  const text = useTypingEffect();
  const { theme } = useThemeContext();
  const { os } = useOsContext();

  return (
    <div
      className={`hidden sm:block rounded-xl ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
      } w-4/5 h-40 sm:h-60 md:h-96`}>
      {os === 'MacOs' ? (
        <OsxWindowHeader
          title="terminal"
          toggleMaximize={() => {}}
          isMaximize={false}
        />
      ) : (
        <WindowHeader title="terminal" isMaximize={false} />
      )}
      <div className="rounded-b-xl p-3 pb-1">
        <div className="text-center mb-5">
          <pre>{asciiDog}</pre>
        </div>
        <div
          className={` ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-200'
          } text-sm text-left`}>
          <span>$ {text}</span>
        </div>
      </div>
    </div>
  );
};
