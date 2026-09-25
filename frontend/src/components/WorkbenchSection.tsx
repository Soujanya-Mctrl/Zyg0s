import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WorkbenchSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-full min-h-screen lg:min-h-0 flex flex-col justify-center items-center py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      {/* Background Architectural Ambient Light & Reticle Lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[180px] pointer-events-none" />
      
      {/* Decorative Lateral Technical Reticle Lines (Horizontally Centered & Symmetrically Balanced) */}
      <div className="hidden lg:flex absolute left-4 xl:left-8 2xl:left-14 top-1/2 -translate-y-1/2 flex-col items-center text-center font-mono text-[9px] tracking-[0.22em] text-zinc-500 uppercase space-y-1.5 select-none pointer-events-none">
        <div className="w-8 h-[1px] bg-zinc-800 mb-1" />
        <div>EXPLORE</div>
        <div>RELATIONSHIPS</div>
        <div>WITH TIGERGRAPH</div>
        <div className="w-12 h-[1px] bg-zinc-700/80 my-1.5" />
        <div className="text-[8px] text-zinc-600 tracking-[0.3em]">TOPOLOGY</div>
      </div>

      <div className="hidden lg:flex absolute right-4 xl:right-8 2xl:right-14 top-1/2 -translate-y-1/2 flex-col items-center text-center font-mono text-[9px] tracking-[0.22em] text-zinc-500 uppercase space-y-1.5 select-none pointer-events-none">
        <div className="w-8 h-[1px] bg-zinc-800 mb-1" />
        <div>EVIDENCE</div>
        <div>REASONING</div>
        <div>POLICY</div>
        <div>NEXT ACTIONS</div>
        <div className="w-12 h-[1px] bg-zinc-700/80 my-1.5" />
        <div className="text-[8px] text-zinc-600 tracking-[0.3em]">DECISIONS</div>
      </div>

      {/* Section Header */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-1.5 mb-3 sm:mb-4 lg:mb-5 z-10">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[38px] text-white tracking-tight leading-tight">
          Investigate with Intelligence
        </h2>

        <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          A focused workspace to investigate fraud, explore relationships, trace intelligence, and take informed action — with AI agents by your side.
        </p>
      </div>

      {/* Centerpiece Interactive Workbench Window Card */}
      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto rounded-xl border border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden z-10 flex flex-col mb-0 transition-all duration-300 hover:border-white/20">
        
        {/* Card Header Bar (Window Title Bar Chrome) */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 bg-zinc-950/80">
          
          {/* Left: Window Dots + Breadcrumbs */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* macOS / Command Center Window Control Dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-400/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-400/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
            </div>

            <div className="h-3.5 w-[1px] bg-zinc-800" />

            <div className="font-mono text-xs text-zinc-400 flex items-center gap-2">
              <span className="font-heading font-semibold text-white tracking-wider text-xs sm:text-sm">
                ZYGØS
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400 text-[11px] sm:text-xs">INVESTIGATIONS</span>
              <span className="text-zinc-600">/</span>
              <span className="text-white font-medium text-[11px] sm:text-xs">HHG-001</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono tracking-wider">
                LIVE FORENSICS
              </span>
            </div>
          </div>

          {/* Right: Engine Telemetry & Launch Action */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>TG SAVANNA: 65 TOOLS</span>
              <span className="text-zinc-600">•</span>
              <span>GROQ LPU: ACTIVE</span>
            </div>

            <button
              onClick={() => navigate('/workbench')}
              className="px-3 sm:px-3.5 py-1 sm:py-1.5 font-heading text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 rounded transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer"
            >
              <span>LAUNCH APP</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Card Body: Live Workbench Window View */}
        <div
          onClick={() => navigate('/workbench')}
          className="relative group cursor-pointer overflow-hidden bg-black flex items-center justify-center border-t border-white/[0.04]"
        >
          {/* The High-Resolution Workbench Preview Image */}
          <img
            src="/images/workbench-preview.png"
            alt="ZYGØS Autonomous Fraud Investigation Command Center"
            className="w-full h-auto max-h-[58vh] object-contain object-top transition-transform duration-500 ease-out group-hover:scale-[1.012]"
            loading="eager"
          />

          {/* Subtle Ambient Hover Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

          {/* Floating Hover Action Badge */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex justify-center pointer-events-none">
            <div className="px-4 sm:px-5 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-[11px] tracking-wider uppercase flex items-center gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-white/60 group-hover:bg-black/95 group-hover:scale-105">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLICK TO ENTER LIVE INVESTIGATION WORKBENCH</span>
              <span className="text-zinc-400 group-hover:text-white transition-colors">→</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
