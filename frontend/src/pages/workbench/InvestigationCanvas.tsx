import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { StatusDot } from '../../components/ui/Micrographics';
import {
  User,
  Smartphone,
  CreditCard,
  AlertTriangle,
  Database,
  Layers,
  ShieldAlert,
  RefreshCw,
} from 'lucide-react';
import { fetchGraphSchema, type CaseGraphData, type SchemaOntology } from '../../api/client';

// ---------------------------------------------------------------------------
// Custom Node Component: ForensicEntityNode (For Case Investigation Subgraph)
// ---------------------------------------------------------------------------
interface ForensicNodeData {
  label: string;
  type: string;
  status?: 'safe' | 'pending' | 'danger';
  color?: string;
  sublabel?: string;
  amount?: number | string;
  risk?: number;
  isThreatBeacon?: boolean;
  iconType?: 'card' | 'user' | 'tx' | 'device' | 'precedent' | 'database';
  attributes?: Record<string, any>;
  [key: string]: any;
}

function ForensicEntityNode({ data, selected }: NodeProps<Node<ForensicNodeData>>) {
  const color = data.color || '#06b6d4';
  const isDanger = data.status === 'danger' || data.isThreatBeacon;

  const renderIcon = () => {
    switch (data.iconType) {
      case 'user':
        return <User size={14} className="text-[#3b82f6]" />;
      case 'card':
        return <CreditCard size={14} className="text-[#10b981]" />;
      case 'device':
        return <Smartphone size={14} className="text-[#f59e0b]" />;
      case 'tx':
        return <AlertTriangle size={14} className="text-[#ef4444]" />;
      case 'precedent':
        return <ShieldAlert size={14} className="text-[#ef4444]" />;
      default:
        return <Database size={14} className="text-[#06b6d4]" />;
    }
  };

  return (
    <div
      style={{ borderLeftColor: color, borderLeftWidth: 3 }}
      className={`relative min-w-[200px] max-w-[240px] bg-zinc-950/95 border rounded px-3.5 py-2.5 shadow-2xl backdrop-blur-md transition-all font-mono select-none ${
        selected
          ? 'border-[#06b6d4] ring-2 ring-[#06b6d4]/40 shadow-[0_0_25px_rgba(6,182,212,0.35)]'
          : isDanger
          ? 'border-[#ef4444]/60 hover:border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.15)]'
          : 'border-white/10 hover:border-white/30'
      }`}
    >
      {/* Handles on all 4 boundaries for collision-free routing */}
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-[#06b6d4] !border-none opacity-60" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-[#06b6d4] !border-none opacity-60" />
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-[#06b6d4] !border-none opacity-60" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-[#06b6d4] !border-none opacity-60" />

      {/* Top Bar: Icon, Entity Type, Status */}
      <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          {renderIcon()}
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold truncate max-w-[120px]">
            {data.type}
          </span>
        </div>
        <StatusDot status={data.status || 'safe'} />
      </div>

      {/* Primary Identifier */}
      <div className="text-white text-xs font-bold tracking-tight truncate py-0.5">
        {data.label}
      </div>

      {/* Forensic Details / Sublabel */}
      <div className="text-[10px] text-zinc-400 flex items-center justify-between pt-1">
        <span className="truncate max-w-[130px]">{data.sublabel || 'Forensic Entity'}</span>
        {data.risk !== undefined && (
          <span
            className={`font-bold ml-1 text-[9px] ${
              data.risk > 0.7 ? 'text-[#ef4444]' : data.risk > 0.4 ? 'text-[#f59e0b]' : 'text-[#10b981]'
            }`}
          >
            {Math.round(data.risk * 100)}% RISK
          </span>
        )}
      </div>

      {/* Amount or Threat Beacon Highlight */}
      {data.amount && (
        <div className="mt-1 text-[11px] font-bold text-[#ef4444] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 text-center">
          {typeof data.amount === 'number' ? `$${data.amount.toLocaleString()}` : data.amount}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom Node Component: SchemaVertexNode (For TigerGraph Schema Ontology)
// ---------------------------------------------------------------------------
interface SchemaNodeData {
  label: string;
  type: string;
  primary_id?: string;
  attributes?: string[];
  total_attributes?: number;
  color?: string;
  [key: string]: any;
}

function SchemaVertexNode({ data, selected }: NodeProps<Node<SchemaNodeData>>) {
  const color = data.color || '#06b6d4';

  return (
    <div
      style={{ borderTopColor: color, borderTopWidth: 3 }}
      className={`min-w-[190px] bg-black/90 border rounded-md p-3 shadow-xl backdrop-blur-md font-mono select-none transition-all ${
        selected ? 'border-[#06b6d4] ring-2 ring-[#06b6d4]/40' : 'border-white/10 hover:border-white/30'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-[#06b6d4] opacity-70" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-[#06b6d4] opacity-70" />
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-[#06b6d4] opacity-70" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-[#06b6d4] opacity-70" />

      {/* Schema Header */}
      <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{data.label}</span>
        </div>
        <span className="text-[8px] text-zinc-500">{data.total_attributes || 0} fields</span>
      </div>

      {/* Primary Key */}
      {data.primary_id && (
        <div className="text-[9px] text-zinc-400 mb-1 flex items-center gap-1">
          <span className="text-[#06b6d4] font-bold">PK:</span>
          <span className="text-zinc-300">{data.primary_id}</span>
        </div>
      )}

      {/* Attributes preview */}
      <div className="space-y-0.5 pt-0.5">
        {(data.attributes || []).slice(0, 4).map((attr: string, i: number) => (
          <div key={i} className="text-[8px] text-zinc-500 truncate flex items-center gap-1">
            <span className="text-zinc-700">•</span> {attr}
          </div>
        ))}
      </div>
    </div>
  );
}

// Register custom node types
const nodeTypes = {
  forensicNode: ForensicEntityNode,
  schemaNode: SchemaVertexNode,
};

// ---------------------------------------------------------------------------
// Main InvestigationCanvas Component with React Flow
// ---------------------------------------------------------------------------
interface InvestigationCanvasProps {
  caseDetails: any;
  caseGraph?: CaseGraphData | null;
  onSelectNode?: (nodeId: string) => void;
  selectedNodeId?: string | null;
}

export function InvestigationCanvas({
  caseDetails,
  caseGraph,
  onSelectNode,
  selectedNodeId,
}: InvestigationCanvasProps) {
  const [viewMode, setViewMode] = useState<'subgraph' | 'schema'>('subgraph');
  const [schemaData, setSchemaData] = useState<SchemaOntology | null>(null);
  const [isLoadingSchema, setIsLoadingSchema] = useState(false);

  // 8-Step Core Flow Stages
  const uncertainty = caseDetails?.uncertainty_score ?? 0.5;
  const isResolved =
    caseDetails?.status === 'closed_cleared' ||
    caseDetails?.status === 'closed_fraud' ||
    caseDetails?.verdict === 'cleared' ||
    caseDetails?.verdict === 'fraud';
  const hasStage2 = Boolean(caseDetails?.next_best_actions?.final?.length);

  const stages = [
    { name: 'Trigger', active: false, complete: true },
    { name: 'Investigate', active: false, complete: true },
    { name: 'Evidence', active: false, complete: Boolean(caseDetails?.evidence?.length) },
    { name: 'Uncertainty', active: false, complete: uncertainty !== undefined },
    { name: 'More Evidence', active: !isResolved && uncertainty > 0.4, complete: isResolved || uncertainty <= 0.4 },
    { name: 'Reassess', active: !isResolved && hasStage2, complete: isResolved || hasStage2 },
    { name: 'Action', active: false, complete: isResolved || hasStage2 },
    { name: 'Resolve', active: isResolved, complete: isResolved },
  ];

  // Fetch schema when user toggles to schema view
  const loadSchema = useCallback(async () => {
    if (schemaData) return;
    setIsLoadingSchema(true);
    try {
      const data = await fetchGraphSchema();
      setSchemaData(data);
    } catch (e) {
      console.error('Failed to load TigerGraph schema:', e);
    } finally {
      setIsLoadingSchema(false);
    }
  }, [schemaData]);

  useEffect(() => {
    if (viewMode === 'schema') {
      loadSchema();
    }
  }, [viewMode, loadSchema]);

  // Construct Subgraph Nodes & Edges from caseDetails / caseGraph
  const { initialCaseNodes, initialCaseEdges } = useMemo(() => {
    const customerId = caseDetails?.customer_id || 'C08623';
    const cardId = caseDetails?.primary_card_id || 'C08623-K2';
    const txId = caseDetails?.first_suspicious_txn_id || '3530164';
    const exposure = caseDetails?.exposure_usd !== undefined ? `$${Math.round(caseDetails.exposure_usd).toLocaleString()}` : '$0';
    const deviceRaw = caseDetails?.connected_device_profiles?.[0] || 'Unknown Device';
    const precedents = caseDetails?.similar_prior_cases || [];

    const nodes: Node<ForensicNodeData>[] = [
      // 1. Customer Node
      {
        id: `cust_${customerId}`,
        type: 'forensicNode',
        position: { x: 40, y: 160 },
        selected: selectedNodeId === `cust_${customerId}`,
        data: {
          label: customerId,
          type: 'Party / Customer',
          iconType: 'user',
          status: 'safe',
          color: '#3B82F6',
          sublabel: 'Account Holder',
          risk: 0.12,
        },
      },
      // 2. Account Card Node
      {
        id: `card_${cardId}`,
        type: 'forensicNode',
        position: { x: 300, y: 160 },
        selected: selectedNodeId === `card_${cardId}`,
        data: {
          label: cardId,
          type: 'Account Card',
          iconType: 'card',
          status: 'safe',
          color: '#10B981',
          sublabel: 'Issued Payment Card',
          risk: 0.28,
        },
      },
      // 3. Flagged Transaction Node
      {
        id: `tx_${txId}`,
        type: 'forensicNode',
        position: { x: 570, y: 160 },
        selected: selectedNodeId === `tx_${txId}`,
        data: {
          label: `#${txId}`,
          type: 'Payment Txn',
          iconType: 'tx',
          status: 'danger',
          color: '#EF4444',
          sublabel: 'Flagged Event',
          amount: exposure,
          risk: caseDetails?.risk_score ?? 0.85,
        },
      },
      // 4. Device Node
      {
        id: 'node_device',
        type: 'forensicNode',
        position: { x: 300, y: 30 },
        selected: selectedNodeId === 'node_device',
        data: {
          label: deviceRaw.includes('|') ? deviceRaw.split('|')[0].trim() : deviceRaw.substring(0, 18),
          type: 'Device Profile',
          iconType: 'device',
          status: 'pending',
          color: '#F59E0B',
          sublabel: 'Browser / OS Fingerprint',
          risk: 0.65,
        },
      },
    ];

    // 5. Precedent Beacon (if case has similar prior cases)
    if (precedents.length > 0) {
      nodes.push({
        id: `cc_${precedents[0]}`,
        type: 'forensicNode',
        position: { x: 180, y: 300 },
        selected: selectedNodeId === `cc_${precedents[0]}`,
        data: {
          label: precedents[0],
          type: 'Precedent Memory',
          iconType: 'precedent',
          status: 'danger',
          color: '#EF4444',
          sublabel: 'Closed Fraud Case',
          isThreatBeacon: true,
          risk: 0.94,
        },
      });
    }

    // 6. TigerGraph Savanna Cloud Engine Node
    nodes.push({
      id: 'node_tg_savanna',
      type: 'forensicNode',
      position: { x: 440, y: 300 },
      selected: selectedNodeId === 'node_tg_savanna',
      data: {
        label: 'Savanna Cloud',
        type: 'TigerGraph GraphRAG',
        iconType: 'database',
        status: 'safe',
        color: '#06B6D4',
        sublabel: 'Transaction_Fraud',
      },
    });

    const edges: Edge[] = [
      {
        id: 'e_cust_card',
        source: `cust_${customerId}`,
        target: `card_${cardId}`,
        label: 'OWNS',
        style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(255,255,255,0.4)' },
      },
      {
        id: 'e_card_tx',
        source: `card_${cardId}`,
        target: `tx_${txId}`,
        label: 'MADE_TXN',
        animated: true,
        style: { stroke: '#EF4444', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' },
      },
      {
        id: 'e_dev_card',
        source: 'node_device',
        target: `card_${cardId}`,
        label: 'USED_DEVICE',
        style: { stroke: '#F59E0B', strokeWidth: 1.5, strokeDasharray: '4 4' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' },
      },
    ];

    if (precedents.length > 0) {
      edges.push({
        id: 'e_card_precedent',
        source: `card_${cardId}`,
        target: `cc_${precedents[0]}`,
        label: 'MATCHED_PRECEDENT',
        animated: true,
        style: { stroke: '#EF4444', strokeWidth: 1.5, strokeDasharray: '3 3' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' },
      });
    }

    edges.push({
      id: 'e_tx_savanna',
      source: `tx_${txId}`,
      target: 'node_tg_savanna',
      label: 'INDEXED_IN_GRAPH',
      style: { stroke: '#06B6D4', strokeWidth: 1.5, strokeDasharray: '4 4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#06B6D4' },
    });

    return { initialCaseNodes: nodes, initialCaseEdges: edges };
  }, [caseDetails, selectedNodeId]);

  // Construct Schema Ontology Nodes & Edges from live TigerGraph Schema
  const { schemaNodes, schemaEdges } = useMemo(() => {
    if (!schemaData) return { schemaNodes: [], schemaEdges: [] };

    // Select primary vertices for a clean topological grid
    const primaryVertices = schemaData.flow_nodes.slice(0, 16);
    const cols = 4;
    const nodes: Node<SchemaNodeData>[] = primaryVertices.map((v: any, index: number) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      return {
        id: v.id,
        type: 'schemaNode',
        position: { x: col * 280 + 40, y: row * 180 + 40 },
        selected: selectedNodeId === v.id,
        data: {
          label: v.label,
          type: 'SchemaVertex',
          primary_id: v.primary_id,
          attributes: v.attributes,
          total_attributes: v.total_attributes,
          color: v.color,
        },
      };
    });

    const activeNodeIds = new Set(nodes.map((n) => n.id));
    const edges: Edge[] = schemaData.flow_edges
      .filter((e: any) => activeNodeIds.has(e.source) && activeNodeIds.has(e.target))
      .slice(0, 24)
      .map((e: any) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        labelStyle: { fill: '#a1a1aa', fontSize: 9, fontFamily: 'monospace' },
        labelBgStyle: { fill: 'rgba(0, 0, 0, 0.75)', stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 2,
        style: { stroke: 'rgba(6,182,212,0.4)', strokeWidth: 1.2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#06b6d4' },
      }));

    return { schemaNodes: nodes, schemaEdges: edges };
  }, [schemaData, selectedNodeId]);

  // State management for React Flow
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<any>>(initialCaseNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialCaseEdges);

  // Update nodes/edges on view mode or case changes
  useEffect(() => {
    if (viewMode === 'subgraph') {
      setNodes(initialCaseNodes);
      setEdges(initialCaseEdges);
    } else if (schemaData) {
      setNodes(schemaNodes);
      setEdges(schemaEdges);
    }
  }, [viewMode, initialCaseNodes, initialCaseEdges, schemaNodes, schemaEdges, schemaData, setNodes, setEdges]);

  // Node selection handler
  const handleNodeClick = (_: any, node: Node) => {
    onSelectNode?.(node.id);
  };

  const threatDensity = caseGraph?.metrics?.threat_density ?? (caseDetails?.risk_score ?? 0.8);

  return (
    <div className="flex-1 flex relative overflow-hidden select-none bg-black">
      {/* Left: Investigation Stage Tracker (8-Step Core Flow) */}
      <div className="w-32 border-r border-white/[0.04] flex flex-col p-6 items-center shrink-0 z-10 bg-black">
        <div className="flex-1 flex flex-col items-center justify-between py-6 w-full relative">
          <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-px bg-white/[0.1] z-0"></div>

          {stages.map((s, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-2 group">
              <div
                className={`w-3 h-3 rounded-full border flex items-center justify-center bg-black transition-all ${
                  s.complete
                    ? 'border-[#10b981]'
                    : s.active
                    ? 'border-[#06b6d4] shadow-[0_0_10px_#06b6d4]'
                    : 'border-zinc-700'
                }`}
              >
                {(s.complete || s.active) && (
                  <div className={`w-1.5 h-1.5 rounded-full ${s.complete ? 'bg-[#10b981]' : 'bg-[#06b6d4] animate-ping'}`} />
                )}
              </div>
              <span
                className={`text-[9px] font-mono tracking-widest uppercase absolute left-6 w-24 top-0 transition-colors ${
                  s.complete ? 'text-zinc-400' : s.active ? 'text-white font-bold' : 'text-zinc-600'
                }`}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Center: React Flow Interactive Graph Canvas */}
      <div className="flex-1 relative flex flex-col overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black">
        {/* Top Floating Controls & Telemetry HUD */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          {/* Mode Switcher */}
          <div className="pointer-events-auto flex items-center bg-black/80 border border-white/10 p-1 rounded font-mono text-[9px] tracking-widest uppercase backdrop-blur-md">
            <button
              onClick={() => setViewMode('subgraph')}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === 'subgraph' ? 'bg-[#06b6d4] text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Case Subgraph
            </button>
            <button
              onClick={() => setViewMode('schema')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                viewMode === 'schema' ? 'bg-[#06b6d4] text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isLoadingSchema && <RefreshCw size={10} className="animate-spin" />}
              TigerGraph Schema
            </button>
          </div>

          {/* Graph Telemetry Metrics */}
          <div className="pointer-events-auto flex items-center gap-4 bg-black/80 border border-white/10 px-4 py-1.5 rounded font-mono text-[9px] tracking-widest text-zinc-400 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <Layers size={11} className="text-[#06b6d4]" />
              <span>
                NODES: <strong className="text-white">{nodes.length}</strong>
              </span>
            </div>
            <div className="w-px h-3 bg-white/20" />
            <div>
              <span>
                EDGES: <strong className="text-white">{edges.length}</strong>
              </span>
            </div>
            {viewMode === 'subgraph' && (
              <>
                <div className="w-px h-3 bg-white/20" />
                <div>
                  <span>
                    THREAT DENSITY:{' '}
                    <strong className="text-[#ef4444]">{Math.round(threatDensity * 100)}%</strong>
                  </span>
                </div>
              </>
            )}
            {viewMode === 'schema' && (
              <>
                <div className="w-px h-3 bg-white/20" />
                <div className="text-[#10b981]">
                  <span>GRAPH: <strong>Transaction_Fraud</strong></span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* React Flow Viewport */}
        <div className="w-full h-full flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            minZoom={0.3}
            maxZoom={2}
            defaultEdgeOptions={{
              type: 'smoothstep',
            }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#27272a" />
            <Controls
              position="bottom-right"
              className="!bg-black/80 !border-white/10 !rounded-sm !shadow-2xl [&>button]:!bg-transparent [&>button]:!border-white/10 [&>button]:!text-zinc-400 hover:[&>button]:!text-white"
              showInteractive={false}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
