"""
Validation test checking all 20 benchmark case answer files against the official schema.
"""

import os
import json
import pytest
from src.agent.models import BenchmarkCaseOutput


def test_all_20_benchmark_cases_exist_and_validate():
    cases_dir = "cases"
    assert os.path.exists(cases_dir), "Cases directory does not exist."

    expected_ids = [f"HHG-{i:03d}" for i in range(1, 21)]
    for case_id in expected_ids:
        case_file = os.path.join(cases_dir, f"{case_id}.json")
        assert os.path.exists(case_file), f"Case file {case_file} is missing."

        with open(case_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Validate with strict Pydantic model
        validated = BenchmarkCaseOutput.model_validate(data)
        assert validated.case_id == case_id
        assert validated.case.status in ("closed_fraud", "closed_legitimate", "closed_cleared", "open", "escalated")
        assert validated.case.verdict in ("fraud", "legitimate", "cleared", "uncertain")
        assert len(validated.next_best_actions.initial) > 0
        assert len(validated.next_best_actions.final) > 0
        assert len(validated.next_best_actions.what_changed) > 0
