/**
 * ZYG0S Frontend API Client
 * Provides unified, typed access to FastAPI backend endpoints:
 * - TigerGraph Savanna Cloud MCP tools & Graph Topology
 * - LangGraph 7-Agent Neuro-Symbolic Pipeline
 * - Groq AI Copilot (qwen/qwen3.8-27b)
 * - 2-Stage Next-Best Action (NBA) & Step-Up Authentication Simulator
 */

const API_BASE = '/api';

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

export async function fetchHealth(): Promise<HealthStatus> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return res.json();
}

export async function fetchCases(): Promise<any> {
  const res = await fetch(`${API_BASE}/cases`);
  if (!res.ok) throw new Error(`Fetch cases failed: ${res.statusText}`);
  return res.json();
}

export async function fetchCaseDetails(caseId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}`);
  if (!res.ok) throw new Error(`Fetch case details failed: ${res.statusText}`);
  return res.json();
}

export async function fetchCasePipeline(caseId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}/pipeline`);
  if (!res.ok) throw new Error(`Fetch pipeline failed: ${res.statusText}`);
  return res.json();
}

export async function fetchCaseGraph(caseId: string): Promise<CaseGraphData> {
  const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}/graph`);
  if (!res.ok) throw new Error(`Fetch graph failed: ${res.statusText}`);
  return res.json();
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
  const res = await fetch(`${API_BASE}/pipeline/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`Run pipeline failed: ${res.statusText}`);
  return res.json();
}

export async function sendCaseChat(caseId: string, message: string): Promise<any> {
  const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error(`Chat request failed: ${res.statusText}`);
  return res.json();
}

export async function simulateStepUp(
  caseId: string,
  actionType: string = 'SMS_OTP',
  outcome: 'PASS' | 'FAIL' | 'TIMEOUT' = 'PASS'
): Promise<any> {
  const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}/simulate-step-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action_type: actionType, outcome }),
  });
  if (!res.ok) throw new Error(`Step up simulation failed: ${res.statusText}`);
  return res.json();
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
  const res = await fetch(`${API_BASE}/graph/schema`);
  if (!res.ok) throw new Error(`Fetch schema failed: ${res.statusText}`);
  return res.json();
}

export async function resetCase(caseId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}/reset`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error(`Reset case failed: ${res.statusText}`);
  return res.json();
}

export async function resetAllCases(): Promise<any> {
  const res = await fetch(`${API_BASE}/cases/reset-all`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error(`Reset all cases failed: ${res.statusText}`);
  return res.json();
}

export async function manualOverride(
  caseId: string,
  action: string = 'BLOCK_ALL_CARDS',
  reason: string = 'Analyst forensic discretion: abnormal graph topology and high loss exposure.',
  route: string = 'L2'
): Promise<any> {
  const res = await fetch(`${API_BASE}/cases/${encodeURIComponent(caseId)}/manual-override`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, reason, route }),
  });
  if (!res.ok) throw new Error(`Manual override failed: ${res.statusText}`);
  return res.json();
}


