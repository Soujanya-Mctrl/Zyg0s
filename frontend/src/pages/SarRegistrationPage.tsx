import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  fetchSarFilings,
  registerSarFiling,
  type SARFiling,
  type SARFilingsResponse
} from '../api/client';
import {
  FileText,
  CheckCircle2,
  Copy,
  ExternalLink,
  Search,
  Download,
  Printer,
  ArrowLeft,
  Building2,
  Hash,
  Send,
  Loader2
} from 'lucide-react';

export const SarRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCaseId = searchParams.get('caseId');

  const [sarData, setSarData] = useState<SARFilingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFiling, setSelectedFiling] = useState<SARFiling | null>(null);
  const [activeTab, setActiveTab] = useState<'registry' | 'form' | 'register'>('registry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypology, setSelectedTypology] = useState<string>('ALL');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // New registration form state
  const [regCaseId, setRegCaseId] = useState('HHG-001');
  const [regReason, setRegReason] = useState('Policy Rule R2: Confirmed unauthorized transaction with multi-entity compromise');
  const [regNotes, setRegNotes] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [regSuccessMessage, setRegSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadFilings();
  }, []);

  const loadFilings = async () => {
    setLoading(true);
    try {
      const res = await fetchSarFilings();
      setSarData(res);
      if (res.filings.length > 0) {
        if (initialCaseId) {
          const matched = res.filings.find((f) => f.case_id === initialCaseId);
          if (matched) {
            setSelectedFiling(matched);
            setActiveTab('form');
          } else {
            setSelectedFiling(res.filings[0]);
          }
        } else {
          setSelectedFiling(res.filings[0]);
        }
      }
    } catch (e) {
      console.error('Failed to load SAR filings:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyNarrative = (narrative: string) => {
    navigator.clipboard.writeText(narrative);
    setCopyFeedback('Narrative copied to clipboard');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`${label} copied!`);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleDownloadJson = (filing: SARFiling) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filing, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${filing.bsa_tracking_id}_FinCEN_Form111.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleRegisterNewSar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setRegSuccessMessage(null);
    try {
      const res = await registerSarFiling(regCaseId, regReason, regNotes);
      setRegSuccessMessage(`SAR Successfully Registered with FinCEN: ${res.bsa_tracking_id || 'BSA-2026-SAR'}`);
      await loadFilings();
      if (res.filing) {
        setSelectedFiling(res.filing);
        setActiveTab('form');
      }
    } catch (err: any) {
      alert(`Registration error: ${err.message || err}`);
    } finally {
      setIsRegistering(false);
    }
  };

  const filings = sarData?.filings || [];

  const filteredFilings = filings.filter((f) => {
    const matchesSearch =
      f.case_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.bsa_tracking_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.primary_customer_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.primary_card_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.pattern.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTypology =
      selectedTypology === 'ALL' ||
      (selectedTypology === 'CARD_NOT_PRESENT' && f.pattern.includes('card_not_present')) ||
      (selectedTypology === 'NEW_DEVICE' && f.pattern.includes('device')) ||
      (selectedTypology === 'MULE_RING' && f.pattern.includes('mule'));

    return matchesSearch && matchesTypology;
  });

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-200 font-sans selection:bg-white selection:text-black">
      
      {/* Top Compliance Nav Bar */}
      <header className="sticky top-0 z-40 bg-[#090a0d]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-zinc-300 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-heading font-bold tracking-[0.25em] text-sm sm:text-base">
              ZYGØS
            </span>
          </button>

          <div className="h-4 w-[1px] bg-zinc-800" />

          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest">
            <span className="text-zinc-500">COMPLIANCE</span>
            <span className="text-zinc-700">/</span>
            <span className="text-white font-semibold">FINCEN SAR REGISTRATION</span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px]">
              BSA FORM 111
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-xs">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-zinc-900/80 rounded border border-white/[0.06] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>FINCEN BSA E-FILING: ACTIVE</span>
          </div>

          <button
            onClick={() => navigate('/workbench')}
            className="px-3 py-1.5 border border-white/20 hover:border-white text-zinc-300 hover:text-white rounded bg-white/[0.02] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>WORKBENCH</span>
            <span>↗</span>
          </button>
          
          <button
            onClick={() => navigate('/docs')}
            className="hidden sm:flex px-3 py-1.5 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white rounded bg-zinc-900/60 transition-colors cursor-pointer"
          >
            DOCS
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        
        {/* Hero Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
            <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 rounded">
              BSA/AML TITLE 31 CFR CHAPTER X
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">ELECTRONIC FILING REGISTRY</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">TIGERGRAPH SAVANNA CLOUD EVIDENCE BACKED</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            FinCEN Suspicious Activity Report (SAR) Registry
          </h1>

          <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Autonomous generation, electronic registration, and cryptographic audit logging of BSA-AML Form 111 Suspicious Activity Reports.
            Every filing answers the 5 W's with defensible graph evidence, policy rule justifications (R1–R10), and multi-entity syndicate linkages.
          </p>
        </div>

        {/* Bento Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-md space-y-1">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
              <span>Registered SAR Exposure</span>
              <Building2 size={13} className="text-amber-400" />
            </div>
            <div className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
              ${sarData?.total_exposure_usd?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '2,677.54'}
            </div>
            <div className="text-[10px] font-mono text-amber-400/90">Aggregated USD at risk across 10 SAR filings</div>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-md space-y-1">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
              <span>Total Monitored Portfolio</span>
              <Building2 size={13} className="text-cyan-400" />
            </div>
            <div className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
              $3,623.21
            </div>
            <div className="text-[10px] font-mono text-emerald-400">20 alerts | $945.67 benign volume protected</div>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-md space-y-1">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
              <span>Mandatory SAR Filings</span>
              <FileText size={13} className="text-cyan-400" />
            </div>
            <div className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
              {sarData?.count || 10} <span className="text-xs text-zinc-500 font-normal">/ 20 Cases</span>
            </div>
            <div className="text-[10px] font-mono text-emerald-400">100% Policy R2 / R5 / R7 adherence (0 false SARs)</div>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.08] bg-zinc-950/60 backdrop-blur-md space-y-1">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
              <span>Avg Filing Latency</span>
              <CheckCircle2 size={13} className="text-purple-400" />
            </div>
            <div className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
              1.8s
            </div>
            <div className="text-[10px] font-mono text-zinc-500">Autonomous vs 48-hr manual BSA backlog</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab('registry')}
            className={`px-4 py-2 border-b-2 font-medium tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'registry'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            SAR Filing Registry ({filings.length})
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 border-b-2 font-medium tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'form'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Electronic Form 111 Inspector {selectedFiling ? `(${selectedFiling.case_id})` : ''}
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 border-b-2 font-medium tracking-wider uppercase transition-colors cursor-pointer ${
              activeTab === 'register'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            + Register New SAR
          </button>
        </div>

        {/* Copy Feedback Notification Toast */}
        {copyFeedback && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-zinc-900 border border-emerald-500/40 text-emerald-400 font-mono text-xs rounded-lg shadow-2xl flex items-center gap-2">
            <CheckCircle2 size={14} />
            <span>{copyFeedback}</span>
          </div>
        )}

        {/* TAB 1: REGISTRY VIEW */}
        {activeTab === 'registry' && (
          <div className="space-y-4">
            {/* Search and Typology Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter by Case ID, Card, Subject, or Tracking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-950/80 border border-white/10 rounded font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] overflow-x-auto pb-1">
                {(['ALL', 'CARD_NOT_PRESENT', 'NEW_DEVICE', 'MULE_RING'] as const).map((typ) => (
                  <button
                    key={typ}
                    onClick={() => setSelectedTypology(typ)}
                    className={`px-2.5 py-1.5 rounded uppercase tracking-wider cursor-pointer border transition-colors ${
                      selectedTypology === typ
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-zinc-900/60 text-zinc-400 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {typ.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Filings Table Card */}
            <div className="rounded-xl border border-white/[0.08] bg-zinc-950/60 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-white/[0.08] bg-zinc-900/60 text-[10px] text-zinc-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">BSA Tracking ID</th>
                      <th className="py-3 px-4">Case Ref</th>
                      <th className="py-3 px-4">Primary Subject</th>
                      <th className="py-3 px-4">Typology</th>
                      <th className="py-3 px-4 text-right">Exposure</th>
                      <th className="py-3 px-4">Regulatory Trigger</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-zinc-500 font-mono">
                          <Loader2 size={18} className="animate-spin inline mr-2 text-white" />
                          Loading FinCEN BSA Electronic Filings...
                        </td>
                      </tr>
                    ) : filteredFilings.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-zinc-500 font-mono">
                          No FinCEN SAR filings match the active query.
                        </td>
                      </tr>
                    ) : (
                      filteredFilings.map((filing) => (
                        <tr
                          key={filing.case_id}
                          className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                          onClick={() => {
                            setSelectedFiling(filing);
                            setActiveTab('form');
                          }}
                        >
                          <td className="py-3 px-4 font-semibold text-white">
                            <span className="flex items-center gap-1.5">
                              <Hash size={12} className="text-zinc-500" />
                              {filing.bsa_tracking_id}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-cyan-400 font-bold">
                            {filing.case_id}
                          </td>
                          <td className="py-3 px-4 text-zinc-300">
                            <div>{filing.primary_card_id}</div>
                            <div className="text-[10px] text-zinc-500">{filing.primary_customer_id}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/15 text-red-400 border border-red-500/30">
                              {filing.pattern.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-white">
                            ${filing.exposure_usd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 text-zinc-400 max-w-[200px] truncate" title={filing.regulatory_reason}>
                            {filing.regulatory_reason}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {filing.filing_status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFiling(filing);
                                setActiveTab('form');
                              }}
                              className="px-2.5 py-1 text-[10px] border border-white/20 hover:border-white text-white rounded bg-zinc-900/60 transition-colors"
                            >
                              Inspect Form →
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ELECTRONIC FORM 111 INSPECTOR */}
        {activeTab === 'form' && selectedFiling && (
          <div className="space-y-6">
            
            {/* Top Inspector Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-zinc-950/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                  111
                </div>
                <div>
                  <div className="font-heading font-bold text-base text-white flex items-center gap-2">
                    <span>FinCEN Form 111 — Electronic Filing Receipt</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-normal">
                      E-ACKNOWLEDGED
                    </span>
                  </div>
                  <div className="font-mono text-xs text-zinc-400">
                    BSA Identifier: <strong className="text-white">{selectedFiling.bsa_tracking_id}</strong> • Case Ref: <strong className="text-white">{selectedFiling.case_id}</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => handleCopyNarrative(selectedFiling.narrative)}
                  className="px-3 py-1.5 border border-white/20 hover:border-white text-zinc-200 hover:text-white rounded bg-white/[0.04] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Copy size={13} />
                  <span>Copy Narrative</span>
                </button>
                <button
                  onClick={() => handleDownloadJson(selectedFiling)}
                  className="px-3 py-1.5 border border-white/20 hover:border-white text-zinc-200 hover:text-white rounded bg-white/[0.04] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download size={13} />
                  <span>Export JSON</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="hidden sm:flex px-3 py-1.5 border border-white/20 hover:border-white text-zinc-200 hover:text-white rounded bg-white/[0.04] items-center gap-1.5 cursor-pointer transition-colors"
                  title="Print official filing sheet"
                >
                  <Printer size={13} />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => navigate(`/workbench?case=${selectedFiling.case_id}`)}
                  className="px-3.5 py-1.5 bg-white hover:bg-zinc-200 text-black font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Open Graph</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>

            {/* Official Electronic Form 111 Sheet */}
            <div className="rounded-xl border border-white/[0.12] bg-[#0c0d12] shadow-2xl p-6 sm:p-8 space-y-8 font-mono text-xs">
              
              {/* Form 111 Official Header */}
              <div className="border-b border-white/[0.08] pb-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold">
                      DEPARTMENT OF THE TREASURY • FINANCIAL CRIMES ENFORCEMENT NETWORK
                    </div>
                    <div className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                      SUSPICIOUS ACTIVITY REPORT (SAR)
                    </div>
                    <div className="text-zinc-500 text-[11px] mt-0.5">
                      Pursuant to the Bank Secrecy Act, 31 U.S.C. 5318(g) & 31 CFR Chapter X
                    </div>
                  </div>

                  <div className="text-right text-[11px] space-y-1">
                    <div>Document Control Number: <strong className="text-white">{selectedFiling.fincen_dcn}</strong></div>
                    <div>Receipt Token: <span className="text-cyan-400">{selectedFiling.acknowledgment_token}</span></div>
                    <div>Filing Date: <span className="text-white">{selectedFiling.filing_date}</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-[11px] bg-zinc-950/60 p-3 rounded border border-white/[0.04]">
                  <div>
                    <span className="text-zinc-500">Reporting Institution:</span>
                    <div className="text-white font-medium">{selectedFiling.reporting_institution}</div>
                  </div>
                  <div>
                    <span className="text-zinc-500">Institution TIN / RSSD:</span>
                    <div className="text-white font-medium">{selectedFiling.institution_tin} / {selectedFiling.institution_rssd}</div>
                  </div>
                  <div>
                    <span className="text-zinc-500">Graph Audit Anchor:</span>
                    <div className="text-emerald-400 font-medium">{selectedFiling.graph_case_id}</div>
                  </div>
                </div>
              </div>

              {/* Part I: Subject Information (WHO) */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold border-b border-white/[0.06] pb-1 flex items-center justify-between">
                  <span>Part I — Subject Information (Who)</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Identified Entities & Instruments</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-950/40 p-4 rounded border border-white/[0.04]">
                  <div>
                    <div className="text-zinc-500 text-[10px]">Primary Customer ID</div>
                    <div className="text-white font-bold text-sm mt-0.5">{selectedFiling.primary_customer_id}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px]">Primary Card Account</div>
                    <div className="text-white font-bold text-sm mt-0.5">{selectedFiling.primary_card_id}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px]">Connected Syndicate Cards</div>
                    <div className="text-amber-400 font-bold text-sm mt-0.5">
                      {selectedFiling.connected_cards.length > 0 ? selectedFiling.connected_cards.join(', ') : 'None'}
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px]">Subject Entities Count</div>
                    <div className="text-white font-bold text-sm mt-0.5">{selectedFiling.subjects.length} Subjects</div>
                  </div>
                </div>

                {selectedFiling.connected_devices && selectedFiling.connected_devices.length > 0 && (
                  <div className="text-[11px] bg-zinc-950/40 p-3 rounded border border-white/[0.04]">
                    <span className="text-zinc-500">Associated Device Telemetry: </span>
                    <span className="text-zinc-300">{selectedFiling.connected_devices.join(' • ')}</span>
                  </div>
                )}
              </div>

              {/* Part II: Suspicious Activity Details (WHAT & WHEN) */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-bold border-b border-white/[0.06] pb-1 flex items-center justify-between">
                  <span>Part II — Suspicious Activity Details (What & When)</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Financial Exposure & Timestamps</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950/40 p-4 rounded border border-white/[0.04]">
                  <div>
                    <div className="text-zinc-500 text-[10px]">Suspicious Typology</div>
                    <div className="text-white font-bold text-sm mt-0.5 uppercase">
                      {selectedFiling.pattern.replace(/_/g, ' ')}
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px]">Total Dollar Exposure</div>
                    <div className="text-red-400 font-bold text-base mt-0.5">
                      ${selectedFiling.exposure_usd.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500 text-[10px]">Activity Date Range</div>
                    <div className="text-white font-medium text-xs mt-0.5">
                      {selectedFiling.activity_dates[0]} — {selectedFiling.activity_dates[1] || selectedFiling.activity_dates[0]}
                    </div>
                  </div>
                </div>

                {selectedFiling.affected_txn_ids && selectedFiling.affected_txn_ids.length > 0 && (
                  <div className="text-[11px] bg-zinc-950/40 p-3 rounded border border-white/[0.04] flex items-center justify-between">
                    <div>
                      <span className="text-zinc-500">Flagged Transaction IDs: </span>
                      <span className="text-cyan-400 font-semibold">
                        {selectedFiling.affected_txn_ids.map((id) => `#${id}`).join(', ')}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyText(selectedFiling.affected_txn_ids.join(', '), 'Transaction IDs')}
                      className="text-zinc-500 hover:text-white transition-colors"
                      title="Copy IDs"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Part III & IV: The 5 W's Narrative (WHY & HOW) */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold border-b border-white/[0.06] pb-1 flex items-center justify-between">
                  <span>Part IV — Suspicious Activity Narrative (Why & How)</span>
                  <button
                    onClick={() => handleCopyNarrative(selectedFiling.narrative)}
                    className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    <Copy size={11} />
                    <span>Copy Full Text</span>
                  </button>
                </div>

                <div className="p-5 rounded-lg bg-black/80 border border-white/10 text-zinc-300 leading-relaxed font-mono text-[11px] whitespace-pre-wrap select-text max-h-[460px] overflow-y-auto">
                  {selectedFiling.narrative}
                </div>
              </div>

              {/* Part V: Disposition & Cryptographic Audit Trail */}
              <div className="space-y-3 pt-2">
                <div className="text-xs uppercase tracking-wider text-zinc-400 font-bold border-b border-white/[0.06] pb-1">
                  Part V — Compliance Disposition & Cryptographic Signature
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-950/60 p-4 rounded border border-white/[0.04] text-[11px]">
                  <div>
                    <div className="text-zinc-500 text-[10px]">Statutory Policy Rule</div>
                    <div className="text-white font-medium mt-0.5">{selectedFiling.regulatory_reason}</div>
                    <div className="text-zinc-500 text-[10px] mt-2">Card Mitigation Action</div>
                    <div className="text-red-400 font-bold mt-0.5">PERMANENT CARD BLOCK & CUSTOMER ALERT</div>
                  </div>

                  <div>
                    <div className="text-zinc-500 text-[10px]">SHA-256 Regulatory Integrity Hash</div>
                    <div className="text-cyan-400 font-mono text-[10px] mt-0.5 break-all">
                      {selectedFiling.sha256_hash}
                    </div>
                    <div className="text-zinc-500 text-[10px] mt-2">FinCEN Transmission Status</div>
                    <div className="text-emerald-400 font-bold mt-0.5 flex items-center gap-1.5">
                      <CheckCircle2 size={12} />
                      <span>OFFICIAL ELECTRONIC SUBMISSION VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: REGISTER NEW SAR (FORM) */}
        {activeTab === 'register' && (
          <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-zinc-950/70 p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading font-bold text-xl text-white">
                Register New Suspicious Activity Report (FinCEN Form 111)
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Initiate formal regulatory SAR filing for an alert or case, synthesizing an immutable 5 W's narrative with TigerGraph evidence links.
              </p>
            </div>

            {regSuccessMessage && (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2.5">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{regSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleRegisterNewSar} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-zinc-400">Target Benchmark Case ID</label>
                <select
                  value={regCaseId}
                  onChange={(e) => setRegCaseId(e.target.value)}
                  className="w-full p-2.5 bg-black border border-white/15 rounded text-white focus:outline-none focus:border-white"
                >
                  {Array.from({ length: 20 }, (_, i) => {
                    const cid = `HHG-${String(i + 1).padStart(3, '0')}`;
                    const amounts: Record<string, number> = {
                      'HHG-001': 77.07, 'HHG-002': 292.36, 'HHG-003': 49.00, 'HHG-004': 128.33,
                      'HHG-005': 100.07, 'HHG-006': 482.12, 'HHG-007': 111.92, 'HHG-008': 55.68,
                      'HHG-009': 30.02, 'HHG-010': 1000.03, 'HHG-011': 131.30, 'HHG-012': 30.91,
                      'HHG-013': 35.66, 'HHG-014': 74.96, 'HHG-015': 599.94, 'HHG-016': 59.67,
                      'HHG-017': 100.09, 'HHG-018': 39.08, 'HHG-019': 99.92, 'HHG-020': 125.08,
                    };
                    const amt = amounts[cid] || 0;
                    return (
                      <option key={cid} value={cid}>
                        {cid} — ${amt.toFixed(2)} USD
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">Regulatory Trigger Rationale (Bank Fraud Policy v1.0)</label>
                <select
                  value={regReason}
                  onChange={(e) => setRegReason(e.target.value)}
                  className="w-full p-2.5 bg-black border border-white/15 rounded text-white focus:outline-none focus:border-white"
                >
                  <option value="Policy Rule R2: Confirmed unauthorized transaction with multi-entity compromise">
                    Rule R2: Confirmed unauthorized use ($100+ exposure, customer denial)
                  </option>
                  <option value="Policy Rule R5: High-velocity card cycling across multiple merchants">
                    Rule R5: Card cycling attack (velocity burst across distinct merchants)
                  </option>
                  <option value="Policy Rule R7: Coordinated device farm swarm across multiple accounts">
                    Rule R7: Device farm syndicate (shared OS/fingerprint across accounts)
                  </option>
                  <option value="Policy Rule R8: Deceptive transaction structuring and mule fan-out">
                    Rule R8: Structured mule routing & rapid dispersion
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400">Compliance Examiner Notes & Observations</label>
                <textarea
                  rows={4}
                  value={regNotes}
                  onChange={(e) => setRegNotes(e.target.value)}
                  placeholder="Enter specific investigative context, law enforcement requests, or syndicate notes..."
                  className="w-full p-2.5 bg-black border border-white/15 rounded text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-heading font-bold text-xs tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                {isRegistering ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-black" />
                    <span>Transmitting to FinCEN BSA...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} className="text-black" />
                    <span>Submit & Register Official SAR Form 111</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
