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
      className={`hidden lg:block rounded-xl ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
      } w-4/5 lg:w-2/5 h-64 lg:h-80`}>
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
          } text-sm text-center`}>
          <span>$ {text}</span>
        </div>
      </div>
    </div>
  );
};
