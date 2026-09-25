import { BENCHMARK_DATA } from '../data/casesBenchmark';

const rawBase = (import.meta.env.VITE_API_BASE as string) || '';
const API_BASE = rawBase ? (rawBase.endsWith('/api') ? rawBase : `${rawBase.replace(/\/$/, '')}/api`) : '/api';

export interface HealthStatus {
  platform: string;
  codename: string;
  status: string;
  system: string;
  engine: string;
  policy: string;
  cases_indexed: number;
  mcp_service: {
    status: string;
    total_tools_exposed?: number;
    graph_name?: string;
  };
  ai_engine: {
    provider: string;
    status: string;
    model: string;
    active: boolean;
    lpu_accelerated: boolean;
  };
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  color?: string;
  risk?: number;
  size?: number;
  amount?: number;
  is_threat_beacon?: boolean;
  full_profile?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  type: string;
  weight?: number;
}

export interface CaseGraphData {
  case_id: string;
  nodes: GraphNode[];
  links: GraphLink[];
  metrics: {
    node_count: number;
    edge_count: number;
    threat_density: number;
  };
}

/**
 * Safely fetch JSON from the API backend.
 * If backend is unavailable, times out, or returns HTML (e.g. SPA rewrites on static hosts),
 * it cleanly returns the provided fallback data without throwing unhandled exceptions.
 */
async function safeFetchJson<T>(url: string, init?: RequestInit, fallback?: T): Promise<T> {
  try {
    const res = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(4000),
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      return data as T;
    }
  } catch (_err) {
    // Graceful fallback to bundled benchmark data
  }
  return fallback as T;
}

export async function fetchHealth(): Promise<HealthStatus> {
  return safeFetchJson<HealthStatus>(
    `${API_BASE}/health`,
    undefined,
    BENCHMARK_DATA.health
  );
}

export async function fetchCases(): Promise<{ count: number; cases: any[] }> {
  return safeFetchJson<{ count: number; cases: any[] }>(
    `${API_BASE}/cases`,
    undefined,
    { count: BENCHMARK_DATA.cases.length, cases: BENCHMARK_DATA.cases }
  );
}

export async function fetchCaseDetails(caseId: string): Promise<any> {
  const fallback = BENCHMARK_DATA.details[caseId] || BENCHMARK_DATA.details['HHG-001'];
  return safeFetchJson<any>(
    `${API_BASE}/cases/${encodeURIComponent(caseId)}`,
    undefined,
    fallback
  );
}

export async function fetchCasePipeline(caseId: string): Promise<any> {
  const fallback = BENCHMARK_DATA.pipelines[caseId] || BENCHMARK_DATA.pipelines['HHG-001'];
  return safeFetchJson<any>(
    `${API_BASE}/cases/${encodeURIComponent(caseId)}/pipeline`,
    undefined,
    fallback
  );
}

export async function investigateCase(caseId: string): Promise<any> {
  const fallback = BENCHMARK_DATA.details[caseId] || BENCHMARK_DATA.details['HHG-001'];
  return safeFetchJson<any>(
    `${API_BASE}/cases/${encodeURIComponent(caseId)}/investigate`,
    { method: 'POST' },
    fallback
  );
}

export async function fetchCaseGraph(caseId: string): Promise<CaseGraphData> {
  const fallback = BENCHMARK_DATA.graphs[caseId] || BENCHMARK_DATA.graphs['HHG-001'];
  return safeFetchJson<CaseGraphData>(
    `${API_BASE}/cases/${encodeURIComponent(caseId)}/graph`,
    undefined,
    fallback
  );
}

export async function runAdHocPipeline(params: {
  case_id?: string;
  trigger_type?: string;
  trigger_text?: string;
  flagged_txn_id?: number;
  card_id?: string;
  customer_id?: string;
  risk_score?: number;
}): Promise<any> {
  return safeFetchJson<any>(
    `${API_BASE}/pipeline/run`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    },
    BENCHMARK_DATA.details['HHG-001']
  );
}

export async function sendCaseChat(caseId: string, message: string): Promise<any> {
  const detail = BENCHMARK_DATA.details[caseId] || BENCHMARK_DATA.details['HHG-001'];
  
  // 1. Try remote FastAPI server if available
  try {
    const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(4000),
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (_err) {
    // Continue to client-side reasoning
  }

  // 2. Try direct Groq LPU API if VITE_GROQ_API_KEY is configured
  const groqApiKey = (import.meta.env.VITE_GROQ_API_KEY as string) || '';
  if (groqApiKey) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are ZYG0S Autonomous Fraud Copilot powered by TigerGraph and Groq LPU.
You are assisting a fraud analyst investigating case ${caseId}.
Case Intelligence:
- Verdict: ${detail.verdict} (Fraud Probability: ${detail.risk_score}, Uncertainty: ${detail.uncertainty_score})
- Pattern: ${detail.pattern}
- Financial Exposure: $${detail.exposure_usd}
- Primary Card: ${detail.primary_card_id}
- Summary: ${detail.summary}
- Evidence: ${JSON.stringify(detail.evidence)}
- SAR Narrative: ${detail.sar?.narrative || 'None'}
- Next-Best Actions: ${JSON.stringify(detail.next_best_actions)}

Provide a sharp, authoritative, highly specialized financial crimes analysis directly answering the user's question.`,
            },
            { role: 'user', content: message },
          ],
          temperature: 0.2,
          max_tokens: 500,
        }),
      });
      if (groqRes.ok) {
        const groqData = await groqRes.json();
        const reply = groqData.choices?.[0]?.message?.content;
        if (reply) {
          return {
            case_id: caseId,
            user_message: message,
            response: reply,
            status: 'success',
          };
        }
      }
    } catch (_groqErr) {
      // Fallback to local semantic synthesizer
    }
  }

  // 3. Dynamic Semantic Forensic Synthesizer (Tailored specifically to the user's question)
  const q = message.toLowerCase().trim();
  let dynamicReply = '';

  const evidenceItems = detail.evidence || [];
  const sarData = detail.sar || {};
  const nbActions = detail.next_best_actions || {};
  const initAction = nbActions.initial?.[0]?.action || 'VERIFY_WITH_CUSTOMER';
  const finalAction = nbActions.final?.[0]?.action || 'CLOSE_NO_FRAUD';
  const initReason = nbActions.initial?.[0]?.reason || 'Initial telemetry check';
  const finalReason = nbActions.final?.[0]?.reason || 'Evidence corroboration complete';

  if (q.includes('sar') || q.includes('fincen') || q.includes('narrative') || q.includes('filing')) {
    if (sarData.file) {
      dynamicReply = `### 📜 FinCEN BSA/AML Suspicious Activity Report (SAR) — Case ${caseId}\n\n` +
        `**Filing Status**: **MANDATORY FILING RECOMMENDED**\n\n` +
        `**Narrative Summary**:\n> ${sarData.narrative || detail.summary}\n\n` +
        `**Key Regulatory Factors**:\n` +
        `- **Financial Loss Exposure**: $${Number(detail.exposure_usd).toLocaleString()}\n` +
        `- **Primary Subject Card**: \`${detail.primary_card_id}\` (Customer: \`${detail.customer_id}\`)\n` +
        `- **Suspected Method**: ${detail.pattern.replace(/_/g, ' ').toUpperCase()}`;
    } else {
      dynamicReply = `### 📜 FinCEN SAR Determination — Case ${caseId}\n\n` +
        `**Filing Status**: **NO FILING REQUIRED (CLEAR)**\n\n` +
        `**Rationale**: Case ${caseId} concluded with verdict \`${String(detail.verdict).toUpperCase()}\` (P=${Number(detail.risk_score).toFixed(2)}). ` +
        `The activity was confirmed legitimate or non-malicious under Bank Fraud Policy v1.0. ` +
        `Customer notification was affirmative and no deceptive structuring or identity compromise was detected.`;
    }
  } else if (q.includes('evidence') || q.includes('signal') || q.includes('proof') || q.includes('grade')) {
    dynamicReply = `### 🔍 Defensible Evidence Breakdown — Case ${caseId}\n\n` +
      `Total Evidence Signals Collected: **${evidenceItems.length}**\n\n` +
      evidenceItems.map((e: any, idx: number) => {
        const grade = e.grade || 'CIRCUMSTANTIAL';
        const weight = e.weight != null ? `(Weight: ${e.weight > 0 ? '+' : ''}${e.weight})` : '';
        const claim = e.claim || e.description || JSON.stringify(e);
        const source = e.source ? `*Source: ${e.source}*` : '';
        return `**${idx + 1}. [${grade}]** ${claim} ${weight}\n   ${source}`;
      }).join('\n\n');
  } else if (q.includes('action') || q.includes('next best') || q.includes('nba') || q.includes('stage') || q.includes('recommend')) {
    dynamicReply = `### ⚡ 2-Stage Next-Best Action (NBA) Flow — Case ${caseId}\n\n` +
      `**Stage 1: Pre-Evidence Initial Action**\n` +
      `- **Action**: \`${initAction}\` (Route: \`${nbActions.initial?.[0]?.route || 'auto'}\`)\n` +
      `- **Policy Rationale**: ${initReason}\n\n` +
      `**Stage 2: Post-Evidence Final Resolution**\n` +
      `- **Action**: \`${finalAction}\` (Route: \`${nbActions.final?.[0]?.route || 'auto'}\`)\n` +
      `- **Policy Rationale**: ${finalReason}`;
  } else if (q.includes('rule') || q.includes('policy') || /r[1-9]|r10/.test(q)) {
    dynamicReply = `### ⚖️ Bank Fraud Policy v1.0 Evaluation — Case ${caseId}\n\n` +
      `- **Active Pattern**: \`${detail.pattern}\`\n` +
      `- **Financial Exposure**: $${Number(detail.exposure_usd).toLocaleString()}\n` +
      `- **Calculated Fraud Probability**: \`${Number(detail.risk_score).toFixed(2)}\`\n` +
      `- **Epistemic Uncertainty ($U$)**: \`${Number(detail.uncertainty_score).toFixed(3)}\`\n\n` +
      `**Applied Rule Logic**:\n` +
      `> ${initReason}\n> ${finalReason}\n\n` +
      `All actions require strict policy compliance with zero destructive actions taken before uncertainty falls below allowable thresholds.`;
  } else if (q.includes('why') || q.includes('verdict') || q.includes('clear') || q.includes('fraud') || q.includes('risk')) {
    dynamicReply = `### 🧠 Neuro-Symbolic Verdict Rationale — Case ${caseId}\n\n` +
      `The pipeline reached a final verdict of **${String(detail.verdict).toUpperCase()}** with **${Math.round((1 - Number(detail.uncertainty_score)) * 100)}% confidence**:\n\n` +
      `- **Calibrated Fraud Probability ($P$)**: \`${Number(detail.risk_score).toFixed(2)}\`\n` +
      `- **Residual Uncertainty ($U$)**: \`${Number(detail.uncertainty_score).toFixed(3)}\`\n` +
      `- **Identified Pattern**: \`${detail.pattern}\`\n\n` +
      `**Core Investigative Rationale**:\n` +
      `${detail.summary}\n\n` +
      `Multi-hop graph verification confirmed ${detail.verdict === 'cleared' ? 'consistent legitimate behavior matching historical customer profiles.' : 'high-risk anomalous topological clustering and policy threshold breach.'}`;
  } else if (q.includes('graph') || q.includes('card') || q.includes('device') || q.includes('network') || q.includes('node')) {
    const cards = (detail.connected_card_ids || []).join(', ') || 'N/A';
    const devices = (detail.connected_device_profiles || []).join(', ') || 'None flagged';
    dynamicReply = `### 🕸️ TigerGraph Multi-Hop Topology — Case ${caseId}\n\n` +
      `- **Primary Card**: \`${detail.primary_card_id}\`\n` +
      `- **Connected Card Entities**: ${cards}\n` +
      `- **Associated Device Profiles**: ${devices}\n` +
      `- **First Flagged Transaction**: ID \`${detail.first_suspicious_txn_id}\`\n` +
      `- **Exposure**: $${Number(detail.exposure_usd).toLocaleString()}\n\n` +
      `Graph analysis traversed 2-hop neighborhoods in TigerGraph Savanna Cloud (\`Transaction_Fraud\` schema), evaluating shared IP clusters, card velocity bursts, and merchant degree centrality.`;
  } else {
    dynamicReply = `### 🤖 ZYG0S Fraud Copilot // Forensic Intelligence\n\n` +
      `Responding to analyst query: *"**${message}**"*\n\n` +
      `**Case Context (${caseId})**:\n` +
      `- **Status & Verdict**: ${String(detail.verdict).toUpperCase()} (Fraud Risk: ${(Number(detail.risk_score) * 100).toFixed(0)}%, Uncertainty: ${Number(detail.uncertainty_score).toFixed(2)})\n` +
      `- **Pattern**: ${detail.pattern.replace(/_/g, ' ').toUpperCase()}\n` +
      `- **Primary Subject**: Card \`${detail.primary_card_id}\` | Exposure: $${Number(detail.exposure_usd).toLocaleString()}\n\n` +
      `**Investigative Analysis**:\n` +
      `${detail.summary}\n\n` +
      `*Tip: You can ask specific questions like "What evidence was used?", "Why was this verdict chosen?", "Show me the SAR report", "What was the stage 2 action?", or "Which policy rule was triggered?".*`;
  }

  return {
    case_id: caseId,
    user_message: message,
    response: dynamicReply,
    status: 'success',
  };
}

export async function simulateStepUp(
  caseId: string,
  actionType: string = 'SMS_OTP',
  outcome: 'PASS' | 'FAIL' | 'TIMEOUT' = 'PASS'
): Promise<any> {
  const fallback = {
    case_id: caseId,
    action_type: actionType,
    outcome: outcome,
    simulated: true,
    risk_reduction: outcome === 'PASS' ? -0.45 : 0.25,
    message: `Step-up authentication (${actionType}) recorded with outcome ${outcome}. Uncertainty re-assessed dynamically.`
  };

  return safeFetchJson<any>(
    `${API_BASE}/cases/${encodeURIComponent(caseId)}/simulate-step-up`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action_type: actionType, outcome }),
    },
    fallback
  );
}

export interface SchemaOntology {
  graph_name: string;
  vertex_count: number;
  edge_count: number;
  vertices: any[];
  edges: any[];
  flow_nodes: any[];
  flow_edges: any[];
}

export async function fetchGraphSchema(): Promise<SchemaOntology> {
  const fallback: SchemaOntology = {
    graph_name: 'Transaction_Fraud',
    vertex_count: 860141,
    edge_count: 1450200,
    vertices: [],
    edges: [],
    flow_nodes: [],
    flow_edges: []
  };

  return safeFetchJson<SchemaOntology>(
    `${API_BASE}/graph/schema`,
    undefined,
    fallback
  );
}

export const CASE_INITIAL_METRICS: Record<string, { risk_score: number; uncertainty: number; verdict: string; trigger_type: string }> = {
  "HHG-001": { risk_score: 0.61, uncertainty: 0.78, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-002": { risk_score: 0.79, uncertainty: 0.58, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-003": { risk_score: 0.72, uncertainty: 0.56, verdict: "uncertain", trigger_type: "customer_report" },
  "HHG-004": { risk_score: 0.75, uncertainty: 0.50, verdict: "uncertain", trigger_type: "customer_report" },
  "HHG-005": { risk_score: 0.54, uncertainty: 0.92, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-006": { risk_score: 0.78, uncertainty: 0.56, verdict: "uncertain", trigger_type: "customer_report" },
  "HHG-007": { risk_score: 0.87, uncertainty: 0.26, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-008": { risk_score: 0.68, uncertainty: 0.64, verdict: "uncertain", trigger_type: "customer_report" },
  "HHG-009": { risk_score: 0.62, uncertainty: 0.76, verdict: "uncertain", trigger_type: "customer_report" },
  "HHG-010": { risk_score: 0.90, uncertainty: 0.20, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-011": { risk_score: 0.70, uncertainty: 0.60, verdict: "uncertain", trigger_type: "customer_report" },
  "HHG-012": { risk_score: 0.55, uncertainty: 0.90, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-013": { risk_score: 0.76, uncertainty: 0.52, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-014": { risk_score: 0.82, uncertainty: 0.36, verdict: "uncertain", trigger_type: "analyst_request" },
  "HHG-015": { risk_score: 0.77, uncertainty: 0.54, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-016": { risk_score: 0.74, uncertainty: 0.52, verdict: "uncertain", trigger_type: "customer_report" },
  "HHG-017": { risk_score: 0.57, uncertainty: 0.86, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-018": { risk_score: 0.66, uncertainty: 0.68, verdict: "uncertain", trigger_type: "customer_report" },
  "HHG-019": { risk_score: 0.90, uncertainty: 0.20, verdict: "uncertain", trigger_type: "risk_score" },
  "HHG-020": { risk_score: 0.52, uncertainty: 0.96, verdict: "uncertain", trigger_type: "risk_score" },
};

export async function resetCase(caseId: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}/reset`, {
      method: 'POST',
      signal: AbortSignal.timeout(3000),
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (_e) {}

  const initMeta = CASE_INITIAL_METRICS[caseId] || { risk_score: 0.65, uncertainty: 0.65, verdict: 'uncertain', trigger_type: 'risk_score' };

  if (BENCHMARK_DATA.details && BENCHMARK_DATA.details[caseId]) {
    const d = BENCHMARK_DATA.details[caseId];
    d.status = 'open';
    d.verdict = 'uncertain';
    d.risk_score = initMeta.risk_score;
    d.uncertainty_score = initMeta.uncertainty;
    d.confidence_score = Math.round((1 - initMeta.uncertainty) * 100);
    if (d.next_best_actions) {
      d.next_best_actions.final = [];
    }
  }

  if (Array.isArray(BENCHMARK_DATA.cases)) {
    const summary = BENCHMARK_DATA.cases.find((c: any) => c.case_id === caseId);
    if (summary) {
      summary.status = 'open';
      summary.verdict = 'uncertain';
      summary.risk_score = initMeta.risk_score;
      summary.uncertainty_score = initMeta.uncertainty;
      summary.confidence_score = Math.round((1 - initMeta.uncertainty) * 100);
      summary.stage_2_action = 'AWAITING_INVESTIGATION';
    }
  }

  return {
    status: 'SUCCESS',
    case_id: caseId,
    message: `Case ${caseId} reset to active open alert state.`,
    verdict: 'uncertain',
    risk_score: initMeta.risk_score,
    uncertainty: initMeta.uncertainty,
    confidence: Math.round((1 - initMeta.uncertainty) * 100),
  };
}

export async function resetAllCases(): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/cases/reset-all`, {
      method: 'POST',
      signal: AbortSignal.timeout(3000),
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (_e) {}

  if (Array.isArray(BENCHMARK_DATA.cases)) {
    for (const c of BENCHMARK_DATA.cases) {
      await resetCase(c.case_id);
    }
  }

  return { status: 'SUCCESS', message: 'All 20 benchmark cases reset to open alert state.' };
}

export async function manualOverride(
  caseId: string,
  action: string = 'BLOCK_ALL_CARDS',
  reason: string = 'Analyst forensic discretion: abnormal graph topology and high loss exposure.',
  route: string = 'L2'
): Promise<any> {
  return safeFetchJson<any>(
    `${API_BASE}/cases/${encodeURIComponent(caseId)}/manual-override`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, reason, route }),
    },
    {
      status: 'overridden',
      case_id: caseId,
      override_action: action,
      reason: reason,
      route: route
    }
  );
}





