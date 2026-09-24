"""
Mock Action Simulation Harness for TigerGraph Fraud Investigation Agent.
Simulates banking actions, cardholder communications, step-up challenges,
and regulatory filings.
"""

import time
from typing import Dict, Any, Optional, List


class MockActionService:
    """
    Mock API service simulating core banking, customer communication,
    CRM, and regulatory interfaces.
    """

    @staticmethod
    def send_customer_validation(
        customer_id: str,
        card_id: str,
        txn_ids: List[str],
        amounts_usd: List[float],
        expected_scenario: str = "customer_denies"
    ) -> Dict[str, Any]:
        """
        Simulate customer validation message (SMS / in-app push).
        expected_scenario:
            - 'customer_denies': Customer states they did not authorize the transactions.
            - 'customer_confirms': Customer confirms the transactions are genuine.
            - 'no_reply': Non-responsive after 24h.
        """
        total_amt = sum(amounts_usd) if amounts_usd else 0.0
        
        if expected_scenario == "customer_confirms":
            response = "Customer confirms they made the transaction(s) and activity is authorized."
            verdict_signal = "CONFIRMED_LEGITIMATE"
        elif expected_scenario == "no_reply":
            response = "No response from cardholder after 24 hours across SMS and email channels."
            verdict_signal = "NO_RESPONSE"
        else:
            response = "Customer states they did not make these purchases and still has the physical card."
            verdict_signal = "CONFIRMED_FRAUD"

        return {
            "status": "COMPLETED",
            "channel": "SMS_AND_IN_APP_PUSH",
            "customer_id": customer_id,
            "card_id": card_id,
            "txn_ids": txn_ids,
            "total_amount_usd": total_amt,
            "assumed_response": response,
            "verdict_signal": verdict_signal,
            "timestamp": time.time()
        }

    @staticmethod
    def trigger_step_up_auth(
        user_id: str,
        challenge_type: str = "BIOMETRIC_PUSH",
        expected_outcome: str = "FAILED"
    ) -> Dict[str, Any]:
        """
        Simulate step-up 2FA biometric or OTP challenge.
        expected_outcome: 'PASSED', 'FAILED', 'TIMEOUT'.
        """
        return {
            "status": "CHALLENGE_RESOLVED",
            "user_id": user_id,
            "challenge_type": challenge_type,
            "outcome": expected_outcome,
            "timestamp": time.time()
        }

    @staticmethod
    def block_card(card_id: str, reason: str, route: str = "L1") -> Dict[str, Any]:
        """Simulate payment card block and reissue request."""
        return {
            "action": "BLOCK_CARD",
            "card_id": card_id,
            "status": "BLOCKED",
            "approval_route": route,
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def block_all_cards(customer_id: str, reason: str) -> Dict[str, Any]:
        """Simulate blocking all cards for a compromised customer profile."""
        return {
            "action": "BLOCK_ALL_CARDS",
            "customer_id": customer_id,
            "status": "ALL_CARDS_BLOCKED",
            "approval_route": "L2",
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def file_sar(sar_payload: Dict[str, Any]) -> Dict[str, Any]:
        """Simulate regulatory Suspicious Activity Report (SAR) filing with FinCEN."""
        return {
            "action": "FILE_REPORT",
            "reference_id": f"SAR_FINCEN_{int(time.time())}",
            "status": "SUBMITTED",
            "approval_route": "L2",
            "subjects": sar_payload.get("subjects", []),
            "total_amount_usd": sar_payload.get("total_amount_usd", 0.0),
            "timestamp": time.time()
        }

    @staticmethod
    def allow_transaction(txn_id: str, reason: str) -> Dict[str, Any]:
        """Simulate allowing/authorizing a payment transaction."""
        return {
            "action": "ALLOW_TRANSACTION",
            "txn_id": str(txn_id),
            "status": "AUTHORIZED",
            "approval_route": "auto",
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def decline_transaction(txn_id: str, reason: str, route: str = "L1") -> Dict[str, Any]:
        """Simulate declining/holding an in-flight suspicious authorization."""
        return {
            "action": "DECLINE_TRANSACTION",
            "txn_id": str(txn_id),
            "status": "DECLINED",
            "approval_route": route,
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def monitor_card(card_id: str, duration_hours: int = 72, reason: str = "Heightened monitoring") -> Dict[str, Any]:
        """Simulate placing a card under active surveillance rule."""
        return {
            "action": "MONITOR_CARD",
            "card_id": card_id,
            "status": "ACTIVE_MONITORING",
            "duration_hours": duration_hours,
            "approval_route": "auto",
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def monitor_connected_cards(card_ids: List[str], duration_hours: int = 72, reason: str = "Shared syndicate origin") -> Dict[str, Any]:
        """Simulate placing multiple connected cards under active surveillance."""
        return {
            "action": "MONITOR_CONNECTED_CARDS",
            "card_ids": card_ids,
            "cards_count": len(card_ids),
            "status": "CONNECTED_CLUSTER_MONITORING",
            "duration_hours": duration_hours,
            "approval_route": "auto",
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def warn_customer(customer_id: str, reason: str) -> Dict[str, Any]:
        """Simulate sending an advisory warning or recurring subscription reminder."""
        return {
            "action": "WARN_CUSTOMER",
            "customer_id": customer_id,
            "channel": "EMAIL_AND_NOTIFICATION",
            "status": "ADVISORY_DELIVERED",
            "approval_route": "auto",
            "message": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def create_case(case_id: str, pattern: str, exposure_usd: float = 0.0) -> Dict[str, Any]:
        """Simulate opening a persistent internal fraud investigation case."""
        return {
            "action": "CREATE_CASE",
            "case_id": case_id,
            "pattern": pattern,
            "exposure_usd": exposure_usd,
            "status": "CASE_OPENED",
            "approval_route": "auto",
            "timestamp": time.time()
        }

    @staticmethod
    def escalate_to_analyst(case_id: str, reason: str, route: str = "auto") -> Dict[str, Any]:
        """Simulate routing an ambiguous case to human fraud investigator."""
        return {
            "action": "ESCALATE_TO_ANALYST",
            "case_id": case_id,
            "queue": "L2_COMPLEX_INVESTIGATIONS" if route == "L2" else "L1_ANALYST_QUEUE",
            "status": "ESCALATED_HITL",
            "approval_route": route,
            "reason": reason,
            "timestamp": time.time()
        }

    @staticmethod
    def request_evidence(case_id: str, request_type: str, details: str) -> Dict[str, Any]:
        """Simulate requesting additional evidence from customer or external service."""
        return {
            "action": "REQUEST_MORE_EVIDENCE",
            "case_id": case_id,
            "request_type": request_type,
            "status": "PENDING_RESPONSE",
            "approval_route": "auto",
            "details": details,
            "timestamp": time.time()
        }

    @classmethod
    def execute_action(cls, action_name: str, **kwargs) -> Dict[str, Any]:
        """Unified action dispatcher."""
        act = action_name.upper()
        if act == "ALLOW_TRANSACTION":
            return cls.allow_transaction(kwargs.get("txn_id", "N/A"), kwargs.get("reason", "Legitimate"))
        elif act == "DECLINE_TRANSACTION":
            return cls.decline_transaction(kwargs.get("txn_id", "N/A"), kwargs.get("reason", "Suspicious"), kwargs.get("route", "L1"))
        elif act == "BLOCK_CARD":
            return cls.block_card(kwargs.get("card_id", "N/A"), kwargs.get("reason", "Fraud detected"), kwargs.get("route", "L1"))
        elif act == "BLOCK_ALL_CARDS":
            return cls.block_all_cards(kwargs.get("customer_id", "N/A"), kwargs.get("reason", "Multiple cards compromised"))
        elif act == "MONITOR_CARD":
            return cls.monitor_card(kwargs.get("card_id", "N/A"), kwargs.get("duration_hours", 72), kwargs.get("reason", "Heightened monitoring"))
        elif act == "MONITOR_CONNECTED_CARDS":
            return cls.monitor_connected_cards(kwargs.get("card_ids", []), kwargs.get("duration_hours", 72), kwargs.get("reason", "Syndicate cluster"))
        elif act == "WARN_CUSTOMER":
            return cls.warn_customer(kwargs.get("customer_id", "N/A"), kwargs.get("reason", "Informational reminder"))
        elif act == "CREATE_CASE":
            return cls.create_case(kwargs.get("case_id", "N/A"), kwargs.get("pattern", "none"), kwargs.get("exposure_usd", 0.0))
        elif act == "FILE_REPORT":
            return cls.file_sar(kwargs.get("sar_payload", {}))
        elif act == "ESCALATE_TO_ANALYST":
            return cls.escalate_to_analyst(kwargs.get("case_id", "N/A"), kwargs.get("reason", "Uncertainty / high exposure"), kwargs.get("route", "auto"))
        elif act == "REQUEST_MORE_EVIDENCE":
            return cls.request_evidence(
                kwargs.get("case_id", "N/A"),
                kwargs.get("request_type", "TELEMETRY"),
                kwargs.get("details", "")
            )
        elif act == "VERIFY_WITH_CUSTOMER":
            return cls.send_customer_validation(
                kwargs.get("customer_id", "N/A"),
                kwargs.get("card_id", "N/A"),
                kwargs.get("txn_ids", []),
                kwargs.get("amounts_usd", []),
                kwargs.get("scenario", "customer_denies")
            )
        elif act == "STEP_UP_AUTH":
            return cls.trigger_step_up_auth(
                kwargs.get("user_id", "N/A"),
                kwargs.get("challenge_type", "BIOMETRIC_PUSH"),
                kwargs.get("outcome", "PASSED")
            )
        else:
            return {"action": act, "status": "EXECUTED", "params": kwargs, "timestamp": time.time()}

    @classmethod
    def execute_authorized_action(
        cls,
        action: str,
        route: str = "auto",
        caller_role: str = "agent",
        approval_token: Optional[str] = None,
        **kwargs
    ) -> Dict[str, Any]:
        """
        Policy and permission-enforced execution gate.

        Enforces:
        1. Agent Recommendation: The agent can recommend any action based on evidence.
        2. Permission Verification: Only authorized actions may be executed. Actions requiring
           human approval ('L1' or 'L2') cannot be executed by an autonomous agent directly.
        3. Approval Gating:
           - route == 'auto': Agent may execute autonomously.
           - route == 'L1': Requires caller_role in ('L1_analyst', 'L2_fraud_manager') or valid L1 approval token.
           - route == 'L2': Strictly requires caller_role == 'L2_fraud_manager' or valid L2 approval token.
        """
        act = action.upper()
        req_route = route.lower() if isinstance(route, str) else getattr(route, "value", str(route)).lower()

        # Check permission
        if req_route == "auto":
            # Pre-authorized for autonomous agent execution
            res = cls.execute_action(act, **kwargs)
            res["permission_status"] = "AUTHORIZED_AUTONOMOUS"
            res["caller_role"] = caller_role
            return res

        elif req_route == "l1":
            # Requires Level 1 Senior Analyst or Level 2 Fraud Manager
            if caller_role in ("L1_analyst", "L2_fraud_manager") or (approval_token and approval_token.startswith("AUTH_L1")):
                res = cls.execute_action(act, **kwargs)
                res["permission_status"] = "AUTHORIZED_WITH_HUMAN_APPROVAL"
                res["approved_by"] = caller_role
                res["approval_tier"] = "L1"
                return res
            else:
                return {
                    "action": act,
                    "status": "BLOCKED_PENDING_APPROVAL",
                    "permission_status": "DENIED_REQUIRES_HUMAN_APPROVAL",
                    "required_approval_route": "L1",
                    "attempted_by": caller_role,
                    "reason": f"Action '{act}' requires Level 1 human analyst approval. Autonomous agent is not permitted to execute directly.",
                    "timestamp": time.time()
                }

        elif req_route == "l2":
            # Strictly requires Level 2 Fraud Manager
            if caller_role == "L2_fraud_manager" or (approval_token and approval_token.startswith("AUTH_L2")):
                res = cls.execute_action(act, **kwargs)
                res["permission_status"] = "AUTHORIZED_WITH_HUMAN_APPROVAL"
                res["approved_by"] = caller_role
                res["approval_tier"] = "L2"
                return res
            else:
                return {
                    "action": act,
                    "status": "BLOCKED_PENDING_APPROVAL",
                    "permission_status": "DENIED_REQUIRES_HUMAN_APPROVAL",
                    "required_approval_route": "L2",
                    "attempted_by": caller_role,
                    "reason": f"High-impact action '{act}' strictly requires Level 2 Fraud Manager approval. Autonomous execution rejected.",
                    "timestamp": time.time()
                }

        else:
            return {"action": act, "status": "UNKNOWN_ROUTE", "timestamp": time.time()}


