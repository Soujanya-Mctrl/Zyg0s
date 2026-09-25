import { StatusDot } from '../../components/ui/Micrographics';
import { ArrowLeft, Cpu, Database, RotateCcw, BookOpen, Zap, Loader2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { HealthStatus } from '../../api/client';

interface WorkbenchTopBarProps {
  activeCaseId: string | null;
  health?: HealthStatus | null;
  onResetCase?: () => void;
  isResetting?: boolean;
  isCaseInvestigated?: boolean;
  isInvestigating?: boolean;
  onStartInvestigation?: () => void;
}

export function WorkbenchTopBar({
  activeCaseId,
  health,
  onResetCase,
  isResetting,
  isCaseInvestigated = true,
  isInvestigating = false,
  onStartInvestigation,
}: WorkbenchTopBarProps) {
  const navigate = useNavigate();

  const isTgConnected = health?.mcp_service?.status === 'CONNECTED';
  const toolsCount = health?.mcp_service?.total_tools_exposed || 65;
  const isAiActive = health?.ai_engine?.active ?? true;

  return (
    <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-[#09090b] shrink-0 select-none">
      {/* Left side: Navigation & Breadcrumbs */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/')}
          className="text-white hover:text-zinc-300 transition-colors flex items-center gap-2 group cursor-pointer"
          title="Return to Overview"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-heading font-bold tracking-[0.2em] uppercase text-base">ZYGOS</span>
        </button>
        
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
          <span>Investigations</span>
          <span className="text-zinc-700">/</span>
          <span className="text-white font-bold">{activeCaseId || 'Loading...'}</span>
          {!isCaseInvestigated && (
            <span className="text-[9px] px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 ml-1">
              AWAITING INVESTIGATION
            </span>
          )}
        </div>
      </div>

      {/* Right side: Live Backend Telemetry & Reset Action (Monochromatic) */}
      <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.16em] uppercase">
        {/* Start Investigation CTA */}
        {!isCaseInvestigated && activeCaseId && (
          <button
            onClick={onStartInvestigation}
            disabled={isInvestigating}
            className="px-3 py-1 bg-white text-black font-bold font-mono text-[9px] tracking-wider uppercase hover:bg-zinc-200 border border-white transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(255,255,255,0.25)]"
            title="Execute autonomous 7-agent investigation pipeline"
          >
            {isInvestigating ? (
              <>
                <Loader2 size={11} className="animate-spin text-black" />
                <span>Investigating...</span>
              </>
            ) : (
              <>
                <Zap size={11} className="text-black fill-black" />
                <span>Start Investigation</span>
              </>
            )}
          </button>
        )}

        {/* Reset Case Flow Button */}
        {activeCaseId && (
          <button
            onClick={onResetCase}
            disabled={isResetting || isInvestigating}
            className="px-2.5 py-1 border border-white/20 text-zinc-300 hover:text-white hover:border-white transition-colors rounded text-[9px] flex items-center gap-1.5 bg-white/[0.02] disabled:opacity-50 cursor-pointer"
            title="Reset active case to pending alert state to test live execution again"
          >
            <RotateCcw size={11} className={`text-white ${isResetting ? 'animate-spin' : ''}`} />
            <span>Reset Alert Flow</span>
          </button>
        )}

        {/* Docs Link Button */}
        <button
          onClick={() => navigate('/docs')}
          className="px-2.5 py-1 border border-white/20 hover:border-white text-zinc-300 hover:text-white transition-colors rounded text-[9px] flex items-center gap-1.5 bg-white/[0.02] cursor-pointer"
          title="Open complete technical documentation & API specifications"
        >
          <BookOpen size={11} className="text-white" />
          <span>Docs</span>
        </button>

        {/* FinCEN SAR Link Button */}
        <button
          onClick={() => navigate('/sar')}
          className="px-2.5 py-1 border border-white/20 hover:border-white text-zinc-300 hover:text-white transition-colors rounded text-[9px] flex items-center gap-1.5 bg-white/[0.02] cursor-pointer"
          title="Open FinCEN SAR Electronic Filing Registry"
        >
          <FileText size={11} className="text-white" />
          <span>FinCEN SAR</span>
        </button>

        {/* TigerGraph MCP Status */}
        <div className="flex items-center gap-1.5 text-zinc-400" title="TigerGraph Savanna Cloud MCP Connection">
          <Database size={13} className={isTgConnected ? 'text-white' : 'text-zinc-600'} />
          <span>TG Savanna: {toolsCount} Tools</span>
        </div>

        {/* AI Engine Status */}
        <div className="flex items-center gap-1.5 text-zinc-400" title="Groq LPU AI Cognitive Engine">
          <Cpu size={13} className={isAiActive ? 'text-white' : 'text-zinc-600'} />
          <span>Groq LPU: Active</span>
        </div>

        {/* System Online Badge */}
        <div className="px-3 py-1 border border-white/20 rounded-full text-white text-[9px] flex items-center gap-2 bg-white/[0.03]">
          <StatusDot status="safe" />
          <span>Online</span>
        </div>
      </div>
    </header>
  );
}
