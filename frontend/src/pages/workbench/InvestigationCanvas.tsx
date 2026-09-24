import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
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

import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from 'd3-force';

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
  X,
  Activity,
  Compass,
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
      className={`relative min-w-[210px] max-w-[250px] bg-zinc-950/95 border rounded px-3.5 py-2.5 shadow-2xl backdrop-blur-md transition-all font-mono select-none ${
        selected
          ? 'border-[#06b6d4] ring-2 ring-[#06b6d4]/50 shadow-[0_0_25px_rgba(6,182,212,0.35)] scale-105'
          : isDanger
          ? 'border-[#ef4444]/60 hover:border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.2)]'
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
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold truncate max-w-[125px]">
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
        selected ? 'border-[#06b6d4] ring-2 ring-[#06b6d4]/40 scale-105' : 'border-white/10 hover:border-white/30'
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
// D3-Force Positioning Physics Simulation
// ---------------------------------------------------------------------------
interface SimNode extends SimulationNodeDatum {
  id: string;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  source: string;
  target: string;
}

function calculateD3ForceLayout(
  nodes: Node<any>[],
  edges: Edge[],
  centerX: number = 380,
  centerY: number = 240
): Node<any>[] {
  if (nodes.length === 0) return nodes;

  const simNodes: SimNode[] = nodes.map((n, i) => ({
    id: n.id,
    x: n.position.x || centerX + Math.cos((i * 2 * Math.PI) / nodes.length) * 160,
    y: n.position.y || centerY + Math.sin((i * 2 * Math.PI) / nodes.length) * 160,
  }));

  const simLinks: SimLink[] = edges
    .filter((e) => simNodes.some((n) => n.id === e.source) && simNodes.some((n) => n.id === e.target))
    .map((e) => ({
      source: e.source,
      target: e.target,
    }));

  const simulation = forceSimulation<SimNode>(simNodes)
    .force(
      'link',
      forceLink<SimNode, SimLink>(simLinks)
        .id((d) => d.id)
        .distance(180)
        .strength(0.8)
    )
    .force('charge', forceManyBody().strength(-750))
    .force('center', forceCenter(centerX, centerY))
    .force('collision', forceCollide().radius(120).strength(1))
    .stop();

  // Run 120 iterations synchronously for instant organic equilibrium
  for (let i = 0; i < 120; ++i) {
    simulation.tick();
  }

  const posMap = new Map(simNodes.map((d) => [d.id, { x: Math.round(d.x ?? centerX), y: Math.round(d.y ?? centerY) }]));

  return nodes.map((n) => ({
    ...n,
    position: posMap.get(n.id) || n.position,
  }));
}

// ---------------------------------------------------------------------------
// Main InvestigationCanvas Component with React Flow + D3-Force Physics
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
  const [activeInspectorNode, setActiveInspectorNode] = useState<Node<any> | null>(null);

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

  // Construct Subgraph Nodes & Edges from caseDetails and compute D3-force layout
  const { initialCaseNodes, initialCaseEdges } = useMemo(() => {
    const customerId = caseDetails?.customer_id || 'C08623';
    const cardId = caseDetails?.primary_card_id || 'C08623-K2';
    const txId = caseDetails?.first_suspicious_txn_id || '3530164';
    const exposure =
      caseDetails?.exposure_usd !== undefined ? `$${Math.round(caseDetails.exposure_usd).toLocaleString()}` : '$0';
    const deviceRaw = caseDetails?.connected_device_profiles?.[0] || 'Unknown Device';
    const precedents = caseDetails?.similar_prior_cases || [];

    const rawNodes: Node<ForensicNodeData>[] = [
      // 1. Customer Node
      {
        id: `cust_${customerId}`,
        type: 'forensicNode',
        position: { x: 80, y: 220 },
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
      // 2. Account Card Node (Central Anchor)
      {
        id: `card_${cardId}`,
        type: 'forensicNode',
        position: { x: 380, y: 220 },
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
      // 3. Flagged Transaction Node (Threat Source)
      {
        id: `tx_${txId}`,
        type: 'forensicNode',
        position: { x: 680, y: 220 },
        selected: selectedNodeId === `tx_${txId}`,
        data: {
          label: `#${txId}`,
          type: 'Payment Txn',
          iconType: 'tx',
          status: 'danger',
          color: '#EF4444',
          sublabel: 'Flagged Anomaly',
          amount: exposure,
          risk: caseDetails?.risk_score ?? 0.85,
        },
      },
      // 4. Device Node
      {
        id: 'node_device',
        type: 'forensicNode',
        position: { x: 380, y: 50 },
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
      rawNodes.push({
        id: `cc_${precedents[0]}`,
        type: 'forensicNode',
        position: { x: 220, y: 390 },
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
    rawNodes.push({
      id: 'node_tg_savanna',
      type: 'forensicNode',
      position: { x: 540, y: 390 },
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
        labelStyle: { fill: '#94a3b8', fontSize: 9, fontFamily: 'monospace' },
        labelBgStyle: { fill: 'rgba(0, 0, 0, 0.8)', stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 2,
        style: { stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(255,255,255,0.6)' },
      },
      {
        id: 'e_card_tx',
        source: `card_${cardId}`,
        target: `tx_${txId}`,
        label: 'MADE_TXN',
        animated: true,
        labelStyle: { fill: '#ef4444', fontSize: 9, fontFamily: 'monospace', fontWeight: 'bold' },
        labelBgStyle: { fill: 'rgba(20, 0, 0, 0.9)', stroke: '#ef4444', strokeWidth: 1 },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 2,
        style: { stroke: '#EF4444', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' },
      },
      {
        id: 'e_dev_card',
        source: 'node_device',
        target: `card_${cardId}`,
        label: 'USED_DEVICE',
        labelStyle: { fill: '#f59e0b', fontSize: 9, fontFamily: 'monospace' },
        labelBgStyle: { fill: 'rgba(20, 15, 0, 0.85)', stroke: '#f59e0b', strokeWidth: 1 },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 2,
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
        labelStyle: { fill: '#ef4444', fontSize: 9, fontFamily: 'monospace' },
        labelBgStyle: { fill: 'rgba(20, 0, 0, 0.9)', stroke: '#ef4444', strokeWidth: 1 },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 2,
        style: { stroke: '#EF4444', strokeWidth: 1.5, strokeDasharray: '3 3' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' },
      });
    }

    edges.push({
      id: 'e_tx_savanna',
      source: `tx_${txId}`,
      target: 'node_tg_savanna',
      label: 'INDEXED_IN_GRAPH',
      labelStyle: { fill: '#06b6d4', fontSize: 9, fontFamily: 'monospace' },
      labelBgStyle: { fill: 'rgba(0, 20, 25, 0.85)', stroke: '#06b6d4', strokeWidth: 1 },
      labelBgPadding: [4, 2] as [number, number],
      labelBgBorderRadius: 2,
      style: { stroke: '#06B6D4', strokeWidth: 1.5, strokeDasharray: '4 4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#06B6D4' },
    });

    // Run D3-Force physics simulation to establish organic positions
    const forcePositionedNodes = calculateD3ForceLayout(rawNodes, edges, 380, 240);

    return { initialCaseNodes: forcePositionedNodes, initialCaseEdges: edges };
  }, [caseDetails, selectedNodeId]);

  // Construct Schema Ontology Nodes & Edges from live TigerGraph Schema
  const { schemaNodes, schemaEdges } = useMemo(() => {
    if (!schemaData) return { schemaNodes: [], schemaEdges: [] };

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

  // Handle Node Click -> Opens Inspector Card
  const handleNodeClick = (_: any, node: Node) => {
    setActiveInspectorNode(node);
    onSelectNode?.(node.id);
  };

  // Re-run D3 Force physics on demand
  const handleRelayout = () => {
    if (viewMode === 'subgraph') {
      const refreshed = calculateD3ForceLayout(nodes, edges, 380, 240);
      setNodes(refreshed);
    }
  };

  const threatDensity = caseGraph?.metrics?.threat_density ?? (caseDetails?.risk_score ?? 0.8);

  return (
    <div className="flex-1 relative flex flex-col overflow-hidden select-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={() => setActiveInspectorNode(null)}
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

        {/* Top-Left Panel: Region 02 Header + Canvas Switcher & D3 Force Physics Trigger */}
        <Panel position="top-left" className="!m-4">
          <div className="flex flex-col gap-2">
            <div className="bg-black/90 border border-white/10 px-3 py-1.5 rounded backdrop-blur-md shadow-xl flex items-center gap-3">
              <div>
                <div className="font-mono text-[8px] text-[#06b6d4] uppercase tracking-[0.25em] font-bold">
                  REGION 02 • WHAT DO WE KNOW?
                </div>
                <div className="font-mono text-[11px] text-white font-bold tracking-wider uppercase flex items-center gap-2">
                  <Database size={12} className="text-[#06b6d4]" /> TIGERGRAPH + EVIDENCE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/85 border border-white/10 p-1 rounded font-mono text-[9px] tracking-widest uppercase backdrop-blur-md shadow-xl">
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

              {viewMode === 'subgraph' && (
                <button
                  onClick={handleRelayout}
                  className="px-2.5 py-1.5 bg-black/85 border border-white/10 hover:border-[#06b6d4] text-zinc-300 hover:text-white rounded font-mono text-[9px] tracking-widest uppercase backdrop-blur-md flex items-center gap-1.5 transition-colors shadow-xl"
                  title="Run D3-Force physics relaxation simulation"
                >
                  <Compass size={11} className="text-[#06b6d4]" />
                  <span>D3 Force Relax</span>
                </button>
              )}
            </div>
          </div>
        </Panel>

          {/* Top-Right Panel: Metrics & Proper Relationship Legend */}
          <Panel position="top-right" className="!m-4">
            <div className="bg-black/90 border border-white/10 p-3 rounded-md font-mono text-[9px] tracking-wider text-zinc-400 backdrop-blur-md shadow-2xl space-y-2.5 max-w-[280px]">
              {/* Telemetry Row */}
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5">
                  <Layers size={11} className="text-[#06b6d4]" />
                  <span>NODES: <strong className="text-white">{nodes.length}</strong></span>
                </div>
                <div className="w-px h-3 bg-white/20" />
                <div>
                  <span>EDGES: <strong className="text-white">{edges.length}</strong></span>
                </div>
                <div className="w-px h-3 bg-white/20" />
                <div>
                  <span>RISK: <strong className="text-[#ef4444]">{Math.round(threatDensity * 100)}%</strong></span>
                </div>
              </div>

              {/* Relationship Legend */}
              <div className="space-y-1.5 pt-0.5">
                <div className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
                  Relationship Topology Legend
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <div className="w-4 h-[2px] bg-white/50" />
                  <span>OWNS (Customer ➔ Card)</span>
                </div>
                <div className="flex items-center gap-2 text-[#ef4444]">
                  <div className="w-4 h-[2px] bg-[#ef4444] shadow-[0_0_8px_#ef4444]" />
                  <span className="font-bold flex items-center gap-1">
                    <Activity size={10} className="animate-pulse" /> MADE_TXN (Card ➔ Txn)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#f59e0b]">
                  <div className="w-4 h-[2px] border-b border-[#f59e0b] border-dashed" />
                  <span>USED_DEVICE (Device ➔ Card)</span>
                </div>
                <div className="flex items-center gap-2 text-[#ef4444]">
                  <div className="w-4 h-[2px] border-b border-[#ef4444] border-dotted" />
                  <span>MATCHED_PRECEDENT (Beacon)</span>
                </div>
                <div className="flex items-center gap-2 text-[#06b6d4]">
                  <div className="w-4 h-[2px] border-b border-[#06b6d4] border-dashed" />
                  <span>INDEXED_IN_GRAPH (Savanna)</span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Bottom-Left Panel: Interactive Forensic Entity Inspector (On Node Click) */}
          {activeInspectorNode && (
            <Panel position="bottom-left" className="!m-4 !mb-6">
              <div className="bg-zinc-950/95 border border-[#06b6d4]/50 p-4 rounded-md font-mono text-[10px] text-zinc-300 backdrop-blur-xl shadow-2xl max-w-[320px] ring-1 ring-[#06b6d4]/20 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-start justify-between pb-2 mb-2 border-b border-white/[0.08]">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#06b6d4] font-bold">
                      {activeInspectorNode.data.type || 'Entity Details'}
                    </span>
                    <div className="text-white text-sm font-bold truncate mt-0.5">
                      {activeInspectorNode.data.label}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveInspectorNode(null)}
                    className="text-zinc-500 hover:text-white p-1 transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="space-y-1.5 text-zinc-400">
                  <div className="flex justify-between">
                    <span>Forensic ID:</span>
                    <span className="text-zinc-200 font-bold">{activeInspectorNode.id}</span>
                  </div>
                  {activeInspectorNode.data.risk !== undefined && (
                    <div className="flex justify-between">
                      <span>Threat Risk:</span>
                      <span className={`font-bold ${activeInspectorNode.data.risk > 0.7 ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>
                        {Math.round(activeInspectorNode.data.risk * 100)}%
                      </span>
                    </div>
                  )}
                  {activeInspectorNode.data.amount && (
                    <div className="flex justify-between">
                      <span>Exposure:</span>
                      <span className="text-[#ef4444] font-bold">{activeInspectorNode.data.amount}</span>
                    </div>
                  )}
                  {activeInspectorNode.data.sublabel && (
                    <div className="flex justify-between">
                      <span>Profile:</span>
                      <span className="text-zinc-200 truncate max-w-[180px]">{activeInspectorNode.data.sublabel}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.06] text-[9px] text-[#06b6d4] flex items-center justify-between">
                  <span>TigerGraph Node Verified</span>
                  <span className="text-zinc-500">Drag to arrange</span>
                </div>
              </div>
            </Panel>
          )}

          {/* Bottom-Right Controls */}
          <Controls
            position="bottom-right"
            className="!bg-black/85 !border-white/10 !rounded-sm !shadow-2xl [&>button]:!bg-transparent [&>button]:!border-white/10 [&>button]:!text-zinc-400 hover:[&>button]:!text-white"
            showInteractive={false}
          />
        </ReactFlow>
    </div>
  );
}
