import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface HeroVisualProps {
  mousePos: { x: number; y: number };
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ mousePos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Smooth GSAP Parallax Response
  useEffect(() => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      x: mousePos.x * 16,
      y: mousePos.y * 12,
      rotationY: mousePos.x * 3,
      rotationX: -mousePos.y * 3,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 1.2,
    });
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[340px] sm:h-[400px] lg:h-[440px] xl:h-[500px] flex items-center justify-center select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Main Statue Image Layer with Screen Blending for 100% Void Fusion */}
      <div className="relative w-full h-full max-w-[500px] xl:max-w-[580px] flex items-center justify-center">
        <img
          ref={imageRef}
          src="/images/zygos-justice-hero.png"
          alt="ZYGØS Forensic Justice Scale"
          className="w-full h-full object-contain filter contrast-[1.12] brightness-[1.02] mix-blend-screen will-change-transform pointer-events-none"
        />

        {/* Dynamic Pulsing Sparkle Star (Overlay positioned exactly over the star in artwork) */}
        <div
          className="absolute top-[28%] left-[49.8%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="relative w-6 h-6 flex items-center justify-center animate-sparkle">
            <div className="absolute w-2 h-2 bg-white rounded-full blur-[2px]" />
            <div className="absolute w-14 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="absolute h-14 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};
