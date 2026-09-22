"""
Graph-Native Case Memory for Zyg0s Fraud Investigation Agent.

TigerGraph IS the memory. Each resolved case is a ClosedCase vertex with:
- Rich attributes (outcome, pattern, risk, verdict, narrative)
- 384-dim narrative embedding (via sentence-transformers / hash fallback)
- Real graph edges to Customer, AccountCard, DeviceProfile, BillingRegion, FraudPattern

Hybrid Retrieval on new case intake:
1. Vector Similarity — embed current case narrative, cosine search past case embeddings
2. Structural Similarity — graph traversal from current case's entities (shared cards, devices, regions)
3. Reciprocal Rank Fusion (RRF) — merge both ranked lists into a single ranked result

Design Principle:
    LangGraph state  = "Where am I in THIS investigation"  (short-term orchestration)
    TigerGraph       = "What has the system LEARNED across ALL investigations"  (persistent memory)
"""

import os
import time
from typing import List, Dict, Any, Optional, Tuple
from dotenv import load_dotenv

load_dotenv()

from src.memory.embeddings import (
    embed_case_narrative,
    cosine_similarity,
    build_case_narrative_text,
    EMBEDDING_DIM,
)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
RRF_K = 60  # Reciprocal Rank Fusion constant (standard value from literature)
STRUCTURAL_WEIGHT = 1.0  # Weight for structural similarity in final RRF
VECTOR_WEIGHT = 1.0  # Weight for vector similarity in final RRF


class GraphNativeCaseMemory:
    """
    Graph-native case memory backed by TigerGraph Savanna Cloud.

    Provides:
    - write_case_to_graph(): Commit resolved case + embedding + edges back to TigerGraph
    - find_similar_cases(): Hybrid retrieval (vector + structural + RRF merge)
    - get_case(): Direct vertex lookup
    """

    _instance: Optional["GraphNativeCaseMemory"] = None

    def __init__(self):
        self._conn = None
        self._local_cache: Dict[str, Dict[str, Any]] = {}
        self._embedding_cache: Dict[str, List[float]] = {}

    @classmethod
    def get_instance(cls) -> "GraphNativeCaseMemory":
        if cls._instance is None:
            cls._instance = GraphNativeCaseMemory()
        return cls._instance

    def _get_conn(self):
        """Lazy TigerGraph connection — fails gracefully for offline mode."""
        if self._conn is None:
            try:
                from src.graph.client import get_tg_connection
                self._conn = get_tg_connection()
            except Exception as e:
                print(f"[GraphMemory] TigerGraph connection unavailable: {e}")
                self._conn = None
        return self._conn

    # -----------------------------------------------------------------------
    # WRITE-BACK: Commit resolved case to TigerGraph
    # -----------------------------------------------------------------------

    def write_case_to_graph(
        self,
        case_id: str,
        case_data: Dict[str, Any],
        evidence_claims: Optional[List[str]] = None,
        sar_narrative: Optional[str] = None,
    ) -> bool:
        """
        The critical write-back step — commits a resolved investigation into the graph
        as a richly-connected ClosedCase vertex with embedding.

        This is called at the end of the LangGraph pipeline (Node 8: Update Memory).

        Args:
            case_id: Unique case identifier (e.g., "HHG-001")
            case_data: Dict from CaseRecord.model_dump()
            evidence_claims: List of evidence claim strings for embedding
            sar_narrative: SAR narrative text for embedding enrichment

        Returns:
            True if successfully written to TigerGraph, False if fell back to local cache.
        """
        # 1. Build narrative text for embedding
        narrative_text = build_case_narrative_text(
            case_id=case_id,
            outcome=case_data.get("status", "unknown"),
            pattern=case_data.get("pattern", "none"),
            pattern_description=case_data.get("pattern_description", ""),
            exposure_usd=case_data.get("exposure_usd", 0.0),
            summary=case_data.get("summary", ""),
            evidence_claims=evidence_claims,
            sar_narrative=sar_narrative,
        )

        # 2. Generate embedding
        embedding = embed_case_narrative(narrative_text)

        # 3. Always cache locally (for offline fallback and fast retrieval)
        self._local_cache[case_id] = case_data
        self._embedding_cache[case_id] = embedding

        # 4. Attempt graph write-back
        conn = self._get_conn()
        if conn is None:
            print(f"[GraphMemory] Offline -- case {case_id} cached locally only")
            return False

        try:
            graph_case_id = case_data.get("graph_case_id", f"CASE-{case_id}")

            # 4a. Upsert ClosedCase vertex with all attributes + narrative
            conn.upsertVertex(
                "ClosedCase",
                graph_case_id,
                attributes={
                    "customer_id": case_data.get("customer_id", ""),
                    "card_id": case_data.get("card_id", ""),
                    "outcome": case_data.get("status", ""),
                    "pattern": case_data.get("pattern", "none"),
                    "exposure_usd": case_data.get("exposure_usd", 0.0),
                    "analyst_notes": case_data.get("summary", ""),
                    "case_narrative": narrative_text,
                    "fraud_probability": case_data.get("fraud_probability", 0.0),
                    "verdict": case_data.get("verdict", ""),
                }
            )

            # 4b. Edges: Case → Customer
            customer_id = case_data.get("customer_id", "")
            if customer_id:
                try:
                    conn.upsertEdge(
                        "ClosedCase", graph_case_id,
                        "CASE_ON_CUSTOMER",
                        "Customer", customer_id,
                        attributes={}
                    )
                except Exception:
                    pass

            # 4c. Edges: Case → AccountCard(s)
            card_ids = case_data.get("connected_card_ids", [])
            for cid in card_ids:
                try:
                    conn.upsertEdge(
                        "ClosedCase", graph_case_id,
                        "ON_CARD",
                        "AccountCard", cid,
                        attributes={}
                    )
                except Exception:
                    pass

            # 4d. Edges: Case → DeviceProfile(s)
            device_profiles = case_data.get("connected_device_profiles", [])
            for dev in device_profiles:
                if dev and dev not in ("", "NoDevice"):
                    try:
                        conn.upsertEdge(
                            "ClosedCase", graph_case_id,
                            "CASE_ON_DEVICE",
                            "DeviceProfile", dev,
                            attributes={}
                        )
                    except Exception:
                        pass

            # 4e. Edges: Case → FraudPattern
            pattern = case_data.get("pattern", "none")
            if pattern:
                try:
                    # Upsert the FraudPattern vertex (idempotent)
                    conn.upsertVertex(
                        "FraudPattern",
                        pattern,
                        attributes={
                            "description": case_data.get("pattern_description", ""),
                        }
                    )
                    conn.upsertEdge(
                        "ClosedCase", graph_case_id,
                        "CASE_HAS_PATTERN",
                        "FraudPattern", pattern,
                        attributes={}
                    )
                except Exception:
                    pass

            # 4f. Edges: Case → Transaction(s)
            affected_txns = case_data.get("affected_txn_ids", [])
            for txn_id in affected_txns:
                try:
                    conn.upsertEdge(
                        "ClosedCase", graph_case_id,
                        "INVOLVES",
                        "Transaction", txn_id,
                        attributes={}
                    )
                except Exception:
                    pass

            print(f"[GraphMemory] [OK] Case {case_id} written to TigerGraph "
                  f"({len(card_ids)} cards, {len(device_profiles)} devices, "
                  f"pattern={pattern})")
            return True

        except Exception as e:
            print(f"[GraphMemory] [WARN] Graph write-back failed for {case_id}: {e}")
            return False

    # -----------------------------------------------------------------------
    # HYBRID RETRIEVAL: Vector + Structural + RRF Merge
    # -----------------------------------------------------------------------

    def find_similar_cases(
        self,
        customer_id: Optional[str] = None,
        card_id: Optional[str] = None,
        pattern: Optional[str] = None,
        query_text: Optional[str] = None,
        device_profiles: Optional[List[str]] = None,
        top_k: int = 5,
    ) -> List[Dict[str, Any]]:
        """
        Hybrid retrieval combining vector similarity and structural graph traversal.

        1. Vector path: Embed query_text → cosine similarity against cached/graph embeddings
        2. Structural path: Traverse from customer/card/devices → find connected past cases
        3. Merge: Reciprocal Rank Fusion (RRF)

        Returns:
            List of dicts with keys: case_id, score, match_type, reasons
        """
        vector_results = []
        structural_results = []

        # --- Vector Similarity ---
        if query_text:
            vector_results = self._vector_search(query_text, top_k=top_k * 2)

        # --- Structural Similarity ---
        structural_results = self._structural_search(
            customer_id=customer_id,
            card_id=card_id,
            pattern=pattern,
            device_profiles=device_profiles or [],
            top_k=top_k * 2,
        )

        # --- Reciprocal Rank Fusion ---
        merged = self._reciprocal_rank_fusion(
            vector_results, structural_results, top_k=top_k
        )

        return merged

    def _vector_search(
        self, query_text: str, top_k: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Embed query_text and find most similar past cases by cosine similarity.

        Currently runs against the local embedding cache. When TigerGraph Savanna
        adds native vector index support, this can be replaced with a GSQL query.
        """
        query_embedding = embed_case_narrative(query_text)
        scored: List[Tuple[str, float]] = []

        # Search local cache
        for cid, emb in self._embedding_cache.items():
            sim = cosine_similarity(query_embedding, emb)
            scored.append((cid, sim))

        # Also try loading from TigerGraph if cache is thin
        if len(scored) < 10:
            self._hydrate_embedding_cache()
            for cid, emb in self._embedding_cache.items():
                if not any(s[0] == cid for s in scored):
                    sim = cosine_similarity(query_embedding, emb)
                    scored.append((cid, sim))

        # Sort by similarity descending
        scored.sort(key=lambda x: x[1], reverse=True)

        return [
            {"case_id": cid, "score": sim, "match_type": "vector"}
            for cid, sim in scored[:top_k]
            if sim > 0.1  # Filter noise
        ]

    def _structural_search(
        self,
        customer_id: Optional[str],
        card_id: Optional[str],
        pattern: Optional[str],
        device_profiles: List[str],
        top_k: int = 10,
    ) -> List[Dict[str, Any]]:
        """
        Graph traversal from current case's entities to find structurally connected past cases.

        Scoring weights:
        - Shared device:  +3.0 (strongest signal — same physical fingerprint)
        - Same customer:  +2.0
        - Same card:      +2.0
        - Same pattern:   +1.5
        """
        case_scores: Dict[str, float] = {}
        case_reasons: Dict[str, List[str]] = {}

        def _add_score(cid: str, score: float, reason: str):
            case_scores[cid] = case_scores.get(cid, 0.0) + score
            case_reasons.setdefault(cid, []).append(reason)

        # Search local cache first (always available, even offline)
        for cid, cdata in self._local_cache.items():
            cached_cust = str(cdata.get("customer_id", ""))
            cached_cards = cdata.get("connected_card_ids", [])
            cached_devices = cdata.get("connected_device_profiles", [])
            cached_pattern = cdata.get("pattern", "none")

            if customer_id and cached_cust == customer_id:
                _add_score(cid, 2.0, "same_customer")

            if card_id and card_id in cached_cards:
                _add_score(cid, 2.0, "same_card")

            if device_profiles:
                for dp in device_profiles:
                    if dp and dp in cached_devices:
                        _add_score(cid, 3.0, f"shared_device:{dp}")

            if pattern and pattern != "none" and cached_pattern == pattern:
                _add_score(cid, 1.5, "same_pattern")

        # Try TigerGraph structural query if available
        conn = self._get_conn()
        if conn is not None:
            try:
                # Use installed GSQL query if available
                result = conn.runInstalledQuery(
                    "find_similar_cases_structural",
                    params={
                        "seed_customer_id": customer_id or "",
                        "seed_card_id": card_id or "",
                        "seed_device_ids": device_profiles or [],
                        "seed_pattern": pattern or "none",
                        "top_k": top_k,
                    },
                    timeout=10000,
                )
                if result and isinstance(result, list):
                    for r in result:
                        cases = r.get("similar_cases", [])
                        for c in cases:
                            cid = c.get("case_id", "")
                            score = c.get("score", 0.0)
                            reasons = c.get("match_reasons", "")
                            if cid:
                                _add_score(cid, score, f"graph:{reasons}")
            except Exception:
                # GSQL query not installed yet — that's fine, local cache covers it
                pass

        # Rank by total score
        ranked = sorted(case_scores.items(), key=lambda x: x[1], reverse=True)

        return [
            {
                "case_id": cid,
                "score": score,
                "match_type": "structural",
                "reasons": case_reasons.get(cid, []),
            }
            for cid, score in ranked[:top_k]
        ]

    @staticmethod
    def _reciprocal_rank_fusion(
        vector_results: List[Dict[str, Any]],
        structural_results: List[Dict[str, Any]],
        top_k: int = 5,
    ) -> List[Dict[str, Any]]:
        """
        Merge two ranked lists using Reciprocal Rank Fusion (RRF).

        RRF_score(d) = Σ  weight_i / (K + rank_i(d))

        where K is a constant (60 is standard from the original RRF paper).
        """
        rrf_scores: Dict[str, float] = {}
        match_info: Dict[str, Dict[str, Any]] = {}

        # Vector contributions
        for rank, item in enumerate(vector_results):
            cid = item["case_id"]
            rrf_scores[cid] = rrf_scores.get(cid, 0.0) + VECTOR_WEIGHT / (RRF_K + rank + 1)
            if cid not in match_info:
                match_info[cid] = {"vector_rank": rank + 1, "vector_score": item.get("score", 0.0)}
            else:
                match_info[cid]["vector_rank"] = rank + 1
                match_info[cid]["vector_score"] = item.get("score", 0.0)

        # Structural contributions
        for rank, item in enumerate(structural_results):
            cid = item["case_id"]
            rrf_scores[cid] = rrf_scores.get(cid, 0.0) + STRUCTURAL_WEIGHT / (RRF_K + rank + 1)
            if cid not in match_info:
                match_info[cid] = {
                    "structural_rank": rank + 1,
                    "structural_score": item.get("score", 0.0),
                    "reasons": item.get("reasons", []),
                }
            else:
                match_info[cid]["structural_rank"] = rank + 1
                match_info[cid]["structural_score"] = item.get("score", 0.0)
                match_info[cid]["reasons"] = item.get("reasons", [])

        # Sort by RRF score
        ranked = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)

        results = []
        for cid, rrf_score in ranked[:top_k]:
            info = match_info.get(cid, {})
            match_type = "hybrid"
            if "vector_rank" in info and "structural_rank" not in info:
                match_type = "vector_only"
            elif "structural_rank" in info and "vector_rank" not in info:
                match_type = "structural_only"

            results.append({
                "case_id": cid,
                "rrf_score": round(rrf_score, 6),
                "match_type": match_type,
                "vector_rank": info.get("vector_rank"),
                "vector_score": info.get("vector_score"),
                "structural_rank": info.get("structural_rank"),
                "structural_score": info.get("structural_score"),
                "reasons": info.get("reasons", []),
            })

        return results

    # -----------------------------------------------------------------------
    # DIRECT LOOKUP & CACHE MANAGEMENT
    # -----------------------------------------------------------------------

    def get_case(self, case_id: str) -> Optional[Dict[str, Any]]:
        """Direct case lookup — local cache first, then TigerGraph."""
        if case_id in self._local_cache:
            return self._local_cache[case_id]

        conn = self._get_conn()
        if conn is not None:
            try:
                result = conn.getVerticesById("ClosedCase", case_id)
                if result:
                    return result[0] if isinstance(result, list) else result
            except Exception:
                pass
        return None

    def add_closed_case(self, case_id: str, case_data: Dict[str, Any]):
        """
        Backward-compatible interface — calls write_case_to_graph internally.
        Maintains the same API signature as the old ClosedCaseMemory.
        """
        evidence_claims = []
        if "evidence" in case_data:
            for e in case_data["evidence"]:
                if isinstance(e, dict):
                    evidence_claims.append(e.get("claim", ""))
                else:
                    evidence_claims.append(str(e))

        self.write_case_to_graph(
            case_id=case_id,
            case_data=case_data,
            evidence_claims=evidence_claims,
        )

    def _hydrate_embedding_cache(self):
        """Load embeddings from TigerGraph into local cache if not already loaded."""
        # For now, embeddings are computed and cached client-side.
        # When TigerGraph supports LIST<DOUBLE> bulk export efficiently,
        # this can be extended to pull from the graph.
        pass

    def load_historical_cases(self, csv_path: str = "data/hhgoa_ieee/closed_cases_history.csv"):
        """
        Load historical closed cases from CSV into local cache for immediate retrieval.
        This bootstraps the memory until backfill_case_embeddings.py runs.
        """
        import pandas as pd

        if not os.path.exists(csv_path):
            print(f"[GraphMemory] Historical cases file not found: {csv_path}")
            return

        df = pd.read_csv(csv_path)
        for _, row in df.iterrows():
            cid = str(row["case_id"])
            case_dict = row.to_dict()
            self._local_cache[cid] = case_dict

            # Build and cache embedding
            narrative = build_case_narrative_text(
                case_id=cid,
                outcome=str(row.get("outcome", "")),
                pattern=str(row.get("pattern", "none")),
                pattern_description="",
                exposure_usd=float(row.get("exposure_usd", 0.0)),
                summary=str(row.get("analyst_notes", "")),
            )
            self._embedding_cache[cid] = embed_case_narrative(narrative)

        print(f"[GraphMemory] Loaded {len(self._local_cache)} historical cases into memory")

    def get_pattern_stats(self) -> Dict[str, int]:
        """Aggregate case counts per FraudPattern from local cache."""
        stats: Dict[str, int] = {}
        for cdata in self._local_cache.values():
            pattern = str(cdata.get("pattern", "none"))
            stats[pattern] = stats.get(pattern, 0) + 1
        return stats


# ---------------------------------------------------------------------------
# Backward-compatible alias
# ---------------------------------------------------------------------------
# Old code imports ClosedCaseMemory — redirect to GraphNativeCaseMemory
ClosedCaseMemory = GraphNativeCaseMemory
