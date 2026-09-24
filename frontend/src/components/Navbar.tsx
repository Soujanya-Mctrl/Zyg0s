import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export type SectionId = 'hero' | 'workbench' | 'features' | 'faqs';

interface NavItem {
  id: SectionId;
  label: string;
  num: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'OVERVIEW', num: '01' },
  { id: 'workbench', label: 'WORKBENCH', num: '02' },
  { id: 'features', label: 'FEATURES', num: '03' },
  { id: 'faqs', label: 'FAQS', num: '04' },
];

const GLITCH_GLYPHS = '01#%&*+=-<>~_[]{}XØ';

interface GlitchTextProps {
  text: string;
  isActive: boolean;
  isLight: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, isActive }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  // Digital hacker scramble burst only briefly on becoming active, then settles completely
  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      setIsScrambling(false);
      return;
    }

    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = 5;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((_, index) => {
            if (index < iteration) return text[index];
            return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isActive, text]);

  return (
    <span className="relative inline-block select-none font-mono">
      {/* Primary High-Contrast Text */}
      <span className="relative z-10">{displayText}</span>

      {/* Subtle momentary monochrome flicker only while scrambling, never continuous */}
      {isScrambling && (
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 select-none text-zinc-400 translate-x-[1px] opacity-60"
        >
          {displayText}
        </span>
      )}
    </span>
  );
};

interface NavbarProps {
  theme?: 'dark' | 'light';
  activeSection?: SectionId;
  onNavClick?: (section: SectionId) => void;
  onLaunchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme = 'dark',
  activeSection = 'hero',
  onNavClick,
  onLaunchClick,
}) => {
  const isLight = theme === 'light';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-4 sm:py-5 flex items-center justify-between pointer-events-auto backdrop-blur-md border-b transition-colors duration-300 ${
        isLight
          ? 'bg-white/90 border-black/[0.08] text-black shadow-[0_1px_12px_rgba(0,0,0,0.04)]'
          : 'bg-black/80 border-white/[0.06] text-white shadow-[0_1px_12px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Brand Logo */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          onNavClick?.('hero');
        }}
        className="flex items-center gap-3 group cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-90 ${
            isLight ? 'fill-black' : 'fill-white'
          }`}
        >
          <path d="M12 0L13.8 8.8L22 12L13.8 15.2L12 24L10.2 15.2L2 12L10.2 8.8L12 0Z" />
        </svg>
        <span
          className={`font-heading font-bold text-lg sm:text-xl tracking-[0.25em] ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          ZYGOS
        </span>
      </a>

      {/* Nav Links that follow each section */}
      <nav className="hidden md:flex items-center gap-7 lg:gap-9">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavClick?.(item.id)}
              className={`relative py-1 text-[11px] lg:text-xs font-mono tracking-[0.22em] transition-all duration-200 flex items-center cursor-pointer group ${
                isActive
                  ? isLight
                    ? 'text-black font-semibold'
                    : 'text-white font-semibold'
                  : isLight
                    ? 'text-zinc-500 hover:text-black font-normal'
                    : 'text-zinc-400 hover:text-white font-normal'
              }`}
            >
              {/* Glitch Animated Text (Dot removed) */}
              <GlitchText text={item.label} isActive={isActive} isLight={isLight} />

              {/* Active Hairline Underline Bar */}
              {isActive && (
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] transition-all duration-300 ${
                    isLight ? 'bg-black' : 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                  }`}
                />
              )}
            </button>
          );
        })}

        {/* Dedicated Docs Page Link */}
        <Link
          to="/docs"
          className={`relative py-1 text-[11px] lg:text-xs font-mono tracking-[0.22em] transition-all duration-200 flex items-center cursor-pointer group ${
            isLight
              ? 'text-zinc-500 hover:text-black font-normal'
              : 'text-zinc-400 hover:text-white font-normal'
          }`}
        >
          <GlitchText text="DOCS" isActive={false} isLight={isLight} />
        </Link>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-6 lg:gap-8">

        {/* Launch App Button */}
        <button
          onClick={onLaunchClick}
          className={`group relative px-5 py-2.5 border font-heading text-xs tracking-[0.18em] uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            isLight
              ? 'border-black/30 hover:border-black bg-black text-white hover:bg-zinc-800'
              : 'border-white/25 hover:border-white bg-transparent hover:bg-white text-white hover:text-black'
          }`}
        >
          <span>LAUNCH APP</span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </button>
      </div>
    </header>
  );
};
