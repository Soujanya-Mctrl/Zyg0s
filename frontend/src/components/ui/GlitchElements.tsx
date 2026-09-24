import { useState, useEffect } from 'react';

export function GlitchText({ text, active = false }: { text: string; active?: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = '01#%&*+=-<>~_[]{}XØ';

  useEffect(() => {
    if (active) {
      let iteration = 0;
      const maxIterations = 8;
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
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [active, text]);

  return (
    <span className={`relative inline-block ${active ? 'animate-glitch-skew font-bold' : ''}`}>
      <span className="relative z-10">{displayText}</span>
      {active && (
        <>
          <span
            className="absolute top-0 left-0 -translate-x-[2px] w-full h-full text-[#06b6d4] opacity-70 z-0 mix-blend-screen"
            style={{ animation: 'glitch-layer-1 2s infinite linear alternate-reverse' }}
            aria-hidden="true"
          >
            {displayText}
          </span>
          <span
            className="absolute top-0 left-0 translate-x-[2px] w-full h-full text-[#f43f5e] opacity-70 z-0 mix-blend-screen"
            style={{ animation: 'glitch-layer-2 3s infinite linear alternate-reverse' }}
            aria-hidden="true"
          >
            {displayText}
          </span>
        </>
      )}
    </span>
  );
}
