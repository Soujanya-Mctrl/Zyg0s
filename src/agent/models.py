"""
Pydantic v2 Models for the TigerGraph Agentic Fraud Investigation Agent (HHGOA Track).
Defines schemas for Evidence, Next-Best Action (NBA), Bank Fraud Policy,
SAR Narratives, and the official 20-Case Benchmark output format.
"""

from enum import Enum
from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field


class ActionEnum(str, Enum):
    ALLOW_TRANSACTION = "ALLOW_TRANSACTION"
    DECLINE_TRANSACTION = "DECLINE_TRANSACTION"
    MONITOR_CARD = "MONITOR_CARD"
    MONITOR_CONNECTED_CARDS = "MONITOR_CONNECTED_CARDS"
    WARN_CUSTOMER = "WARN_CUSTOMER"
    VERIFY_WITH_CUSTOMER = "VERIFY_WITH_CUSTOMER"
    STEP_UP_AUTH = "STEP_UP_AUTH"
    BLOCK_CARD = "BLOCK_CARD"
    BLOCK_ALL_CARDS = "BLOCK_ALL_CARDS"
    GENERATE_REPORT = "GENERATE_REPORT"
    CREATE_CASE = "CREATE_CASE"
    FILE_REPORT = "FILE_REPORT"
    ESCALATE_TO_ANALYST = "ESCALATE_TO_ANALYST"
    CLOSE_NO_FRAUD = "CLOSE_NO_FRAUD"


class ApprovalRouteEnum(str, Enum):
    AUTO = "auto"
    L1 = "L1"
    L2 = "L2"


class FraudPatternEnum(str, Enum):
    CARD_TESTING = "card_testing"
    CARD_NOT_PRESENT_FRAUD = "card_not_present_fraud"
    CARD_NOT_PRESENT_NEW_DEVICE = "card_not_present_new_device"
    OUT_OF_REGION_USE = "out_of_region_use"
    ACCOUNT_TAKEOVER = "account_takeover"
    UNDOCUMENTED = "undocumented"
    NONE = "none"


class EvidenceGradeEnum(str, Enum):
    DIRECT = "DIRECT"              # w = 1.0 (Confirmed chargeback, blacklist, customer denial)
    CIRCUMSTANTIAL = "CIRCUMSTANTIAL"  # w = 0.6 (Velocity burst, uncharacteristic jump, nocturnal)
    CORRELATIVE = "CORRELATIVE"        # w = 0.3 (Model score, shared domain)
    CONTRADICTORY = "CONTRADICTORY"    # w = -0.8 (Long loyalty, chip-pin pass, customer confirmation)


class EvidenceItem(BaseModel):
    claim: str = Field(description="Summary claim of the finding")
    source: str = Field(default="graph", description="Source of evidence: graph, telemetry, closed_cases, customer_reply")
    ref: str = Field(description="Query or citation reference, e.g. 'query:card_window(card_id=..., hours=2)'")
    entity_ids: List[str] = Field(default_factory=list, description="IDs of affected entities, e.g. txn IDs, device IDs")
    grade: EvidenceGradeEnum = Field(default=EvidenceGradeEnum.CIRCUMSTANTIAL, description="Defensibility grade")
    weight: float = Field(default=0.6, description="Numerical weight in risk/uncertainty scoring")


class ActionRecommendation(BaseModel):
    action: ActionEnum
    route: ApprovalRouteEnum
    reason: str


class NextBestActions(BaseModel):
    initial: List[ActionRecommendation] = Field(description="Actions recommended before secondary evidence / step-up auth")
    final: List[ActionRecommendation] = Field(description="Actions recommended after secondary evidence / step-up auth")
    what_changed: str = Field(description="Narrative explanation of why the recommendation changed")


class EvidenceRequest(BaseModel):
    type: str = Field(description="Type of evidence requested, e.g. 'customer_validation', 'step_up_auth'")
    asked_after_step: int = Field(default=4, description="Lifecycle step when evidence was requested")
    assumed_response: str = Field(description="Simulated or assumed customer/analyst response")


class SARModel(BaseModel):
    file: bool = Field(description="Whether a Suspicious Activity Report must be filed")
    reason: Optional[str] = Field(default=None, description="Policy rule or threshold triggering filing")
    narrative: Optional[str] = Field(default=None, description="BSA/AML FinCEN compliant narrative answering the 5 W's")
    subjects: List[str] = Field(default_factory=list, description="Customer and card IDs subject to report")
    total_amount_usd: float = Field(default=0.0, description="Total aggregated exposure amount in USD")
    activity_dates: List[str] = Field(default_factory=list, description="[start_date, end_date] of suspicious activity")


class CaseRecord(BaseModel):
    status: str = Field(description="'closed_fraud' or 'closed_cleared' or 'open'")
    verdict: str = Field(description="'fraud', 'cleared', or 'uncertain'")
    fraud_probability: float = Field(ge=0.0, le=1.0, description="Assessed probability of fraud")
    pattern: str = Field(description="Detected typology from FraudPatternEnum")
    pattern_description: str = Field(default="", description="Required if pattern is 'undocumented'")
    affected_txn_ids: List[str] = Field(default_factory=list, description="All transactions in this fraud episode")
    first_suspicious_txn_id: str = Field(description="Earliest suspicious transaction ID")
    connected_card_ids: List[str] = Field(default_factory=list, description="Connected cards identified in graph")
    connected_device_profiles: List[str] = Field(default_factory=list, description="Device profiles linked to activity")
    exposure_usd: float = Field(ge=0.0, description="Total dollars at risk")
    evidence: List[EvidenceItem] = Field(default_factory=list, description="Grounded evidence items")
    similar_prior_cases: List[str] = Field(default_factory=list, description="Precedent case IDs retrieved from memory")
    summary: str = Field(description="Executive case summary")
    written_to_graph: bool = Field(default=True, description="Whether case was written back to TigerGraph")
    graph_case_id: Optional[str] = Field(default=None, description="ID assigned in TigerGraph Savanna Cloud")


class BenchmarkCaseOutput(BaseModel):
    """The exact official output format for all 20 HHGOA benchmark cases."""
    case_id: str
    case: CaseRecord
    evidence_requests: List[EvidenceRequest] = Field(default_factory=list)
    next_best_actions: NextBestActions
    sar: SARModel
    stop_reason: str
    tool_calls: int = Field(default=0)
    tokens: int = Field(default=0)
    latency_s: float = Field(default=0.0)
