"""
Bank Fraud Policy v1.0 Engine for TigerGraph HHGOA Hackathon.
Implements policy rules R1 - R10, approval routing ('auto', 'L1', 'L2'),
and next-best action generation.
"""

from typing import List, Dict, Any, Optional
from src.agent.models import ActionEnum, ApprovalRouteEnum, ActionRecommendation, NextBestActions


class BankFraudPolicyEngine:
    """
    Evaluates investigation state against Bank Fraud Policy v1.0.
    Produces compliant initial and final action recommendations.
    """

    @staticmethod
    def get_approval_route(action: ActionEnum, exposure_usd: float = 0.0) -> ApprovalRouteEnum:
        """
        Determine the mandatory approval route based on action type and exposure threshold.
        - auto: Agent executes directly.
        - L1: Team lead approval required (DECLINE_TRANSACTION; BLOCK_CARD <= $2,500).
        - L2: Fraud manager approval required (BLOCK_CARD > $2,500; BLOCK_ALL_CARDS; FILE_REPORT).
        """
        if action == ActionEnum.DECLINE_TRANSACTION:
            return ApprovalRouteEnum.L1
        
        if action == ActionEnum.BLOCK_CARD:
            if exposure_usd > 2500.0:
                return ApprovalRouteEnum.L2
            return ApprovalRouteEnum.L1
        
        if action in (ActionEnum.BLOCK_ALL_CARDS, ActionEnum.FILE_REPORT):
            return ApprovalRouteEnum.L2
        
        # All other actions are 'auto'
        return ApprovalRouteEnum.AUTO

    @classmethod
    def evaluate_initial_nba(
        cls,
        trigger_type: str,
        initial_risk_score: float,
        pattern: str,
        exposure_usd: float,
        evidence_claims: List[str],
        has_shared_origin: bool = False,
        is_card_testing: bool = False,
        is_recurring_dispute: bool = False
    ) -> List[ActionRecommendation]:
        """
        Generate initial Next-Best Actions (NBA_BEFORE_ADDITIONAL_EVIDENCE)
        based on initial trigger, noisy signals, and uncertainty.
        """
        actions: List[ActionRecommendation] = []

        # R7: Disputed but matches recurring pattern
        if is_recurring_dispute:
            actions.append(ActionRecommendation(
                action=ActionEnum.CREATE_CASE,
                route=cls.get_approval_route(ActionEnum.CREATE_CASE, exposure_usd),
                reason="R7: transaction matches recurring pattern; create case for record"
            ))
            actions.append(ActionRecommendation(
                action=ActionEnum.VERIFY_WITH_CUSTOMER,
                route=cls.get_approval_route(ActionEnum.VERIFY_WITH_CUSTOMER, exposure_usd),
                reason="R7: verify recurring charge with customer"
            ))
            actions.append(ActionRecommendation(
                action=ActionEnum.WARN_CUSTOMER,
                route=cls.get_approval_route(ActionEnum.WARN_CUSTOMER, exposure_usd),
                reason="R7: send informational reminder regarding subscription billing"
            ))
            return actions

        # R5: Card testing sequence observed
        if is_card_testing:
            actions.append(ActionRecommendation(
                action=ActionEnum.DECLINE_TRANSACTION,
                route=cls.get_approval_route(ActionEnum.DECLINE_TRANSACTION, exposure_usd),
                reason="R5: testing sequence observed"
            ))
            actions.append(ActionRecommendation(
                action=ActionEnum.VERIFY_WITH_CUSTOMER,
                route=cls.get_approval_route(ActionEnum.VERIFY_WITH_CUSTOMER, exposure_usd),
                reason="R1: verify before blocking"
            ))
            return actions

        # Customer report trigger: customer already disputed the charge
        if trigger_type == "customer_report":
            # If customer disputed, we start with verification/hold
            actions.append(ActionRecommendation(
                action=ActionEnum.DECLINE_TRANSACTION,
                route=cls.get_approval_route(ActionEnum.DECLINE_TRANSACTION, exposure_usd),
                reason="Customer report initiated; hold pending transactions"
            ))
            actions.append(ActionRecommendation(
                action=ActionEnum.VERIFY_WITH_CUSTOMER,
                route=cls.get_approval_route(ActionEnum.VERIFY_WITH_CUSTOMER, exposure_usd),
                reason="R1: verify card possession and transaction details with customer"
            ))
            return actions

        # R1: Single signal & risk score / probability < 0.70 -> Verify before block
        if initial_risk_score < 0.70:
            actions.append(ActionRecommendation(
                action=ActionEnum.VERIFY_WITH_CUSTOMER,
                route=cls.get_approval_route(ActionEnum.VERIFY_WITH_CUSTOMER, exposure_usd),
                reason="R1: weak or single signal; verify with customer before any destructive block"
            ))
            actions.append(ActionRecommendation(
                action=ActionEnum.MONITOR_CARD,
                route=cls.get_approval_route(ActionEnum.MONITOR_CARD, exposure_usd),
                reason="R1: place card on 72-hour heightened monitoring pending response"
            ))
            return actions

        # High initial risk score >= 0.70
        actions.append(ActionRecommendation(
            action=ActionEnum.DECLINE_TRANSACTION,
            route=cls.get_approval_route(ActionEnum.DECLINE_TRANSACTION, exposure_usd),
            reason="High model risk score (>= 0.70); decline pending authorization"
        ))
        actions.append(ActionRecommendation(
            action=ActionEnum.STEP_UP_AUTH,
            route=cls.get_approval_route(ActionEnum.STEP_UP_AUTH, exposure_usd),
            reason="R1: require step-up authentication before blocking card"
        ))
        if has_shared_origin:
            actions.append(ActionRecommendation(
                action=ActionEnum.MONITOR_CONNECTED_CARDS,
                route=cls.get_approval_route(ActionEnum.MONITOR_CONNECTED_CARDS, exposure_usd),
                reason="R6: shared origin detected across cards; raise monitoring sensitivity"
            ))

        return actions

    @classmethod
    def evaluate_final_nba(
        cls,
        verdict: str,
        fraud_probability: float,
        pattern: str,
        exposure_usd: float,
        customer_response: Optional[str],
        has_shared_origin: bool = False,
        is_card_testing: bool = False,
        is_recurring_dispute: bool = False,
        compromised_cards_count: int = 1,
        is_undocumented: bool = False
    ) -> List[ActionRecommendation]:
        """
        Generate final Next-Best Actions (NBA_AFTER_ADDITIONAL_EVIDENCE)
        after secondary evidence or customer response is received.
        """
        actions: List[ActionRecommendation] = []

        # R3: Customer confirmed the transaction -> Legitimate
        if customer_response and "confirm" in customer_response.lower():
            actions.append(ActionRecommendation(
                action=ActionEnum.CLOSE_NO_FRAUD,
                route=ApprovalRouteEnum.AUTO,
                reason="R3: customer confirmed transaction as authorized; close alert as legitimate"
            ))
            return actions

        if verdict == "cleared" or fraud_probability < 0.25:
            actions.append(ActionRecommendation(
                action=ActionEnum.CLOSE_NO_FRAUD,
                route=ApprovalRouteEnum.AUTO,
                reason="R3: investigation cleared transaction; no fraud detected"
            ))
            return actions

        # R7: Disputed but recurring
        if is_recurring_dispute:
            actions.append(ActionRecommendation(
                action=ActionEnum.CREATE_CASE,
                route=ApprovalRouteEnum.AUTO,
                reason="R7: recurring charge confirmed legitimate; record in case file"
            ))
            actions.append(ActionRecommendation(
                action=ActionEnum.WARN_CUSTOMER,
                route=ApprovalRouteEnum.AUTO,
                reason="R7: inform customer of merchant subscription cancellation process"
            ))
            return actions

        # R8: Uncertain and high exposure
        if verdict == "uncertain":
            if exposure_usd > 500.0:
                actions.append(ActionRecommendation(
                    action=ActionEnum.ESCALATE_TO_ANALYST,
                    route=ApprovalRouteEnum.AUTO,
                    reason="R8: verdict uncertain and exposure > $500; escalate to human analyst"
                ))
            actions.append(ActionRecommendation(
                action=ActionEnum.MONITOR_CARD,
                route=ApprovalRouteEnum.AUTO,
                reason="R4: maintain 72-hour card monitoring"
            ))
            return actions

        # R9: Undocumented pattern
        if is_undocumented or pattern == "undocumented":
            actions.append(ActionRecommendation(
                action=ActionEnum.CREATE_CASE,
                route=ApprovalRouteEnum.AUTO,
                reason="R9: coordinated or novel pattern detected; open fraud case"
            ))
            actions.append(ActionRecommendation(
                action=ActionEnum.FILE_REPORT,
                route=ApprovalRouteEnum.L2,
                reason="R9: file SAR for undocumented organized abuse"
            ))
            actions.append(ActionRecommendation(
                action=ActionEnum.ESCALATE_TO_ANALYST,
                route=ApprovalRouteEnum.AUTO,
                reason="R9: escalate novel typology to senior fraud analyst"
            ))
            if has_shared_origin:
                actions.append(ActionRecommendation(
                    action=ActionEnum.MONITOR_CONNECTED_CARDS,
                    route=ApprovalRouteEnum.AUTO,
                    reason="R6: monitor connected cards sharing network cluster"
                ))
            return actions

        # Confirmed Fraud (R2, R5, R6, R10)
        # R10: Block all cards check
        if compromised_cards_count >= 2:
            actions.append(ActionRecommendation(
                action=ActionEnum.BLOCK_ALL_CARDS,
                route=ApprovalRouteEnum.L2,
                reason="R10: multiple customer cards confirmed compromised; block all customer cards"
            ))
        else:
            block_route = cls.get_approval_route(ActionEnum.BLOCK_CARD, exposure_usd)
            if is_card_testing:
                actions.append(ActionRecommendation(
                    action=ActionEnum.BLOCK_CARD,
                    route=block_route,
                    reason=f"R2 and R5: customer denied purchase; card testing verified; exposure {'<=' if exposure_usd <= 2500 else '>'} $2,500"
                ))
            else:
                actions.append(ActionRecommendation(
                    action=ActionEnum.BLOCK_CARD,
                    route=block_route,
                    reason=f"R2: customer denied unauthorized use; block card (exposure {'<=' if exposure_usd <= 2500 else '>'} $2,500)"
                ))

        # Always CREATE_CASE on confirmed fraud
        actions.append(ActionRecommendation(
            action=ActionEnum.CREATE_CASE,
            route=ApprovalRouteEnum.AUTO,
            reason="R2: create internal fraud case with evidence attached and persist to graph"
        ))

        # R2 & R6: File SAR report if exposure > $1,000 or shared origin / ring
        if exposure_usd > 1000.0 or has_shared_origin:
            sar_reason = "R2 and R6: shared device/network links to other cards" if has_shared_origin else "R2: confirmed unauthorized fraud with exposure > $1,000"
            actions.append(ActionRecommendation(
                action=ActionEnum.FILE_REPORT,
                route=ApprovalRouteEnum.L2,
                reason=sar_reason
            ))

        # R6: Monitor connected cards
        if has_shared_origin:
            actions.append(ActionRecommendation(
                action=ActionEnum.MONITOR_CONNECTED_CARDS,
                route=ApprovalRouteEnum.AUTO,
                reason="R6: shared device profile / entity links across multiple cards"
            ))

        return actions
