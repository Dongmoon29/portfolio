'use client';
import { useTypingEffect } from '@/hooks/useTyping';
import { useState, useEffect } from 'react';

const Console = () => {
  const text = useTypingEffect();
  const [underscoreVisible, setUnderscoreVisible] = useState(true);

  useEffect(() => {
    const underscoreInterval = setInterval(() => {
      setUnderscoreVisible((vis) => !vis);
    }, 400);

    return () => clearInterval(underscoreInterval);
  }, []);

  useEffect(() => {
    const underscoreInterval = setInterval(() => {
      setUnderscoreVisible((visible) => !visible);
    }, 400);

    return () => clearInterval(underscoreInterval);
  }, []);
  return (
    <div className="rounded-xl bg-gray-100 dark:bg-gray-800 min-w-96">
      <div className="flex bg-gray-600 min-h-8 rounded-t-xl p-2 gap-2">
        <div className="rounded-full bg-red-500 w-4"></div>
        <div className="rounded-full bg-yellow-300 w-4"></div>
        <div className="rounded-full bg-green-300 w-4"></div>
      </div>
      <div className="rounded-b-xl p-5 min-h-60">
        <div className="relative m-auto text-black dark:text-gray-200 text-sm text-left h-50 w-150">
          <span>$ {text}</span>
        </div>
      </div>
    </div>
  );
};

export default Console;