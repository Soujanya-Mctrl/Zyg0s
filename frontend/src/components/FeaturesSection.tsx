import React from 'react';
import { ImageSlot } from './ImageSlot';

interface FeatureItem {
  id: string;
  slotNumber: string;
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  caption: string;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'investigate',
    slotNumber: '01',
    tag: 'INVESTIGATE',
    title: 'Graph-Powered Investigations',
    description:
      'Traverse multi-hop relationships across 590K+ transactions, cards, devices, and merchants on TigerGraph Savanna Cloud to expose coordinated fraud rings.',
    imageSrc: '/images/features/f36eb672-67ae-4ee1-af73-5342291e51c2.png',
    caption: 'TigerGraph Multi-Hop Topology',
  },
  {
    id: 'reason',
    slotNumber: '02',
    tag: 'REASON',
    title: 'Neuro-Symbolic Reasoning',
    description:
      'Fuses Bank Fraud Policy rules (R1-R10) with Groq LPU cognitive synthesis — quantifying epistemic uncertainty and grading evidence with zero hallucinations.',
    imageSrc: '/images/features/aaa8bbc3-5ef3-4d37-9e6f-5eba7e0588e0.png',
    caption: 'Epistemic Uncertainty Engine',
  },
  {
    id: 'act',
    slotNumber: '03',
    tag: 'ACT',
    title: 'Next-Best Action Protocol',
    description:
      'Formulate defensible mitigation routes: acquire missing evidence, enforce Step-Up Auth, freeze accounts, or route to L1/L2 approval queues.',
    imageSrc: '/images/features/16d69dda-0431-4b16-bffd-5d1f80bb3086.png',
    caption: 'Autonomous 2-Stage NBA Protocol',
  },
  {
    id: 'memory',
    slotNumber: '04',
    tag: 'MEMORY',
    title: 'Graph-Native Episodic Memory',
    description:
      'TigerGraph IS the memory. Fuses 384-dimensional dense semantic vectors with structural graph topology to instantly recall closed case precedents.',
    imageSrc: '/images/features/4136b25e-4e90-451b-b429-9edb46c1d04e.png',
    caption: 'TigerGraph Reciprocal Rank Fusion',
  },
  {
    id: 'swarm',
    slotNumber: '05',
    tag: 'SWARM',
    title: '7-Agent Collaborative Swarm',
    description:
      'Seven specialized autonomous agents — Lead Investigator, Graph Scout, Anomaly Profiler, Uncertainty Assessor, Policy Governor, Compliance Officer, and Memory Weaver.',
    imageSrc: '/images/features/4e5bf2eb-1018-4d31-b261-1b46b1459276.png',
    caption: 'Multi-Agent Pipeline Swarm',
  },
  {
    id: 'compliance',
    slotNumber: '06',
    tag: 'COMPLIANCE',
    title: 'Audit-Defensible FinCEN SARs',
    description:
      'Generates legal-grade FinCEN Suspicious Activity Reports (SARs) answering the 5 W’s with immutable graph lineage and defensible evidence grades.',
    imageSrc: '/images/features/d477f376-5858-44c4-98bd-a34371b4ffb0.png',
    caption: 'Regulatory-Grade Auditability',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section
      id="features"
      className="relative min-h-screen w-full bg-[#FFFFFF] text-[#000000] flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-24 sm:pb-28 lg:pb-32 px-6 sm:px-12 lg:px-20 select-none"
    >
      {/* Top Header Row */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 lg:mb-24 z-10">
        {/* Left: Features */}
        <div className="lg:col-span-6 space-y-3">
          <h2 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-black leading-none">
            Features
          </h2>
        </div>

        {/* Right: Subtitle & Star Sparkle Icon */}
        <div className="lg:col-span-6 flex items-start justify-between gap-6 pt-4 lg:pt-6">
          <p className="font-body text-zinc-600 text-sm sm:text-base max-w-md leading-relaxed">
            A complete agentic fraud investigation platform — 6 core architectural pillars designed for analysts, built for complex financial fraud, and powered by TigerGraph Savanna Cloud.
          </p>

          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black animate-sparkle">
              <path d="M12 0L13.8 8.8L22 12L13.8 15.2L12 24L10.2 15.2L2 12L10.2 8.8L12 0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 6 Features Grid (3 Columns x 2 Rows) with Generous Negative Spacing & No Horizontal Rules */}
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-16 lg:gap-y-20 flex-1 z-10">
        {FEATURES_DATA.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col justify-between group"
          >
            {/* Header & Copy */}
            <div className="flex flex-col mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase mb-3">
                <span className="font-semibold text-black">{feature.slotNumber}</span>
                <span className="text-zinc-400 font-light">/</span>
                <span>{feature.tag}</span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-[25px] text-black tracking-tight leading-snug mb-3 group-hover:text-zinc-700 transition-colors">
                {feature.title}
              </h3>

              <p className="font-body text-zinc-600 text-xs sm:text-[13.5px] leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </div>

            {/* Feature Artwork Slot */}
            <ImageSlot
              src={feature.imageSrc}
              alt={feature.title}
              slotNumber={feature.slotNumber}
              caption={feature.caption}
              aspectRatio="aspect-[4.5/3]"
              className="mt-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
