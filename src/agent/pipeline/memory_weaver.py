"""
Agent 7: Memory Weaver (Graph-Native Memory & Precedent Specialist).
Executes hybrid retrieval (384-dim semantic embeddings + structural graph overlap + RRF),
and commits the resolved case vertex and edges back into TigerGraph Savanna Cloud.
"""

from typing import Dict, Any, List
from src.agent.pipeline.base import BaseSpecializedAgent, InvestigationContext
from src.memory.closed_cases import GraphNativeCaseMemory


class MemoryWeaverAgent(BaseSpecializedAgent):
    """
    Graph-native memory and precedent specialist.
    Mathematical computation: 384-dim cosine similarity, 2-hop structural overlap, RRF (K=60) merge.
    Cognitive inference: Precedent synthesis and analogical reasoning.
    """

    def __init__(self):
        super().__init__(
            agent_id="agent_7_memory_weaver",
            agent_name="Memory Weaver",
            role="TigerGraph Graph-Native Memory, Hybrid Precedent Retrieval & Case Commit"
        )
        self.memory = GraphNativeCaseMemory.get_instance()

    def compute(self, context: InvestigationContext) -> Dict[str, Any]:
        # 1. Retrieve Precedents via Hybrid Retrieval (TigerVector + Structural + RRF)
        case_narrative_for_search = (
            f"Case {context.case_id}: {context.trigger_type} alert on card {context.card_id}. "
            f"Amount: ${context.flagged_amt:,.2f}, channel: {context.flagged_channel}. "
            + "; ".join([e.claim for e in context.evidence_items])
        )
        similar_prior_results = self.memory.find_similar_cases(
            card_id=context.card_id,
            customer_id=context.customer_id,
            pattern=context.pattern,
            query_text=case_narrative_for_search,
            device_profiles=[context.full_device_profile] if context.full_device_profile else [],
            top_k=3,
        )
        precedent_ids = [r["case_id"] for r in similar_prior_results]
        context.similar_prior_cases = precedent_ids

        # 2. Commit Resolved Case to TigerGraph Savanna Cloud
        evidence_claims = [e.claim for e in context.evidence_items]
        sar_narrative = context.sar.narrative if context.sar and context.sar.file else None

        commit_success = self.memory.write_case_to_graph(
            case_id=context.case_id,
            case_data={
                "status": context.final_status,
                "verdict": context.final_verdict,
                "fraud_probability": context.fraud_probability,
                "pattern": context.pattern,
                "pattern_description": context.pattern_description,
                "first_suspicious_txn_id": str(context.flagged_txn_id),
                "connected_card_ids": [context.card_id] + [c for c in context.connected_cards if c != context.card_id],
                "connected_device_profiles": [context.full_device_profile] if context.full_device_profile else [],
                "exposure_usd": context.exposure_usd,
                "summary": f"Case {context.case_id} concluded with verdict '{context.final_verdict}'.",
            },
            evidence_claims=evidence_claims,
            sar_narrative=sar_narrative,
        )

        context.written_to_graph = commit_success
        context.graph_case_id = f"CASE-SAVANNA-{context.case_id}"

        return {
            "precedents_retrieved_count": len(precedent_ids),
            "similar_prior_cases": precedent_ids,
            "rrf_k_parameter": 60,
            "embedding_dimension": 384,
            "written_to_graph": commit_success,
            "graph_case_id": context.graph_case_id,
            "hand_off_summary": f"Memory integrated: Retrieved {len(precedent_ids)} precedents ({', '.join(precedent_ids)}). Case persisted to TigerGraph ({context.graph_case_id})."
        }

    def infer(self, math_results: Dict[str, Any], context: InvestigationContext) -> str:
        precedents = math_results["similar_prior_cases"]
        if not precedents:
            return (
                f"Memory Weaver finding: Case {context.case_id} established a new topological baseline in TigerGraph. "
                f"No previous cases matched this exact feature vector in memory."
            )

        prompt = (
            f"Case {context.case_id} Precedent Retrieval Synthesis:\n"
            f"- Current Case Pattern: {context.pattern} (Verdict: {context.final_verdict}, Exposure: ${context.exposure_usd:,.2f})\n"
            f"- Retrieved Precedents from TigerGraph Memory: {precedents}\n"
            f"- Retrieval Method: Reciprocal Rank Fusion (RRF K=60) combining 384-dim dense vectors and 2-hop graph overlap\n\n"
            f"As Memory Weaver, deliver a concise 2-sentence analogical synthesis explaining how these historical precedents validate the current investigative decision."
        )
        fallback = (
            f"Memory Weaver matched Case {context.case_id} against historical precedents ({', '.join(precedents)}) "
            f"using 384-dimensional dense semantic vectors and structural graph overlap in TigerGraph."
        )
        return self.llm.generate_forensic_narrative(prompt, fallback_text=fallback)
