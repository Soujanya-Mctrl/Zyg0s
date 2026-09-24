import React, { useState } from 'react';

export const WorkbenchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Evidence' | 'Timeline' | 'Reasoning' | 'Policy' | 'Similar Cases'>('Evidence');
  const [selectedNode, setSelectedNode] = useState<string | null>('TX-88291');

  const nodes = [
    { id: 'C-10291', label: 'Customer', sub: 'C-10291', x: '25%', y: '25%', type: 'customer' },
    { id: 'A-48291', label: 'Account', sub: 'A-48291', x: '70%', y: '25%', type: 'account' },
    { id: 'TX-88291', label: 'Transaction', sub: 'TX-88291', x: '48%', y: '50%', isCenter: true, type: 'tx' },
    { id: 'A-77182', label: 'Related Account', sub: 'A-77182', x: '18%', y: '68%', type: 'account' },
    { id: 'M-103', label: 'Merchant', sub: 'M-103', x: '35%', y: '82%', type: 'merchant' },
    { id: '172.xxx', label: 'IP Address', sub: '172.xxx.xxx', x: '65%', y: '82%', type: 'ip' },
    { id: 'D-1938', label: 'Device', sub: 'D-1938', x: '82%', y: '68%', type: 'device' },
  ];

  return (
    <div
      className="relative w-full h-full min-h-screen lg:min-h-0 flex flex-col justify-center items-center pt-14 sm:pt-16 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
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
      <div className="w-full max-w-4xl mx-auto text-center space-y-2 mb-4 lg:mb-5 z-10">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] text-white tracking-tight leading-tight">
          Investigate with Intelligence
        </h2>

        <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          A focused workspace to investigate fraud, explore relationships, trace intelligence, and take informed action — with AI agents by your side.
        </p>
      </div>

      {/* Centerpiece Interactive Workbench Card */}
      <div className="w-full max-w-6xl mx-auto rounded-xl border border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col mb-0">
        
        {/* Card Header Bar */}
        <div className="px-5 py-3.5 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4 bg-zinc-950/60">
          <div className="flex items-center gap-4">
            <span className="font-heading font-semibold text-sm tracking-wider text-white">
              ZYGOS
            </span>
            <div className="h-4 w-[1px] bg-zinc-800" />
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-2">
              <span>Investigations</span>
              <span className="text-zinc-600">&gt;</span>
              <span className="text-white font-medium">Case #Z-1024</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30">
                Investigating
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-zinc-500">
              High-risk transaction • 14 Nov 2026, 14:42
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Analyzing relationships...</span>
            </div>
            <button className="px-3 py-1 font-mono text-[11px] text-zinc-300 border border-zinc-700 hover:border-zinc-500 rounded bg-zinc-900/50 flex items-center gap-1.5">
              <span>Actions</span>
              <span>▾</span>
            </button>
          </div>
        </div>

        {/* Card Body: 3 Panes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          {/* Pane 1: Mini Sidebar (Cols 1-2) */}
          <div className="hidden lg:flex lg:col-span-2 border-r border-white/[0.06] p-3 flex-col justify-between bg-zinc-950/40 text-xs font-mono">
            <div className="space-y-4">
              <button className="w-full py-1.5 px-2.5 text-left border border-white/20 hover:border-white text-zinc-200 hover:text-white rounded bg-zinc-900/60 text-[11px] transition-colors">
                + New Investigation
              </button>

              <div className="space-y-1 text-zinc-400 text-[11px]">
                <div className="px-2.5 py-1 rounded hover:bg-white/[0.04] cursor-pointer">Home</div>
                <div className="px-2.5 py-1 rounded bg-white/10 text-white font-medium cursor-pointer">Investigations</div>
                <div className="px-2.5 py-1 rounded hover:bg-white/[0.04] cursor-pointer">Alerts</div>
                <div className="px-2.5 py-1 rounded hover:bg-white/[0.04] cursor-pointer">Graph Explorer</div>
                <div className="px-2.5 py-1 rounded hover:bg-white/[0.04] cursor-pointer">Case Memory</div>
                <div className="px-2.5 py-1 rounded hover:bg-white/[0.04] cursor-pointer">Policies</div>
                <div className="px-2.5 py-1 rounded hover:bg-white/[0.04] cursor-pointer">Reports</div>
              </div>
            </div>

            <div className="space-y-1 text-[10px] text-zinc-500 pt-4 border-t border-white/[0.06]">
              <div className="px-2.5 tracking-wider uppercase text-zinc-600 font-semibold">SAVED</div>
              <div className="px-2.5 py-0.5 hover:text-zinc-300 cursor-pointer">Watchlist</div>
              <div className="px-2.5 py-0.5 hover:text-zinc-300 cursor-pointer">Entities</div>
            </div>
          </div>

          {/* Pane 2: Center Graph Topology Canvas (Cols 3-7) */}
          <div className="lg:col-span-6 relative border-r border-white/[0.06] p-4 flex flex-col justify-between bg-black/40 min-h-[380px]">
            {/* SVG Interactive Topology Canvas */}
            <div className="relative w-full h-[340px]">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="48%" y1="50%" x2="25%" y2="25%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="48%" y1="50%" x2="70%" y2="25%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="48%" y1="50%" x2="18%" y2="68%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="48%" y1="50%" x2="35%" y2="82%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="48%" y1="50%" x2="65%" y2="82%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="48%" y1="50%" x2="82%" y2="68%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              </svg>

              {/* Graph Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNode === node.sub;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node.sub)}
                    style={{ left: node.x, top: node.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-200`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                        node.isCenter
                          ? 'bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                          : isSelected
                          ? 'bg-white/20 border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                          : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-400'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-white">
                        {node.isCenter ? '⚖' : '●'}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-300 mt-1 font-medium">
                      {node.label}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500">
                      {node.sub}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Graph Controls Bar */}
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 pt-2 border-t border-white/[0.04]">
              <div className="flex items-center gap-2">
                <button className="px-2 py-0.5 border border-zinc-800 rounded hover:bg-zinc-900 text-zinc-400">−</button>
                <button className="px-2 py-0.5 border border-zinc-800 rounded hover:bg-zinc-900 text-zinc-400">+</button>
                <button className="px-2 py-0.5 border border-zinc-800 rounded hover:bg-zinc-900 text-zinc-400">[ ]</button>
              </div>

              <div className="flex items-center gap-4 text-[9px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-[1px] bg-zinc-400" /> Direct
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-[1px] border-b border-dashed border-zinc-500" /> Related
                </span>
              </div>

              <button className="px-2.5 py-1 text-[10px] border border-white/20 hover:border-white text-zinc-300 hover:text-white rounded bg-zinc-900/60">
                Expand Graph
              </button>
            </div>
          </div>

          {/* Pane 3: Right Investigation Findings & Tabs (Cols 8-12) */}
          <div className="lg:col-span-4 p-4 flex flex-col justify-between bg-zinc-950/50">
            <div>
              {/* Finding Tabs */}
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-2 text-[11px] font-mono overflow-x-auto">
                {(['Evidence', 'Timeline', 'Reasoning', 'Policy', 'Similar Cases'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer whitespace-nowrap transition-colors ${
                      activeTab === tab ? 'text-white font-medium border-b border-white pb-1' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Findings Content Cards */}
              <div className="space-y-2.5 mt-3">
                {/* Finding 1 */}
                <div className="p-2.5 rounded border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-heading font-medium text-xs text-white">
                      High-risk transaction detected
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                      Transaction
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 mt-1">
                    Amount: $4,821 • Risk score: 0.87
                  </div>
                </div>

                {/* Finding 2 */}
                <div className="p-2.5 rounded border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-heading font-medium text-xs text-white">
                      Shared device across 4 accounts
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Graph
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 mt-1">
                    2 accounts in previous fraud cases
                  </div>
                </div>

                {/* Finding 3 */}
                <div className="p-2.5 rounded border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-heading font-medium text-xs text-white">
                      Historical fraud connection
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Case Memory
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 mt-1">
                    Case #3042 • Similarity: 87%
                  </div>
                </div>

                {/* Finding 4 */}
                <div className="p-2.5 rounded border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-heading font-medium text-xs text-white">
                      Customer identity unverified
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-500/20 text-zinc-400 border border-zinc-500/30">
                      Policy
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 mt-1">
                    Additional verification required
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-4 py-2 px-3 border border-white/20 hover:border-white bg-transparent hover:bg-white text-white hover:text-black font-heading font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2">
              <span>View Full Investigation</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
