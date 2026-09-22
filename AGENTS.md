# Agent Operating Rules & Standards (AGENTS.md)

This document establishes the operational rules and standards for AI coding assistants working in the **Agentic-Fraud-Detection** repository.

## 1. Core Principles & Objective
- **Mission**: Build an end-to-end autonomous, explainable fraud investigation agent using TigerGraph Savanna Cloud, MCP, and LangGraph.
- **Accuracy & Explainability**: Fraud decisions directly impact customers and businesses. Every decision must have an immutable audit trail and defensible evidence grades (Direct, Circumstantial, Correlative).
- **No Silent Failures**: Connection issues, query errors, or missing graph schema elements must be surfaced immediately.

## 2. Dedicated Skills Usage
Always consult the specialized workspace skills before performing work in their respective domains:
- [hhgoa-success-criteria](.agents/skills/hhgoa-success-criteria/SKILL.md): Official definition of success, 11 benchmark capabilities, defensibility standards, and what separates winning solutions from ordinary prototypes.
- [hhgoa-judging-criteria](.agents/skills/hhgoa-judging-criteria/SKILL.md): Official TigerGraph HHGOA Hackathon judging criteria, scoring weights (25% Investigation Accuracy, 25% Next Best Action, 15% Agentic Design, 15% Innovation, 10% Explainability, 10% Demo Quality), and evaluation rubrics.
- [hhgoa-submission-deliverables](.agents/skills/hhgoa-submission-deliverables/SKILL.md): Official submission requirements, 20-case answer schemas, technical blog post outline, demo video storyboard, and social post guidelines.
- [hhgoa-ieee-dataset-benchmark](.agents/skills/hhgoa-ieee-dataset-benchmark/SKILL.md): IEEE-CIS / Vesta dataset specifications, lack of binary fraud flags, 4-month closed case memory, 20-case evaluation benchmark, novel pattern discovery, and answer schema.
- [fraud-investigation-tech-stack](.agents/skills/fraud-investigation-tech-stack/SKILL.md): Technical architecture, required TigerGraph components (Savanna Cloud, GSQL, MCP, GraphRAG, UI), optional agent frameworks, and LLM reasoning boundaries.
- [core-investigation-flow](.agents/skills/core-investigation-flow/SKILL.md): The 8-step investigative lifecycle (Trigger -> Investigate -> Gather -> Assess Uncertainty -> Gather More -> Actions -> Explain -> Memory) and mock API execution harness.
- [fraud-agent-core-guidelines](.agents/skills/fraud-agent-core-guidelines/SKILL.md): Core design guidelines, uncertainty assessment, controlled actions, 2-stage NBA logging, and mock API interfaces.
- [tigergraph-fraud-investigation-hhgoa](.agents/skills/tigergraph-fraud-investigation-hhgoa/SKILL.md): Official TigerGraph HHGOA Hackathon track rules, IEEE-CIS dataset specs, 20-case benchmark output schema, 2-stage NBA logging, SAR requirements, and judging criteria.
- [tigergraph-fraud-graph](.agents/skills/tigergraph-fraud-graph/SKILL.md): For schema updates, GSQL queries, TigerGraph REST++/pyTigerGraph calls.
- [fraud-investigation-agent](.agents/skills/fraud-investigation-agent/SKILL.md): For LangGraph state machine, evidence grading, uncertainty quantification, HITL logic.
- [fraud-memory-graphrag](.agents/skills/fraud-memory-graphrag/SKILL.md): For episodic/semantic/procedural memory systems and GraphRAG context injection.
- [hhgoa-hybrid-agent](.agents/skills/hhgoa-hybrid-agent/SKILL.md): Operational standards for the hybrid neuro-symbolic agent fusing deterministic TigerGraph GSQL algorithms & policy rules R1-R10 with LLM cognitive reasoning.








## 3. Mandatory Progress Tracking
- All milestones, architectural decisions, completed tasks, and upcoming work **must be logged** in [TRACKING.md](TRACKING.md).
- Whenever an implementation step is started or completed, update [TRACKING.md](TRACKING.md) to keep the project record strictly current.

## 4. Code & Architecture Standards
- **Structure**: Place backend application source code under `src/` (e.g., `src/agent/pipeline/` for the 7 specialized neuro-symbolic agents, `src/graph/`, `src/memory/`, `src/benchmarks/`, `src/api/`). Place CLI tools and server entry points at the repository root (`tg_cli.py`, `src/mcp_server.py`).
- **Typing & Validation**: Use Pydantic v2 and Python type annotations for all data models, agent step results, and state transitions.
- **Testing**: Write unit and integration tests under `tests/` using `pytest`.
- **Secrets & Env**: Never hardcode credentials. Always read from `.env` via `python-dotenv`.
