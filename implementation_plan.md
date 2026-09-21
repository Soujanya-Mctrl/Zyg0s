# Agentic Fraud Detection Project Plan

## Context
This plan outlines the implementation of an Agentic Fraud Investigation Agent for the TigerGraph hackathon challenge. The agent will investigate fraud cases, create and progress cases, recommend next best actions, and learn from past investigations using TigerGraph as the core knowledge graph, MCP for tool integration, and agent frameworks for orchestration.

## Recommended Approach

### Architecture Overview
The system will use a hybrid architecture combining:
- **TigerGraph** as the primary knowledge graph for storing transactions, entities, and relationships
- **Model Context Protocol (MCP)** to expose TigerGraph capabilities to LLMs
- **LangGraph** as the agent framework for state-based investigation orchestration
- **GraphRAG** techniques to enhance LLM reasoning with graph context
- **Memory systems** to store and learn from past investigations
- **Vector embeddings** for semantic similarity search

## Core Components

### 1. Knowledge Graph Layer (TigerGraph)
- **Schema**: Financial transaction model with Cardholder, Credit_Card, Payment_Transaction, Merchant, Location vertices
- **Key Features**:
  - Real-time transaction ingestion
  - Graph algorithms (PageRank, Community Detection, Path Finding)
  - Vector storage for embeddings
  - GSQL queries for fraud scoring and investigation

### 2. MCP Integration Layer
- **TigerGraph MCP Server** exposing 69+ tools including:
  - Query execution (`tigergraph__run_query`, `tigergraph__generate_gsql`)
  - Graph traversal (`tigergraph__get_neighbors`, `tigergraph__get_vertex_count`)
  - Vector operations (`tigergraph__search_top_k_similarity`)
  - Schema introspection
- **Security**: OAuth 2.1, input validation, audit logging for financial compliance

### 3. Agent Orchestration Layer (LangGraph)
- **State Machine Model** with investigative phases:
  1. Alert Intake & Triage
  2. Evidence Gathering Loop
  3. Analysis & Hypothesis Testing
  4. Decision Engine
  5. Report Generation
- **Human-in-the-Loop** for uncertain cases (risk scores 50-79)
- **Tool Integration** for accessing graph data, external APIs, and simulations

### 4. Cognitive Layer
- **LLM Reasoning** with uncertainty quantification
- **Evidence Grading** system (direct, circumstantial, correlative)
- **Hypothesis Generation** based on fraud patterns
- **Explanation Generation** for audit trails

### 5. Memory & Learning Layer
- **Episodic Memory**: Complete investigation trajectories stored in TigerGraph
- **Semantic Memory**: Organized fraud patterns and typologies
- **Procedural Memory**: Investigative procedures and heuristics
- **Learning Mechanisms**: Retrospective analysis, feedback loops, pattern extraction

### 6. Tool & Data Access Layer
- **Graph Database Interface**: TigerGraph MCP tools for graph operations
- **External API Connectors**: Financial data, sanctions lists, device intelligence
- **Simulation Environments**: What-if analysis, fraud scenario generators

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
1. Set up TigerGraph Community Edition with Transaction Fraud solution kit
2. Deploy TigerGraph MCP server with stdio and HTTP transports
3. Implement basic GSQL queries for fraud scoring and investigation
4. Create initial schema for financial transactions

### Phase 2: Agent Core (Weeks 3-4)
1. Implement LangGraph-based agent with state machine for investigation flow
2. Integrate MCP client to interact with TigerGraph MCP server
3. Develop evidence gathering tools using graph traversals and vector search
4. Implement basic hypothesis generation and scoring mechanisms

### Phase 3: Advanced Features (Weeks 5-6)
1. Add GraphRAG capabilities for enhanced LLM reasoning
2. Implement memory system for storing and retrieving past cases
3. Add uncertainty handling and evidence grading
4. Integrate external API connectors for financial data and device intelligence

### Phase 4: Learning & Optimization (Weeks 7-8)
1. Implement feedback loop from investigator outcomes
2. Add pattern extraction for novel fraud detection
3. Optimize performance with caching and approximate queries
4. Create investigator workbench UI for case visualization

### Phase 5: Evaluation & Refinement (Weeks 9-10)
1. Implement comprehensive evaluation framework
2. Conduct backtesting with historical data
3. Refine based on investigation quality metrics
4. Prepare demo flows and documentation

## Critical Files to Modify/Create

### Infrastructure & Setup
- `docker-compose.yml` - TigerGraph and MCP server deployment
- `setup_tigergraph.sh` - Schema creation and data loading scripts
- `.env` - Configuration for TigerGraph connection and MCP server

### MCP Integration
- `mcp_server/` - TigerGraph MCP server configuration and custom tools
- `mcp_client.py` - Secure MCP client for agent interaction
- `tools/` - Custom MCP tools for fraud-specific operations

### Agent Implementation
- `agent/` - LangGraph-based fraud investigation agent
  - `states.py` - Investigation state definitions
  - `workflow.py` - LangGraph state machine implementation
  - `tools.py` - Agent tools for graph access and external APIs
  - `memory.py` - Memory system for case storage and retrieval
  - `reasoning.py` - LLM reasoning with uncertainty handling

### GraphRAG & Embeddings
- `embeddings/` - Vector embedding generation and storage
- `graphrag.py` - GraphRAG implementation for enhanced context
- `vector_queries.py` - Hybrid graph-vector search functions

### Investigation Utilities
- `queries/` - GSQL queries for fraud detection and investigation
- `algorithms.py` - Custom graph algorithms for fraud patterns
- `scoring.py` - Fraud scoring mechanisms (rule-based + ML + graph)

### UI & Demo
- `ui/` - Investigator dashboard (React Command Center)
- `demo/` - Demo scripts and case presentation flows
- `docs/` - Architecture documentation and user guides

## Verification Plan

### 1. Unit Testing
- Test individual GSQL queries for correctness
- Validate MCP tool responses and error handling
- Check agent state transitions and decision logic

### 2. Integration Testing
- Verify end-to-end investigation flow from alert to case closure
- Test memory storage and retrieval of past cases
- Validate GraphRAG context enhancement

### 3. Performance Testing
- Measure latency for real-time transaction scoring
- Test graph algorithm execution times
- Validate concurrent investigation handling

### 4. Evaluation Metrics
- **Detection Performance**: Precision, recall, F1-score on benchmark cases
- **Investigation Quality**: Evidence completeness, logical consistency
- **Operational Metrics**: Investigation throughput, cost per case
- **Explainability**: Audit trail quality, reasoning clarity
- **Learning Improvement**: Performance improvement over time with memory

### 5. Demo Validation
- End-to-end demonstration on 20 benchmark cases
- Case progression visualization
- Next-best action recommendation accuracy
- User interface usability testing

## Technology Stack Justification

### TigerGraph
- **Why**: Native parallel graph database with real-time updates, built-in graph algorithms, and now vector storage capabilities
- **Benefits**: Efficient multi-hop relationship traversal, real-time fraud pattern detection, hybrid graph-vector querying

### MCP
- **Why**: Standardized protocol for LLM-tool interaction, secure, extensible
- **Benefits**: Decouples agent logic from data access, enables tool reuse, provides security boundaries

### LangGraph
- **Why**: State machine orchestration ideal for investigative workflows, supports human-in-the-loop, deterministic components for compliance
- **Benefits**: Clear investigation flow, audit trails through state transitions, resource optimization

### GraphRAG
- **Why**: Combines graph structure with RAG for better context preservation and hallucination reduction
- **Benefits**: More accurate reasoning, explainable responses, token efficiency

## Risk Mitigation

### Technical Risks
- **Graph Performance**: Mitigate with partitioning, indexing, and algorithm caching
- **MCP Security**: Implement OAuth 2.1, input validation, and audit logging
- **Agent Hallucination**: Use GraphRAG, evidence grading, and uncertainty quantification

### Operational Risks
- **False Positives**: Implement evidence grading and confidence thresholds
- **Regulatory Compliance**: Build audit trails, explainability features, and human oversight
- **Scalability**: Use approximate queries and batch processing where appropriate

## Success Criteria
1. **Investigation Accuracy**: ≥85% accuracy on identifying fraud patterns in benchmark cases
2. **Next Best Action Quality**: ≥80% suitability of recommended actions
3. **Case Summary Quality**: Clear, evidence-backed case progression documentation
4. **Agentic Design**: Demonstrated memory learning, tool use, and workflow orchestration
5. **Innovation**: Novel use of graph-vector hybrids and uncertainty-aware reasoning
6. **Demo Quality**: Clear, effective end-to-end demonstration of investigation flow

This plan provides a comprehensive roadmap for building a state-of-the-art agentic fraud detection system that leverages TigerGraph's graph capabilities, MCP for secure tool integration, and modern agent frameworks for intelligent investigation orchestration.