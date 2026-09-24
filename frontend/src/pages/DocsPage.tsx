import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Copy,
  Check,
  ArrowLeft,
  ArrowUpRight,
  Database,
  Cpu,
  ShieldAlert,
  Activity,
  CheckCircle2,
  Terminal,
  Scale,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

interface DocSection {
  id: string;
  category: string;
  categoryNum: string;
  title: string;
}

const DOC_SECTIONS: DocSection[] = [
  // 01 / INTRODUCTION
  { id: 'overview', category: 'GETTING STARTED', categoryNum: '01', title: 'Platform Overview & Mission' },
  { id: 'architecture', category: 'GETTING STARTED', categoryNum: '01', title: 'Neuro-Symbolic Architecture' },
  { id: 'quickstart', category: 'GETTING STARTED', categoryNum: '01', title: 'Installation & Quickstart' },

  // 02 / AGENT PIPELINE
  { id: 'seven-agents', category: 'AGENT PIPELINE', categoryNum: '02', title: 'The 7 Specialized Agents' },
  { id: 'agent-trace', category: 'AGENT PIPELINE', categoryNum: '02', title: 'Execution Trace & Telemetry' },
  { id: 'cognitive-layer', category: 'AGENT PIPELINE', categoryNum: '02', title: 'Groq LPU Cognitive Reasoning' },

  // 03 / TIGERGRAPH GSQL
  { id: 'graph-schema', category: 'TIGERGRAPH & GSQL', categoryNum: '03', title: 'Graph Schema & Topology' },
  { id: 'gsql-algorithms', category: 'TIGERGRAPH & GSQL', categoryNum: '03', title: 'Core GSQL Algorithms' },
  { id: 'mcp-integration', category: 'TIGERGRAPH & GSQL', categoryNum: '03', title: 'Model Context Protocol (MCP)' },

  // 04 / BANK FRAUD POLICY
  { id: 'policy-matrix', category: 'POLICY & NBA', categoryNum: '04', title: 'Bank Fraud Policy (R1–R10)' },
  { id: 'uncertainty-math', category: 'POLICY & NBA', categoryNum: '04', title: 'Uncertainty Quantification Math' },
  { id: 'two-stage-nba', category: 'POLICY & NBA', categoryNum: '04', title: '2-Stage Next Best Action & HITL' },

  // 05 / COMPLIANCE & AUDIT
  { id: 'fincen-sar', category: 'COMPLIANCE & AUDIT', categoryNum: '05', title: 'FinCEN SAR Narrative Generation' },
  { id: 'audit-defense', category: 'COMPLIANCE & AUDIT', categoryNum: '05', title: 'Evidence Grading & Defensibility' },

  // 06 / API & BENCHMARKS
  { id: 'rest-api', category: 'API & EVALUATION', categoryNum: '06', title: 'REST API Reference' },
  { id: 'benchmarks', category: 'API & EVALUATION', categoryNum: '06', title: '20-Case Benchmark Suite' },
];

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded border border-white/[0.1] bg-black overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] bg-white/[0.02] text-zinc-400 text-[10px] tracking-widest uppercase">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <Terminal size={12} className="text-white" />
          <span>{language}</span>
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? <Check size={11} className="text-white" /> : <Copy size={11} />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-zinc-300 leading-relaxed font-mono">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

export function DocsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string>('overview');
  const contentRef = useRef<HTMLDivElement>(null);

  // Group sections by category
  const categories = useMemo(() => {
    const map = new Map<string, { categoryNum: string; sections: DocSection[] }>();
    DOC_SECTIONS.forEach((sec) => {
      if (!map.has(sec.category)) {
        map.set(sec.category, { categoryNum: sec.categoryNum, sections: [] });
      }
      map.get(sec.category)!.sections.push(sec);
    });
    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      num: data.categoryNum,
      sections: data.sections,
    }));
  }, []);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return DOC_SECTIONS;
    const q = searchQuery.toLowerCase();
    return DOC_SECTIONS.filter(
      (s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Scrollspy observer for active section tracking
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + 140;
      for (const sec of DOC_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(sec.id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el && contentRef.current) {
      const targetY = el.offsetTop - 24;
      contentRef.current.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white font-body selection:bg-white selection:text-black flex flex-col overflow-hidden">
      {/* Background Noise & Monochromatic Technical Grid */}
      <div className="fixed inset-0 bg-tech-grid opacity-30 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-noise opacity-20 pointer-events-none z-0" />

      {/* Top Header / Fixed Monochromatic Navigation */}
      <header className="h-16 shrink-0 border-b border-white/[0.08] bg-black/95 backdrop-blur-md px-6 sm:px-12 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-3 text-white hover:text-zinc-300 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 0L13.8 8.8L22 12L13.8 15.2L12 24L10.2 15.2L2 12L10.2 8.8L12 0Z" />
            </svg>
            <span className="font-heading font-bold text-lg tracking-[0.25em] uppercase">ZYGOS</span>
          </Link>

          <span className="text-zinc-700 hidden sm:inline">|</span>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
            <BookOpen size={13} className="text-white" />
            <span className="text-white font-semibold">DOCUMENTATION</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">TECHNICAL SPECIFICATION</span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specs, rules, APIs..."
              className="w-full pl-8 pr-3 py-1.5 rounded bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
            />
            {searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded bg-black border border-white/15 shadow-2xl space-y-1 max-h-60 overflow-y-auto no-scrollbar z-50">
                {filteredSections.length > 0 ? (
                  filteredSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        scrollToSection(sec.id);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded text-xs font-mono hover:bg-white/10 text-zinc-300 hover:text-white flex items-center justify-between"
                    >
                      <span className="truncate">{sec.title}</span>
                      <span className="text-[9px] text-zinc-400 uppercase font-bold">{sec.categoryNum}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-2 py-2 text-xs font-mono text-zinc-500">No matching sections found.</div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/workbench')}
            className="px-4 py-2 border border-white/20 hover:border-white bg-transparent hover:bg-white text-white hover:text-black font-heading text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>LAUNCH APP</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </header>

      {/* Main Content Layout with Locked Monochromatic Sidebar */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative z-10">
        {/* Left Locked Sidebar */}
        <aside className="hidden lg:block w-72 xl:w-80 shrink-0 h-full border-r border-white/[0.08] bg-[#09090d] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none p-6 pb-12">
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 tracking-[0.22em] uppercase">
                  <span className="text-white font-bold">{cat.num}</span>
                  <span className="text-zinc-700">/</span>
                  <span className="font-semibold text-zinc-400">{cat.name}</span>
                </div>

                <div className="space-y-1 pl-2 border-l border-white/[0.08]">
                  {cat.sections.map((sec) => {
                    const isActive = activeId === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left py-1.5 px-3 rounded font-mono text-xs tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-white/10 text-white font-bold border-l-2 border-white -ml-[9px] shadow-[0_0_12px_rgba(255,255,255,0.1)]'
                            : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]'
                        }`}
                      >
                        <span className="truncate">{sec.title}</span>
                        {isActive && <ChevronRight size={12} className="text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Main Documentation Body */}
        <main
          ref={contentRef}
          className="flex-1 h-full overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex flex-col justify-between"
        >
          <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 py-10 pb-24 w-full space-y-20">
          {/* ============================================================ */}
          {/* SECTION 01: GETTING STARTED */}
          {/* ============================================================ */}
          <section id="overview" className="space-y-6 pt-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">01</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>GETTING STARTED</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Platform Overview & Mission
            </h1>

            <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
              <strong className="text-white">ZYGØS</strong> is an autonomous, explainable fraud defense system purpose-built for the{' '}
              <span className="text-white font-semibold underline decoration-white/30 underline-offset-4">TigerGraph AI Agent Hackathon (HHGOA Track)</span>. It fuses the deterministic rigor of{' '}
              <strong>TigerGraph Savanna Cloud GSQL graph algorithms</strong> and strict <strong>Bank Fraud Policy v1.0 (Rules R1–R10)</strong> with a{' '}
              <strong>Groq LPU neural reasoning layer</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded border border-white/[0.1] bg-black">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Database size={13} className="text-white" /> TigerGraph Core
                </div>
                <div className="text-lg font-heading font-bold text-white">590,540 TXs</div>
                <div className="text-xs text-zinc-400 mt-1">Multi-hop graph topology on Savanna Cloud with sub-50ms query traversals.</div>
              </div>

              <div className="p-4 rounded border border-white/[0.1] bg-black">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Activity size={13} className="text-white" /> Uncertainty Metric
                </div>
                <div className="text-lg font-heading font-bold text-white">U ∈ [0.0, 1.0]</div>
                <div className="text-xs text-zinc-400 mt-1">Mathematical quantification preventing false-positive customer card bans.</div>
              </div>

              <div className="p-4 rounded border border-white/[0.1] bg-black">
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Scale size={13} className="text-white" /> FinCEN SAR Ready
                </div>
                <div className="text-lg font-heading font-bold text-white">100% Defensible</div>
                <div className="text-xs text-zinc-400 mt-1">Immutable audit trails with Direct, Circumstantial, and Correlative evidence grading.</div>
              </div>
            </div>
          </section>

          {/* Architecture Section */}
          <section id="architecture" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">01.2</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>SYSTEM ARCHITECTURE</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Neuro-Symbolic Hybrid Design
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Traditional LLMs suffer from probabilistic hallucinations and lack mathematical grounding for financial compliance. 
              Conversely, pure rules engines fail when confronted with novel fraud topologies. ZYGØS solves this via a dual-plane neuro-symbolic design:
            </p>

            {/* Monochromatic ASCII Architecture Diagram */}
            <div className="p-5 rounded border border-white/[0.12] bg-black font-mono text-[11px] leading-snug overflow-x-auto text-zinc-300 shadow-[0_0_20px_rgba(0,0,0,0.9)]">
              <pre className="text-white font-bold mb-2">┌─────────────────────────────────────────────────────────────────────────────┐</pre>
              <pre className="text-white font-bold">│                         ZYGØS DUAL-PLANE ARCHITECTURE                       │</pre>
              <pre className="text-white font-bold mb-3">└─────────────────────────────────────────────────────────────────────────────┘</pre>
              <pre className="text-zinc-500">                     ┌───────────────────────────────┐</pre>
              <pre className="text-zinc-400">                     │  Incoming Trigger Event / TX  │</pre>
              <pre className="text-zinc-500">                     └───────────────┬───────────────┘</pre>
              <pre className="text-zinc-600">                                     │</pre>
              <pre className="text-zinc-500">       ┌─────────────────────────────┴─────────────────────────────┐</pre>
              <pre className="text-zinc-500">       ▼                                                           ▼</pre>
              <pre className="text-white font-bold"> ┌───────────────────────────────┐           ┌───────────────────────────────┐</pre>
              <pre className="text-white font-bold"> │ DETERMINISTIC SYMBOLIC PLANE  │           │    NEURAL COGNITIVE PLANE     │</pre>
              <pre className="text-white font-bold"> ├───────────────────────────────┤           ├───────────────────────────────┤</pre>
              <pre className="text-zinc-300"> │ • TigerGraph Savanna Cloud    │           │ • Groq LPU (Qwen-27B / Mixtral│</pre>
              <pre className="text-zinc-300"> │ • 65 Registered MCP Tools     │   Trace   │ • GraphRAG Episodic Memory    │</pre>
              <pre className="text-zinc-300"> │ • Bank Fraud Policy (R1-R10)  │ ◄───────► │ • FinCEN SAR Narrative Synth  │</pre>
              <pre className="text-zinc-300"> │ • GSQL Community Louvain      │ Context   │ • Plain-English Copilot Intel │</pre>
              <pre className="text-zinc-300"> │ • PageRank & Shortest Path    │           │ • Zero-Config Fallback Safe   │</pre>
              <pre className="text-white font-bold"> └───────────────┬───────────────┘           └───────────────┬───────────────┘</pre>
              <pre className="text-zinc-600">                 │                                           │</pre>
              <pre className="text-zinc-500">                 └─────────────────────┬─────────────────────┘</pre>
              <pre className="text-zinc-600">                                       ▼</pre>
              <pre className="text-white font-bold">                 ┌───────────────────────────────────────────┐</pre>
              <pre className="text-white font-bold">                 │  2-STAGE NEXT BEST ACTION (NBA) HARNESS   │</pre>
              <pre className="text-white font-bold">                 ├───────────────────────────────────────────┤</pre>
              <pre className="text-zinc-300">                 │ Stage 1: Step-Up OTP Challenge (U &gt; 0.40) │</pre>
              <pre className="text-zinc-300">                 │ Stage 2: Uncertainty Collapse or Block    │</pre>
              <pre className="text-zinc-300">                 │ HITL: Discretionary Analyst Override Log  │</pre>
              <pre className="text-white font-bold">                 └───────────────────────────────────────────┘</pre>
            </div>
          </section>

          {/* Quickstart Section */}
          <section id="quickstart" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">01.3</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>GETTING STARTED</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Installation & Quickstart
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Clone the repository, configure your environment secrets, and launch both the backend API and frontend interactive workbench:
            </p>

            <div className="space-y-4">
              <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">1. Clone & Set Up Python Environment</h3>
              <CodeBlock
                language="bash"
                code={`git clone https://github.com/Soujanya-Mctrl/Zyg0s.git
cd Zyg0s

# Create and activate virtual environment
python -m venv venv
./venv/Scripts/activate  # On Linux/macOS: source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt`}
              />

              <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">2. Configure Environment Variables (`.env`)</h3>
              <CodeBlock
                language="env"
                code={`# TigerGraph Savanna Cloud Credentials
TG_HOST=https://zygos-fraud.i.tgcloud.io
TG_USERNAME=tigergraph
TG_PASSWORD=your_tigergraph_password
TG_GRAPH=AntiFraudNetwork
TG_SECRET=your_restpp_secret

# AI Cognitive Engine (Groq Cloud LPU)
GROQ_API_KEY=gsk_your_groq_api_key
GROQ_MODEL=qwen-2.5-32b  # or mixtral-8x7b-32768`}
              />

              <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">3. Launch Backend & Frontend Servers</h3>
              <CodeBlock
                language="bash"
                code={`# Terminal 1: Launch FastAPI Backend (Port 8000)
python -m uvicorn src.api.server:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2: Launch Vite React Frontend (Port 3000)
cd frontend
npm install
npm run dev`}
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 02: THE 7 AUTONOMOUS AGENTS */}
          {/* ============================================================ */}
          <section id="seven-agents" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">02.1</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>AGENT PIPELINE</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              The 7 Specialized Neuro-Symbolic Agents
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Rather than a monolithic prompt, ZYGØS partitions the investigative lifecycle into 7 discrete, auditable micro-agents. 
              Each agent has strict role boundaries, deterministic fallback behavior, and structured hand-off outputs:
            </p>

            <div className="space-y-4">
              {/* Agent 1 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={14} className="text-white" />
                    <span className="font-mono font-bold text-sm text-white uppercase">Agent 01: Alert Sentinel</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded border border-white/20 bg-white/[0.04]">
                    STAGE: TRIGGER & TRIAGE
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ingests live incoming transactions or analyst triggers. Anchors the primary transaction vertex in TigerGraph, computes initial Z-score anomaly bounds, and determines if investigative triage priority exceeds $0.15$.
                </p>
              </div>

              {/* Agent 2 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-white" />
                    <span className="font-mono font-bold text-sm text-white uppercase">Agent 02: Graph Scout</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded border border-white/20 bg-white/[0.04]">
                    STAGE: MULTI-HOP EXPANSION
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Executes 2-hop BFS graph expansion starting from the transaction seed. Discovers connected customer accounts, card numbers, IP subnets, device hashes, and shared merchant hubs. Computes graph threat density.
                </p>
              </div>

              {/* Agent 3 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-white" />
                    <span className="font-mono font-bold text-sm text-white uppercase">Agent 03: Evidence Assessor</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded border border-white/20 bg-white/[0.04]">
                    STAGE: UNCERTAINTY QUANTIFICATION
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Grades graph signals into three legal defensibility tiers: <strong>Direct</strong>, <strong>Circumstantial</strong>, and <strong>Correlative</strong>.{' '}
                  Computes Bayesian fraud probability <em>P(Fraud)</em> and mathematical uncertainty <em>U</em>. Flags whether step-up authentication is mandatory.
                </p>
              </div>

              {/* Agent 4 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-white" />
                    <span className="font-mono font-bold text-sm text-white uppercase">Agent 04: Pattern Strategist</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded border border-white/20 bg-white/[0.04]">
                    STAGE: TOPOLOGICAL PATTERN MATCHING
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Correlates active graph topology against known adversarial crime vectors: Mule Rings (fan-in / fan-out cycles), Device Farm Swarms, Subnet Velocity Floods, and Card Cycling.
                </p>
              </div>

              {/* Agent 5 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-white" />
                    <span className="font-mono font-bold text-sm text-white uppercase">Agent 05: Policy Governor</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded border border-white/20 bg-white/[0.04]">
                    STAGE: STRICT POLICY ENFORCEMENT
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Evaluates <strong>Bank Fraud Policy v1.0 (Rules R1 through R10)</strong> deterministically. Enforces approval routing boundaries (L1 automated approval vs. L2 mandatory human escalation).
                </p>
              </div>

              {/* Agent 6 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={14} className="text-white" />
                    <span className="font-mono font-bold text-sm text-white uppercase">Agent 06: Compliance Officer</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded border border-white/20 bg-white/[0.04]">
                    STAGE: FINCEN SAR SYNTHESIS
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  If fraud is confirmed (<em>P(Fraud)</em> &ge; 0.85 or step-up failure), drafts a legally compliant <strong>FinCEN Suspicious Activity Report (SAR)</strong> narrative detailing who, what, when, where, why, and how.
                </p>
              </div>

              {/* Agent 7 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-white" />
                    <span className="font-mono font-bold text-sm text-white uppercase">Agent 07: Memory Weaver</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-300 px-2 py-0.5 rounded border border-white/20 bg-white/[0.04]">
                    STAGE: EPISODIC CASE MEMORY & GRAPHRAG
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Stores closed investigative decisions into TigerGraph episodic memory. Queries historical 4-month closed case records using GraphRAG to identify repeat offenders and emerging syndicate clusters.
                </p>
              </div>
            </div>
          </section>

          {/* Trace & Telemetry */}
          <section id="agent-trace" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">02.2</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>AGENT PIPELINE</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Execution Trace & Telemetry Schema
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Every step executed by the agent pipeline generates an immutable telemetry record consumed directly by Region 04 of the workbench:
            </p>

            <CodeBlock
              language="json"
              code={`{
  "step": 3,
  "agent_id": "evidence_assessor",
  "agent_name": "Evidence Assessor",
  "role": "Uncertainty Quantification & Evidence Grading",
  "hand_off_summary": "Graded 1 signals: P(Fraud)=0.21, U=0.670. Step-up needed: True.",
  "ai_reasoning": "Direct evidence indicates location match; however, high transaction volume deviation introduces epistemic uncertainty. Recommending SMS OTP challenge.",
  "latency_ms": 142.8,
  "status": "pending",
  "timestamp": "2026-09-24T23:05:12.441Z"
}`}
            />
          </section>

          {/* Cognitive Layer */}
          <section id="cognitive-layer" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">02.3</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>AGENT PIPELINE</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Groq LPU Cognitive Reasoning
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              ZYGØS leverages the <strong>Groq LPU Inference Engine</strong> running open models (Qwen-2.5-32B or Mixtral-8x7B) for sub-second token generation. 
              The LLM is strictly constrained:
            </p>

            <ul className="list-disc pl-5 text-sm text-zinc-400 space-y-2 max-w-3xl">
              <li><strong className="text-white">Facts Only from Graph</strong>: The LLM cannot invent customer names, balances, or transaction amounts. All entity variables are injected directly from TigerGraph GSQL query outputs.</li>
              <li><strong className="text-white">Executive Explanations</strong>: Summarizes technical graph relationships into plain English for non-technical bank investigators.</li>
              <li><strong className="text-white">Zero-Config Deterministic Fallback</strong>: If the Groq API key is missing or encounters a timeout, the pipeline seamlessly falls back to 100% deterministic rule templates without throwing errors.</li>
            </ul>
          </section>

          {/* ============================================================ */}
          {/* SECTION 03: TIGERGRAPH & GSQL */}
          {/* ============================================================ */}
          <section id="graph-schema" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">03.1</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>TIGERGRAPH & GSQL</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Graph Schema & Entity Topology
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              The graph database is hosted on <strong>TigerGraph Savanna Cloud</strong> under the graph name <code className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">AntiFraudNetwork</code>. 
              It models transactions, entities, and devices derived from the IEEE-CIS / Vesta financial fraud benchmark:
            </p>

            <div className="p-4 rounded border border-white/[0.1] bg-black font-mono text-xs text-zinc-300 space-y-2">
              <div className="text-white font-bold uppercase mb-2">VERTEX & EDGE DEFINITIONS (GSQL DDL)</div>
              <div>• <span className="text-white font-bold">VERTEX Transaction</span> (PRIMARY_ID id STRING, amount DOUBLE, timestamp INT, is_fraud BOOL, risk_score DOUBLE)</div>
              <div>• <span className="text-white font-bold">VERTEX Customer</span> (PRIMARY_ID id STRING, email STRING, risk_tier STRING)</div>
              <div>• <span className="text-white font-bold">VERTEX Card</span> (PRIMARY_ID card_num STRING, card_type STRING, issuer STRING)</div>
              <div>• <span className="text-white font-bold">VERTEX Device</span> (PRIMARY_ID device_id STRING, device_info STRING, os STRING)</div>
              <div>• <span className="text-white font-bold">VERTEX IPAddress</span> (PRIMARY_ID ip STRING, subnet STRING, country STRING)</div>
              <div>• <span className="text-white font-bold">VERTEX Merchant</span> (PRIMARY_ID id STRING, name STRING, mcc STRING)</div>
              <div className="pt-2 text-zinc-500">• <span className="text-white font-bold">EDGES:</span> OWNS_CARD, MADE_TX, USED_DEVICE, FROM_IP, TO_MERCHANT, ASSOCIATED_WITH</div>
            </div>
          </section>

          {/* GSQL Algorithms */}
          <section id="gsql-algorithms" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">03.2</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>TIGERGRAPH & GSQL</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Core GSQL Graph Algorithms
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              TigerGraph executes parallel graph algorithms written in GSQL, compiling directly to C++ binaries for high-throughput performance across millions of vertices:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-white/[0.1] bg-black">
                <div className="font-mono text-xs text-white font-bold uppercase mb-1">tg_mule_ring_detect</div>
                <div className="text-xs text-zinc-400 leading-relaxed">
                  Identifies cyclic transfer topologies and card-cycling hubs where $\ge 4$ independent payment cards route funds through a single shared physical device.
                </div>
              </div>

              <div className="p-4 rounded border border-white/[0.1] bg-black">
                <div className="font-mono text-xs text-white font-bold uppercase mb-1">tg_pagerank</div>
                <div className="text-xs text-zinc-400 leading-relaxed">
                  Calculates structural centrality across merchant nodes and IP subnets to determine whether an entity acts as a syndicate aggregation funnel.
                </div>
              </div>

              <div className="p-4 rounded border border-white/[0.1] bg-black">
                <div className="font-mono text-xs text-white font-bold uppercase mb-1">tg_community_louvain</div>
                <div className="text-xs text-zinc-400 leading-relaxed">
                  Partitions the global graph into dense modularity clusters, uncovering covert syndicate rings operating across disparate geographic regions.
                </div>
              </div>

              <div className="p-4 rounded border border-white/[0.1] bg-black">
                <div className="font-mono text-xs text-white font-bold uppercase mb-1">tg_shortest_path</div>
                <div className="text-xs text-zinc-400 leading-relaxed">
                  Computes BFS distance between suspect transactions and confirmed fraud anchor vertices in 4-month closed case history.
                </div>
              </div>
            </div>
          </section>

          {/* MCP Integration */}
          <section id="mcp-integration" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">03.3</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>TIGERGRAPH & GSQL</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Model Context Protocol (MCP) Integration
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              ZYGØS exposes TigerGraph database queries to AI agents via the official <strong>Model Context Protocol (MCP)</strong>. 
              The platform registers 65+ specialized graph tools enabling autonomous multi-hop queries, schema introspection, and loading pipelines:
            </p>

            <CodeBlock
              language="json"
              code={`{
  "mcpServers": {
    "tigergraph-fraud": {
      "command": "python",
      "args": ["src/mcp_server.py"],
      "env": {
        "TG_HOST": "https://zygos-fraud.i.tgcloud.io",
        "TG_GRAPH": "AntiFraudNetwork"
      }
    }
  }
}`}
            />
          </section>

          {/* ============================================================ */}
          {/* SECTION 04: BANK FRAUD POLICY (R1–R10) */}
          {/* ============================================================ */}
          <section id="policy-matrix" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">04.1</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>POLICY & NBA</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Bank Fraud Policy Specification (Rules R1 – R10)
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Every decision produced by ZYGØS maps directly to a deterministic rule in <strong>Bank Fraud Policy v1.0</strong>. 
              Rules dictate whether an alert triggers automatic step-up, immediate account freeze, or compliance escalation:
            </p>

            <div className="overflow-x-auto rounded border border-white/[0.1] bg-black">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.1] bg-white/[0.02] text-zinc-400 text-[10px] tracking-widest uppercase">
                    <th className="p-3">Rule</th>
                    <th className="p-3">Trigger Condition</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Route</th>
                    <th className="p-3">Certainty Threshold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R1</td>
                    <td className="p-3 font-sans">Card Velocity Spike (&gt;3 TX in 1 hour)</td>
                    <td className="p-3 text-white">CHALLENGE_SMS_OTP</td>
                    <td className="p-3 font-bold text-white">L1</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.65, U &gt; 0.40</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R2</td>
                    <td className="p-3 font-sans">Cross-Border Geographical Impossible Travel (&gt;800 km/h)</td>
                    <td className="p-3 text-white">TEMPORARY_CARD_HOLD</td>
                    <td className="p-3 font-bold text-white">L1</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.75, U &le; 0.30</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R3</td>
                    <td className="p-3 font-sans">High-Value First-Time Merchant (&gt;$1,000 on new merchant)</td>
                    <td className="p-3 text-white">VERIFY_WITH_CUSTOMER</td>
                    <td className="p-3 font-bold text-white">L1</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.60, U &gt; 0.40</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R4</td>
                    <td className="p-3 font-sans">Shared Device Mule Ring (&ge;4 cards on single device)</td>
                    <td className="p-3 text-white font-bold">BLOCK_ALL_CARDS + SAR</td>
                    <td className="p-3 font-bold text-white">L2</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.90, U &le; 0.20</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R5</td>
                    <td className="p-3 font-sans">High-Risk MCC Category (Crypto MCC 6051 / Casino MCC 7995)</td>
                    <td className="p-3 text-white">STEP_UP_BIOMETRIC</td>
                    <td className="p-3 font-bold text-white">L1</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.70, U &gt; 0.35</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R6</td>
                    <td className="p-3 font-sans">Disposable / Anonymous Email Domain Cluster</td>
                    <td className="p-3 text-white">ENFORCE_SECONDARY_ID</td>
                    <td className="p-3 font-bold text-white">L1</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.55, U &gt; 0.40</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R7</td>
                    <td className="p-3 font-sans">IP Subnet Velocity Attack (&ge;10 tx from /24 subnet)</td>
                    <td className="p-3 text-white font-bold">BLACKLIST_SUBNET + ESCALATE</td>
                    <td className="p-3 font-bold text-white">L2</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.88, U &le; 0.25</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R8</td>
                    <td className="p-3 font-sans">Extreme Amount Outlier (Z-Score &gt; 3.0 relative to history)</td>
                    <td className="p-3 text-white">STEP_UP_OTP</td>
                    <td className="p-3 font-bold text-white">L1</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.65, U &gt; 0.40</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R9</td>
                    <td className="p-3 font-sans">Rapid Card Cycling on Single Merchant (Card Testing)</td>
                    <td className="p-3 text-white font-bold">FREEZE_MERCHANT_TERMINAL</td>
                    <td className="p-3 font-bold text-white">L2</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.85, U &le; 0.20</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-white">R10</td>
                    <td className="p-3 font-sans">Historical Closed Case Recidivism Match (4-Month Memory)</td>
                    <td className="p-3 text-white font-bold">IMMEDIATE_REVOCATION + SAR</td>
                    <td className="p-3 font-bold text-white">L2</td>
                    <td className="p-3 text-zinc-400">P &ge; 0.95, U &le; 0.10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Uncertainty Math */}
          <section id="uncertainty-math" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">04.2</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>POLICY & NBA</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Mathematical Uncertainty Quantification
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              High-stakes fraud investigation requires understanding not just <em>probability</em>, but <strong>confidence and epistemic uncertainty</strong>.{' '}
              When evidence is ambiguous, <em>P(Fraud)</em> &asymp; 0.50, uncertainty <em>U</em> reaches maximum:
            </p>

            <div className="p-5 rounded border border-white/[0.12] bg-black font-mono text-sm space-y-3">
              <div className="text-zinc-500 text-xs uppercase tracking-widest">Uncertainty Formulation:</div>
              <div className="text-white text-base font-bold tracking-wider">
                U = 1.0 - |2.0 · P(Fraud) - 1.0| + U_graph
              </div>
              <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                Where <code className="text-white">U_graph</code> accounts for graph density penalties: missing device IDs ($+0.15$), new merchant nodes with no prior history ($+0.10$), or unverified email domains ($+0.05$).
              </div>
            </div>

            <div className="p-4 rounded border border-white/[0.1] bg-white/[0.02] text-xs text-zinc-300 space-y-1 font-sans">
              <strong className="text-white font-mono uppercase">The Uncertainty Threshold Law:</strong>
              <p className="text-zinc-400">
                If $U &gt; 0.40$, the system is strictly prohibited from executing permanent destructive actions (such as account closures or irreversible card cancellations). 
                Instead, it must route to Stage 1 of the Next Best Action harness to gather step-up evidence.
              </p>
            </div>
          </section>

          {/* 2-Stage NBA & HITL */}
          <section id="two-stage-nba" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">04.3</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>POLICY & NBA</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              2-Stage Next Best Action (NBA) & Human-in-the-Loop
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              To satisfy both customer experience and regulatory governance, ZYGØS executes actions in two distinct stages:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="font-mono text-xs text-white font-bold uppercase">Stage 1: Step-Up Challenge</div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  The initial response when $U &gt; 0.40$. Challenges the cardholder via SMS OTP, biometric push, or interactive voice. 
                  Keeps the customer account active while isolating risk.
                </p>
              </div>

              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="font-mono text-xs text-white font-bold uppercase">Stage 2: Uncertainty Collapse</div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Once step-up challenge resolves:
                  <br />• <strong>PASS</strong>: Uncertainty collapses ($U \le 0.05$), transaction cleared (<code className="text-white">CLOSE_NO_FRAUD</code>).
                  <br />• <strong>FAIL</strong>: Fraud risk spikes to $&gt;92\%$, accounts frozen (<code className="text-white font-bold">BLOCK_ALL_CARDS</code>), FinCEN SAR filed.
                </p>
              </div>
            </div>

            <div className="p-4 rounded border border-white/[0.12] bg-white/[0.02] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase">
                <ShieldAlert size={14} className="text-white" />
                <span>Analyst Discretionary Override (Human-in-the-Loop)</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                At any point during an investigation, an authorized fraud analyst can trigger a <strong>Human Cognitive Override</strong>. 
                The system immediately halts automated routing, enforces the analyst's selected containment action, and generates an immutable regulatory log citing the analyst's ID and forensic rationale.
              </p>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 05: FINCEN SAR & AUDIT DEFENSE */}
          {/* ============================================================ */}
          <section id="fincen-sar" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">05.1</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>COMPLIANCE & AUDIT</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              FinCEN Suspicious Activity Report (SAR)
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Under federal AML / BSA banking regulations, suspected financial fraud exceeding specific thresholds requires filing a 
              <strong>Suspicious Activity Report (SAR)</strong> with the Financial Crimes Enforcement Network (FinCEN). 
              ZYGØS generates audit-grade, narrative-complete filings automatically:
            </p>

            <CodeBlock
              language="markdown"
              code={`### SUSPICIOUS ACTIVITY REPORT (FINCEN NARRATIVE SECTION)
**Filing Institution**: ZYGØS National Autonomous Defense Node
**Primary Subject**: C12382 (Customer ID)
**Associated Cards**: C12382-K1, C12382-K4
**Suspect Device Hash**: DEV-77034 (iPhone 15 Pro, iOS 17.4)

1. **CHRONOLOGICAL SUMMARY**:
On September 24, 2026, subject attempted transaction #3514030 ($77.07) at Crypto Merchant #M9104. 
Subsequent step-up SMS OTP challenge failed after two consecutive timeouts.

2. **TIGERGRAPH TOPOLOGICAL FINDINGS**:
Multi-hop traversal revealed DEV-77034 is co-located with 4 previously flagged accounts (Mule Ring cluster #MR-09). 
Graph Louvain modularity score: 0.841 (indicative of organized criminal ring participation).

3. **POLICY VIOLATIONS**:
• Rule R4: Shared Device Mule Ring (≥4 cards on single device).
• Rule R5: High-Risk MCC Merchant (MCC 6051).

4. **CONTAINMENT ACTIONS TAKEN**:
Accounts frozen, payment instruments revoked, primary device blacklisted.`}
            />
          </section>

          {/* Evidence Grading & Defensibility */}
          <section id="audit-defense" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">05.2</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>COMPLIANCE & AUDIT</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              Evidence Grading & Regulatory Defensibility
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              To withstand external banking regulatory audits, ZYGØS classifies every claim into three formal evidentiary grades:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-1">
                <div className="font-mono text-xs text-white font-bold uppercase">GRADE A: DIRECT</div>
                <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Cryptographically verified or physical truth (e.g., OTP entered correctly, biometric pass, verified bank card hash match).
                </div>
              </div>

              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-1">
                <div className="font-mono text-xs text-zinc-300 font-bold uppercase">GRADE B: CIRCUMSTANTIAL</div>
                <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Strong topological inference (e.g., impossible geographic velocity, shared device hardware hash, new high-risk merchant).
                </div>
              </div>

              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-1">
                <div className="font-mono text-xs text-zinc-400 font-bold uppercase">GRADE C: CORRELATIVE</div>
                <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Statistical correlation (e.g., high-risk MCC code, /24 IP subnet cluster, unusual transaction amount Z-score).
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SECTION 06: REST API REFERENCE */}
          {/* ============================================================ */}
          <section id="rest-api" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">06.1</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>API & EVALUATION</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              REST API Reference
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              The backend FastAPI server exposes high-performance RESTful endpoints running locally on <code className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">http://127.0.0.1:8000</code>:
            </p>

            <div className="space-y-4">
              {/* Endpoint 1 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-white text-black font-mono text-[10px] font-bold">GET</span>
                  <span className="font-mono text-xs text-white font-bold">/api/cases</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">Returns the queue of 20 evaluation benchmark cases with current fraud status, risk score, and uncertainty.</p>
              </div>

              {/* Endpoint 2 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-white text-black font-mono text-[10px] font-bold">GET</span>
                  <span className="font-mono text-xs text-white font-bold">/api/cases/{'{case_id}'}</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">Returns complete case payload including transaction properties, 2-stage NBA state, claims, and policy evaluations.</p>
              </div>

              {/* Endpoint 3 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-white text-black font-mono text-[10px] font-bold">GET</span>
                  <span className="font-mono text-xs text-white font-bold">/api/cases/{'{case_id}'}/pipeline</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">Triggers or fetches the 7-agent neuro-symbolic execution pipeline trace with execution latencies.</p>
              </div>

              {/* Endpoint 4 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded border border-white/30 text-white font-mono text-[10px] font-bold">POST</span>
                  <span className="font-mono text-xs text-white font-bold">/api/cases/{'{case_id}'}/step-up</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">Executes step-up challenge simulation. Body: <code className="text-zinc-300 font-mono">&#123;"channel": "SMS_OTP", "outcome": "PASS" | "FAIL"&#125;</code>.</p>
              </div>

              {/* Endpoint 5 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded border border-white/30 text-white font-mono text-[10px] font-bold">POST</span>
                  <span className="font-mono text-xs text-white font-bold">/api/cases/{'{case_id}'}/override</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">Enforces human cognitive override. Body: <code className="text-zinc-300 font-mono">&#123;"action": "BLOCK_ALL_CARDS", "rationale": "string", "route": "L2"&#125;</code>.</p>
              </div>

              {/* Endpoint 6 */}
              <div className="p-4 rounded border border-white/[0.1] bg-black space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded border border-white/30 text-white font-mono text-[10px] font-bold">POST</span>
                  <span className="font-mono text-xs text-white font-bold">/api/cases/{'{case_id}'}/chat</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans">Submits natural language queries to Groq Copilot for forensic intelligence and policy justification.</p>
              </div>
            </div>
          </section>

          {/* Benchmarks Suite */}
          <section id="benchmarks" className="space-y-6 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-[0.22em] uppercase">
              <span className="font-bold text-white">06.2</span>
              <span className="text-zinc-600 font-light">/</span>
              <span>API & EVALUATION</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
              20-Case Benchmark Suite & Evaluation
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              The system is evaluated against the 20 official benchmark test cases (<code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">HHG-001</code> through <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">HHG-020</code>) defined in the hackathon challenge.
            </p>

            <CodeBlock
              language="bash"
              code={`# Run automated benchmark evaluation script
python run_benchmark_eval.py

# Verify benchmark answer schema compliance
pytest tests/test_benchmark_answers.py`}
            />

            <div className="p-4 rounded border border-white/[0.1] bg-black font-mono text-xs text-zinc-400">
              Evaluation results and ground truth comparisons are persisted in <code className="text-white">cases/evaluated_benchmarks/</code>.
            </div>
          </section>
        </div>

        {/* Global Minimalist Footer */}
        <footer className="w-full bg-black text-white border-t border-white/[0.08] py-8 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono tracking-wider">
          <div className="flex items-center gap-2">
            <span className="font-bold">ZYGØS</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">AUTONOMOUS FRAUD INVESTIGATION PLATFORM</span>
          </div>
          <div className="text-zinc-500 text-[10px]">
            TIGERGRAPH SAVANNA CLOUD • GROQ LPU • NEURO-SYMBOLIC HYBRID
          </div>
        </footer>
      </main>
    </div>
  </div>
);
}

export default DocsPage;
