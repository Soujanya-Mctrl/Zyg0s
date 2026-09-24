import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  // Master GSAP Entrance Timeline (Typography & UI reveal only)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Initial State
      gsap.set(containerRef.current, { opacity: 1 });



      // 3. Staggered Title Reveal (Line by Line from below mask)
      tl.from('.hero-title-line', {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
      }, 0.3);

      // 4. Description Fade In
      tl.from(descRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.75);

      // 5. CTA Buttons
      if (ctaRef.current) {
        tl.from(ctaRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.85);
      }

      // 6. Bottom Stats & Scroll Indicator
      if (bottomBarRef.current) {
        tl.from(bottomBarRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.85,
          ease: 'power3.out',
        }, 1.0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen lg:h-screen w-full bg-[#000000] flex flex-col justify-between pt-16 sm:pt-20 pb-5 px-6 sm:px-12 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Static Artwork Layer — completely static, scrolls naturally with the hero section */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center justify-end">
        {/* Subtle Obsidian Dark Vignette on Left to Guarantee High-Contrast Typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none" />

        {/* Completely Static Celestial Artwork Plate — sized proportionally with breathing margins */}
        <div className="relative w-full h-full flex items-center justify-end">
          <img
            src="/images/hermes-static-bg.png"
            alt="ZYGØS Intelligence Celestial Artwork"
            className="w-full h-full object-cover object-right md:object-contain md:object-right select-none opacity-95 scale-[0.82] sm:scale-[0.84] lg:scale-[0.85] xl:scale-[0.87] origin-right"
          />
        </div>
      </div>

      {/* Main Grid: Left Headline & CTAs + Right Showcase Zone */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center flex-1 z-10 my-auto">
        
        {/* Left Column: Headline, Copy, CTAs (Cols 1-7) */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-3.5 sm:space-y-4 max-w-2xl">
          
          {/* Display Title with Uniform Geometric Sans Grotesque */}
          <h1 className="font-heading font-bold tracking-[-0.03em] leading-[0.92] text-4xl sm:text-5xl lg:text-[56px] xl:text-[66px] text-white flex flex-col uppercase">
            <span className="overflow-hidden">
              <span className="hero-title-line block will-change-transform font-display">
                ZYGØS
              </span>
            </span>
            <span className="overflow-hidden">
              <span className="hero-title-line block will-change-transform">
                TRUST
              </span>
            </span>
            <span className="overflow-hidden">
              <span className="hero-title-line block will-change-transform">
                THROUGH
              </span>
            </span>
            <span className="overflow-hidden">
              <span className="hero-title-line block will-change-transform">
                INTELLIGENCE
              </span>
            </span>
          </h1>

          {/* Subtitle Description */}
          <p
            ref={descRef}
            className="font-mono text-zinc-400 text-xs sm:text-sm lg:text-[14px] max-w-lg leading-relaxed tracking-wide"
          >
            An autonomous agentic fraud investigation platform for a safer financial world.
          </p>

          {/* CTA Action Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            {/* Primary Action Button */}
            <a
              href="#workbench"
              className="group relative px-6 sm:px-7 py-3 bg-white hover:bg-zinc-200 text-black font-heading font-semibold text-xs tracking-[0.18em] uppercase flex items-center gap-2.5 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            >
              <span>GET STARTED</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            {/* Secondary Action Button */}
            <a
              href="#features"
              className="group px-6 sm:px-7 py-3 border border-zinc-700 hover:border-white bg-transparent hover:bg-white/[0.04] text-white font-heading font-semibold text-xs tracking-[0.18em] uppercase flex items-center transition-all duration-200 cursor-pointer"
            >
              <span>EXPLORE THE TECH</span>
            </a>
          </div>
        </div>

        {/* Right Column: Open Showcase Zone for Background Figure */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-5 pointer-events-none min-h-[460px]" />
      </div>

      {/* Bottom Telemetry & Metrics Bar */}
      <div
        ref={bottomBarRef}
        className="w-full max-w-[1600px] mx-auto pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 z-10"
      >
        {/* Left Stats Grid */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Stat 1 */}
          <div className="border-l border-zinc-700/80 pl-3.5 space-y-0.5">
            <div className="font-heading font-bold text-lg sm:text-2xl tracking-tight text-white">
              590K+
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              TRANSACTIONS
            </div>
          </div>

          {/* Stat 2 */}
          <div className="border-l border-zinc-700/80 pl-3.5 space-y-0.5">
            <div className="font-heading font-bold text-lg sm:text-2xl tracking-tight text-white">
              20
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              BENCHMARK CASES
            </div>
          </div>

          {/* Stat 3 */}
          <div className="border-l border-zinc-700/80 pl-3.5 space-y-0.5">
            <div className="font-heading font-bold text-lg sm:text-2xl tracking-tight text-white">
              7
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
              SPECIALIZED AGENTS
            </div>
          </div>
        </div>

        {/* Right Scroll Indicator */}
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase group cursor-pointer hover:text-white transition-colors">
          <span>SCROLL</span>
          <span className="w-6 h-[1px] bg-zinc-700 block" />
          <span className="animate-arrow-down text-zinc-400 group-hover:text-white">↓</span>
        </div>
      </div>
    </section>
  );
};
