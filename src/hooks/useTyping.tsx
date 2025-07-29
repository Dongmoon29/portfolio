import { useState, useEffect, useCallback, useRef } from 'react';

const words = [
  'Hello, wonderful people.',
  "Hope you're having a nice day.",
  'Wishing you all the best on this lovely day.',
  'May your day be filled with joy and success.',
  'Take a moment to enjoy the little things today.',
  'Keep smiling and carry on with positivity.',
] as const;

const TYPING_DELAY = 120;
const RESET_DELAY = 1000;

export const useTypingEffect = () => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearIntervals = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (wordIntervalRef.current) {
      clearInterval(wordIntervalRef.current);
      wordIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    let letterCount = 1;
    let increment = 1;
    let waiting = false;

    const typeLetter = () => {
      setText(words[wordIndex].substring(0, letterCount));
      letterCount += increment;
    };

    const resetTyping = () => {
      increment *= -1;
      letterCount += increment;
    };

    const updateText = () => {
      if (!waiting) {
        if (letterCount === 0 || letterCount === words[wordIndex].length + 1) {
          waiting = true;
          setTimeout(() => {
            resetTyping();
            waiting = false;
          }, RESET_DELAY);
        } else {
          typeLetter();
        }
      }
    };

    intervalRef.current = setInterval(updateText, TYPING_DELAY);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [wordIndex]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, RESET_DELAY + TYPING_DELAY * words[wordIndex].length);

    wordIntervalRef.current = wordInterval;

    return () => {
      if (wordIntervalRef.current) {
        clearInterval(wordIntervalRef.current);
      }
    };
  }, [wordIndex]);

  // 컴포넌트 언마운트 시 인터벌 정리
  useEffect(() => {
    return clearIntervals;
  }, [clearIntervals]);

  return text;
};
