import React, { useState, useEffect, useRef } from 'react';

interface ImageSlotProps {
  src?: string;
  alt?: string;
  slotNumber: string;
  caption?: string;
  aspectRatio?: string;
  className?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  alt = 'ZYGOS Feature Visual',
  slotNumber,
  caption,
  aspectRatio = 'aspect-[4.5/3]',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const parallax = parallaxRef.current;
    if (!container || !parallax) return;

    let animId: number | null = null;
    let lastScrollY = window.scrollY;
    let targetY = 0;
    let currentY = 0;
    let scrollDelta = 0;
    let isIntersecting = false;

    const calculateTarget = () => {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const containerCenter = rect.top + rect.height / 2;
      const viewportCenter = windowH / 2;

      // Progress: -1.0 (at top of viewport) to +1.0 (at bottom of viewport)
      const progress = (containerCenter - viewportCenter) / (windowH / 2);
      const clampedProgress = Math.max(-1.4, Math.min(1.4, progress));

      // Positional parallax travel:
      // When entering at bottom (+1), image starts shifted upward (-32px)
      // When centered in viewport (0), image is centered (0px)
      // When leaving at top (-1), image has traveled downward (+32px)
      const positionOffset = clampedProgress * -32;

      // Directional impulse with inertia based on scroll direction & velocity:
      // Scrolling down (scrollDelta > 0) nudges the image downward in the scroll direction
      // Scrolling up (scrollDelta < 0) nudges the image upward
      const directionImpulse = Math.max(-16, Math.min(16, scrollDelta * 0.3));

      return positionOffset + directionImpulse;
    };

    const update = () => {
      if (!isIntersecting) {
        animId = null;
        scrollDelta = 0;
        return;
      }

      // Smooth decay on scroll velocity impulse
      scrollDelta *= 0.72;
      if (Math.abs(scrollDelta) < 0.1) scrollDelta = 0;

      targetY = calculateTarget();

      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.05 || Math.abs(scrollDelta) > 0.1) {
        currentY += diff * 0.14;
        parallax.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;
        animId = requestAnimationFrame(update);
      } else {
        currentY = targetY;
        parallax.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;
        animId = null;
      }
    };

    const requestTick = () => {
      if (!animId) {
        animId = requestAnimationFrame(update);
      }
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDelta += currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (isIntersecting) {
        requestTick();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          lastScrollY = window.scrollY;
          requestTick();
        }
      },
      { rootMargin: '150px 0px' }
    );

    observer.observe(container);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial positioning calculation on mount
    requestTick();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={`relative flex flex-col space-y-2.5 ${className}`}>
      {/* 4.5:3 Architectural Crop Container with Hairline Technical Border */}
      <div
        ref={containerRef}
        style={{ aspectRatio: '4.5 / 3' }}
        className={`relative w-full ${aspectRatio} overflow-hidden border border-black/15 bg-zinc-100 group transition-all duration-300 hover:border-black/40`}
      >
        {src && !imageError ? (
          /* Parallax Traveling Container (oversized vertically to allow seamless +-36px translation) */
          <div
            ref={parallaxRef}
            className="absolute -top-[20%] left-0 w-full h-[140%] will-change-transform pointer-events-none"
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover filter contrast-[1.04] brightness-95 group-hover:brightness-105 group-hover:scale-[1.04] transition-all duration-700 ease-out"
            />
          </div>
        ) : (
          /* High-Fidelity Technical Placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#f8f8f8] border border-dashed border-zinc-300">
            {/* Corner Crosshair Ticks */}
            <span className="absolute top-2 left-2 text-[9px] font-mono text-zinc-400 select-none">┌</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-zinc-400 select-none">┐</span>
            <span className="absolute bottom-2 left-2 text-[9px] font-mono text-zinc-400 select-none">└</span>
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-zinc-400 select-none">┘</span>

            {/* Architectural Reticle Geometry */}
            <div className="relative w-20 h-20 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity">
              <div className="absolute inset-0 border border-zinc-400 rounded-full" />
              <div className="absolute w-full h-[1px] bg-zinc-400" />
              <div className="absolute h-full w-[1px] bg-zinc-400" />
              <div className="w-8 h-8 border border-zinc-500 rotate-45" />
            </div>

            {/* Technical Metadata Stamp */}
            <div className="mt-3 text-center space-y-1 z-10">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-medium">
                [ PLACEHOLDER_ASSET_{slotNumber} ]
              </div>
              <div className="font-mono text-[9px] text-zinc-400">
                Awaiting user image asset
              </div>
            </div>
          </div>
        )}

        {/* Hover Hairline Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* Bottom Technical Tag: [ 01 ] */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-zinc-500 pt-1">
        <span>[ {slotNumber} ]</span>
        {caption && <span className="text-zinc-400 text-[9px]">{caption}</span>}
      </div>
    </div>
  );
};
