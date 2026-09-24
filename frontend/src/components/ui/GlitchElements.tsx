import { useState, useEffect } from 'react';

export function GlitchText({ text, active = false }: { text: string; active?: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = '01#%&*+=-<>~_[]{}XØ';

  useEffect(() => {
    if (active) {
      setIsGlitching(true);
      let iteration = 0;
      const maxIterations = 5;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((_, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        iteration += 1;
        if (iteration > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsGlitching(false);
        }
      }, 25);
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
      setIsGlitching(false);
    }
  }, [active, text]);

  return (
    <span className="relative inline-block font-mono">
      <span className="relative z-10">{displayText}</span>
      {isGlitching && (
        <span
          className="absolute top-0 left-0 translate-x-[1px] w-full h-full text-zinc-400 opacity-60 z-0 select-none pointer-events-none"
          aria-hidden="true"
        >
          {displayText}
        </span>
      )}
    </span>
  );
}
