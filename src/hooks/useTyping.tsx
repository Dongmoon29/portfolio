import { useState, useEffect } from 'react';

const words = [
  'Hello, wonderful people.',
  "Hope you're having a nice day.",
  'Wishing you all the best on this lovely day.',
  'May your day be filled with joy and success.',
  'Take a moment to enjoy the little things today.',
  'Keep smiling and carry on with positivity.',
];

export const useTypingEffect = () => {
  const initialIndex = 0;
  const typingDelay = 120;
  const resetDelay = 1000;
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(initialIndex);

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
          }, resetDelay);
        } else {
          typeLetter();
        }
      }
    };

    const textInterval = setInterval(updateText, typingDelay);

    return () => clearInterval(textInterval);
  }, [wordIndex]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, resetDelay + typingDelay * words[wordIndex].length);

    return () => clearInterval(wordInterval);
  }, [wordIndex, resetDelay, typingDelay]);

  return text;
};
