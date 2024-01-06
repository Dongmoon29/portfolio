'use client';
import { ThemeContext } from '@/context/ThemeContext';
import { useTypingEffect } from '@/hooks/useTyping';
import { useContext } from 'react';

const Console = () => {
  const text = useTypingEffect();
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`rounded-xl ${
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
      }  w-80 md:w-96 h-80`}>
      <div className="flex bg-gray-600 min-h-8 rounded-t-xl p-2 gap-2">
        <div className="rounded-full bg-red-500 w-4"></div>
        <div className="rounded-full bg-yellow-300 w-4"></div>
        <div className="rounded-full bg-green-300 w-4"></div>
      </div>
      <div className="rounded-b-xl p-5 min-h-60">
        <div
          className={`relative m-auto ${
            theme === 'light' ? 'text-black' : 'text-gray-200'
          } text-sm text-left h-50 w-150`}>
          <span>$ {text}</span>
        </div>
      </div>
    </div>
  );
};

export default Console;
