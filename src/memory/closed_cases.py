"""
Closed Case Memory Store for TigerGraph Fraud Investigation Agent.
Loads and indexes the 5,565 4-month historical closed cases from closed_cases_history.csv,
supports fast semantic and attribute retrieval, and accepts new closed cases at runtime.
"""

import os
import pandas as pd
from typing import List, Dict, Any, Optional


class ClosedCaseMemory:
    """
    Episodic and Semantic Memory store indexing 4 months of closed investigations.
    """

    _instance: Optional["ClosedCaseMemory"] = None

    def __init__(self, csv_path: str = "data/hhgoa_ieee/closed_cases_history.csv"):
        self.csv_path = csv_path
        self.cases_df: pd.DataFrame = pd.DataFrame()
        self.case_lookup: Dict[str, Dict[str, Any]] = {}
        self.customer_index: Dict[str, List[str]] = {}
        self.card_index: Dict[str, List[str]] = {}
        self.pattern_index: Dict[str, List[str]] = {}
        self._load_data()

    @classmethod
    def get_instance(cls) -> "ClosedCaseMemory":
        if cls._instance is None:
            cls._instance = ClosedCaseMemory()
        return cls._instance

    def _load_data(self):
        if not os.path.exists(self.csv_path):
            print(f"Warning: {self.csv_path} not found. Initializing empty memory.")
            return

        df = pd.read_csv(self.csv_path)
        self.cases_df = df
        for _, row in df.iterrows():
            cid = str(row["case_id"])
            cust = str(row.get("customer_id", ""))
            card = str(row.get("card_id", ""))
            pat = str(row.get("pattern", "none"))

            case_dict = row.to_dict()
            self.case_lookup[cid] = case_dict

            if cust:
                self.customer_index.setdefault(cust, []).append(cid)
            if card:
                self.card_index.setdefault(card, []).append(cid)
            if pat:
                self.pattern_index.setdefault(pat, []).append(cid)

    def find_similar_cases(
        self,
        customer_id: Optional[str] = None,
        card_id: Optional[str] = None,
        pattern: Optional[str] = None,
        query_text: Optional[str] = None,
        top_k: int = 3
    ) -> List[str]:
        """
        Retrieve case_ids of relevant prior investigations.
        Priority:
        1. Historical cases on same card_id or customer_id
        2. Cases sharing the exact same pattern
        3. Lexical matching on analyst_notes
        """
        results: List[str] = []

        if card_id and card_id in self.card_index:
            for cid in self.card_index[card_id]:
                if cid not in results:
                    results.append(cid)

        if len(results) < top_k and customer_id and customer_id in self.customer_index:
            for cid in self.customer_index[customer_id]:
                if cid not in results:
                    results.append(cid)

        if len(results) < top_k and pattern and pattern in self.pattern_index:
            for cid in self.pattern_index[pattern][:top_k]:
                if cid not in results:
                    results.append(cid)

        # Fallback keyword match if still empty
        if not results and query_text and not self.cases_df.empty:
            matches = self.cases_df[self.cases_df["analyst_notes"].str.contains(query_text, case=False, na=False)]
            results.extend(matches["case_id"].head(top_k).tolist())

        return results[:top_k]

    def add_closed_case(self, case_id: str, case_data: Dict[str, Any]):
        """
        Persist a newly completed investigation into local memory at runtime.
        """
        self.case_lookup[case_id] = case_data
        cust = str(case_data.get("customer_id", ""))
        card = str(case_data.get("card_id", ""))
        pat = str(case_data.get("pattern", "none"))

        if cust:
            self.customer_index.setdefault(cust, []).append(case_id)
        if card:
            self.card_index.setdefault(card, []).append(case_id)
        if pat:
            self.pattern_index.setdefault(pat, []).append(case_id)
