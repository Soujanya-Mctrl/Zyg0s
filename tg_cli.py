"""
TigerGraph Workspace CLI Tool.

A comprehensive command-line interface to inspect, explore, query, and test
everything in the TigerGraph Savanna Cloud workspace.

Usage:
    python tg_cli.py --help
    python tg_cli.py status
    python tg_cli.py stats
    python tg_cli.py schema [vertex_or_edge_type]
    python tg_cli.py sample <vertex_type> [--limit 5]
    python tg_cli.py lookup <vertex_type> <id>
    python tg_cli.py neighbors <vertex_type> <id> [--depth 1|2]
    python tg_cli.py queries [--run query_name] [--params '{"param": "val"}']
    python tg_cli.py gsql "<command>"
    python tg_cli.py interactive
"""

import sys
import json
import argparse
from pathlib import Path
from typing import Dict, Any, List, Optional

# Ensure project root is in sys.path
PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.graph.client import get_tg_connection, check_health

# Rich formatting support (fallback to clean text if not available)
try:
    from rich.console import Console
    from rich.table import Table
    from rich.panel import Panel
    from rich.syntax import Syntax
    console = Console()
    HAS_RICH = True
except ImportError:
    console = None
    HAS_RICH = False


def print_title(title: str):
    if HAS_RICH:
        console.print(Panel.fit(f"[bold cyan]{title}[/bold cyan]", border_style="cyan"))
    else:
        print("\n" + "=" * 60)
        print(f"  {title}")
        print("=" * 60)


def print_table(headers: List[str], rows: List[List[Any]], title: Optional[str] = None):
    if HAS_RICH:
        table = Table(title=title, show_header=True, header_style="bold magenta")
        for h in headers:
            table.add_column(h)
        for row in rows:
            table.add_row(*[str(x) for x in row])
        console.print(table)
    else:
        if title:
            print(f"\n--- {title} ---")
        col_widths = [len(h) for h in headers]
        for row in rows:
            for i, val in enumerate(row):
                col_widths[i] = max(col_widths[i], len(str(val)))
        header_line = " | ".join(h.ljust(col_widths[i]) for i, h in enumerate(headers))
        print(header_line)
        print("-" * len(header_line))
        for row in rows:
            print(" | ".join(str(val).ljust(col_widths[i]) for i, val in enumerate(row)))


def cmd_status(args):
    """Check connection status, echo message, and cluster health."""
    print_title("TigerGraph Savanna Cloud Status")
    try:
        health = check_health()
        rows = [
            ["Status", "[bold green]ONLINE[/bold green]" if HAS_RICH else "ONLINE"],
            ["Echo", health["echo"]],
            ["Graph Name", health["graph_name"]],
            ["Total Transactions", f"{health['total_transactions']:,}"],
            ["Parties / Cardholders", f"{health['total_parties']:,}"],
            ["Cards", f"{health['total_cards']:,}"],
            ["Devices", f"{health['total_devices']:,}"],
            ["Installed GSQL Queries", str(health["installed_query_count"])],
        ]
        print_table(["Metric", "Value"], rows)
    except Exception as e:
        print(f"[ERROR] Health check failed: {e}")


def cmd_stats(args):
    """Retrieve full vertex counts across all vertex types."""
    print_title("Graph Statistics: All Vertex Counts")
    conn = get_tg_connection()
    counts = conn.getVertexCount("*")
    
    rows = []
    total = 0
    for vtype, count in sorted(counts.items(), key=lambda x: x[1], reverse=True):
        rows.append([vtype, f"{count:,}"])
        total += count
    rows.append(["[bold]TOTAL[/bold]" if HAS_RICH else "TOTAL", f"{total:,}"])
    
    print_table(["Vertex Type", "Count"], rows, title=f"Graph: {conn.graphname}")


def cmd_schema(args):
    """Inspect schema for vertices, edges, or a specific type."""
    conn = get_tg_connection()
    target = args.type
    
    if not target:
        print_title(f"Graph Schema Overview: {conn.graphname}")
        v_types = conn.getVertexTypes()
        e_types = conn.getEdgeTypes()
        
        v_rows = [[v, conn.getVertexCount(v)] for v in sorted(v_types)]
        print_table(["Vertex Type", "Current Count"], v_rows, title="Vertex Types")
        
        e_rows = [[e] for e in sorted(e_types)]
        print_table(["Edge Type"], e_rows, title="Edge Types")
        print("\nTip: Run 'python tg_cli.py schema <TypeName>' to inspect specific attributes.")
        return

    # Specific type schema inspection
    schema = conn.getSchema(force=True)
    found = False
    
    # Check Vertex Types
    for v in schema.get("VertexTypes", []):
        if v.get("Name", "").lower() == target.lower():
            found = True
            print_title(f"Vertex Type Schema: {v.get('Name')}")
            attr_rows = []
            pk_name = v.get("PrimaryId", {}).get("AttributeName", "id")
            pk_type = v.get("PrimaryId", {}).get("AttributeType", {}).get("Name", "STRING")
            attr_rows.append([pk_name, pk_type, "PRIMARY KEY"])
            for attr in v.get("Attributes", []):
                attr_rows.append([attr.get("AttributeName"), attr.get("AttributeType", {}).get("Name"), "Attribute"])
            print_table(["Attribute Name", "Data Type", "Role"], attr_rows)
            break
            
    # Check Edge Types
    if not found:
        for e in schema.get("EdgeTypes", []):
            if e.get("Name", "").lower() == target.lower():
                found = True
                print_title(f"Edge Type Schema: {e.get('Name')}")
                details = [
                    ["From Vertex", e.get("FromVertexTypeName", "")],
                    ["To Vertex", e.get("ToVertexTypeName", "")],
                    ["Is Directed", str(e.get("IsDirected", False))],
                ]
                print_table(["Property", "Value"], details)
                if e.get("Attributes"):
                    attr_rows = [[a.get("AttributeName"), a.get("AttributeType", {}).get("Name")] for a in e.get("Attributes", [])]
                    print_table(["Attribute Name", "Data Type"], attr_rows, title="Edge Attributes")
                break
                
    if not found:
        print(f"[WARN] No vertex or edge type found matching '{target}'.")


def cmd_sample(args):
    """Retrieve sample records for a given vertex type."""
    conn = get_tg_connection()
    vtype = args.vertex_type
    limit = args.limit or 5
    
    print_title(f"Sample Records: {vtype} (Limit {limit})")
    try:
        vertices = conn.getVertices(vtype, limit=limit)
        if not vertices:
            print(f"No records found for vertex type '{vtype}'.")
            return
            
        # Extract keys for table headers
        sample_first = vertices[0]
        v_id_key = "v_id"
        attrs = list(sample_first.get("attributes", {}).keys())
        headers = ["v_id"] + attrs[:6]  # Show up to 6 attributes
        
        rows = []
        for v in vertices:
            row = [v.get("v_id")]
            for a in attrs[:6]:
                row.append(str(v.get("attributes", {}).get(a, "")))
            rows.append(row)
            
        print_table(headers, rows)
    except Exception as e:
        print(f"[ERROR] Failed to fetch sample: {e}")


def cmd_lookup(args):
    """Lookup a single vertex by type and ID."""
    conn = get_tg_connection()
    vtype = args.vertex_type
    vid = args.id
    
    print_title(f"Vertex Lookup: {vtype} ['{vid}']")
    try:
        res = conn.getVerticesById(vtype, [vid])
        if not res:
            print(f"No record found for {vtype} with ID '{vid}'.")
            return
            
        record = res[0]
        rows = [["ID (Primary Key)", record.get("v_id")]]
        for k, v in record.get("attributes", {}).items():
            rows.append([k, str(v)])
            
        print_table(["Field", "Value"], rows)
    except Exception as e:
        print(f"[ERROR] Lookup failed: {e}")


def cmd_neighbors(args):
    """Traverse and display 1-hop or 2-hop neighbors of a vertex."""
    conn = get_tg_connection()
    vtype = args.vertex_type
    vid = args.id
    depth = args.depth or 1
    
    print_title(f"Neighbor Traversal: {vtype} ['{vid}'] (Depth: {depth})")
    try:
        # Fetch edges
        edges = conn.getEdges(vtype, vid)
        if not edges:
            print(f"No outward edges found for {vtype} ['{vid}'].")
            return
            
        rows = []
        for e in edges:
            e_type = e.get("e_type")
            to_type = e.get("to_type")
            to_id = e.get("to_id")
            attrs = json.dumps(e.get("attributes", {})) if e.get("attributes") else "-"
            rows.append([e_type, to_type, to_id, attrs])
            
        print_table(["Edge Type", "Target Type", "Target ID", "Edge Attributes"], rows, title="1-Hop Connected Neighbors")
        
        # If depth == 2, expand first 3 neighbors
        if depth >= 2:
            print_title("2-Hop Neighbor Expansion (First 3 connected entities)")
            for e in edges[:3]:
                sub_to_type = e.get("to_type")
                sub_to_id = e.get("to_id")
                sub_edges = conn.getEdges(sub_to_type, sub_to_id)
                sub_rows = []
                for se in sub_edges[:5]:
                    sub_rows.append([se.get("e_type"), se.get("to_type"), se.get("to_id")])
                print_table(["Edge Type", "Target Type", "Target ID"], sub_rows, 
                            title=f"From: {sub_to_type} ['{sub_to_id}']")
    except Exception as e:
        print(f"[ERROR] Neighbor traversal failed: {e}")


def cmd_queries(args):
    """List installed GSQL queries or execute a query with parameters."""
    conn = get_tg_connection()
    installed = conn.getInstalledQueries()
    
    # If no query specified to run, list them all
    if not args.run:
        print_title(f"Installed GSQL Queries ({len(installed)} total)")
        rows = []
        for endpoint, details in sorted(installed.items()):
            qname = endpoint.split("/")[-1]
            rows.append([qname, endpoint])
        print_table(["Query Name", "REST++ Endpoint"], rows)
        print("\nTip: Run 'python tg_cli.py queries --run <QueryName> --params '{\"key\":\"val\"}''")
        return

    # Run specific query
    query_name = args.run
    params = {}
    if args.params:
        raw_p = args.params.strip()
        try:
            params = json.loads(raw_p)
        except Exception:
            try:
                # Handle single-quoted or escaped JSON from PowerShell
                cleaned = raw_p.replace('\\"', '"').replace("'", '"')
                params = json.loads(cleaned)
            except Exception:
                # Fallback: parse key=value,key2=value2
                try:
                    for pair in raw_p.split(","):
                        if "=" in pair:
                            k, v = pair.split("=", 1)
                            params[k.strip()] = v.strip()
                except Exception as e:
                    print(f"[ERROR] Could not parse --params '{raw_p}': {e}")
                    return


    print_title(f"Executing GSQL Query: {query_name}")
    print(f"Parameters: {params}")
    try:
        res = conn.runInstalledQuery(query_name, params=params)
        if HAS_RICH:
            console.print(Syntax(json.dumps(res, indent=2), "json", theme="monokai"))
        else:
            print(json.dumps(res, indent=2))
    except Exception as e:
        print(f"[ERROR] Query execution failed: {e}")


def cmd_gsql(args):
    """Run an arbitrary GSQL command string."""
    conn = get_tg_connection()
    cmd = args.command
    print_title(f"GSQL Command: {cmd}")
    try:
        res = conn.gsql(cmd)
        print(res)
    except Exception as e:
        print(f"[ERROR] GSQL execution failed: {e}")


def cmd_interactive(args):
    """Interactive loop for quick testing."""
    print_title("TigerGraph Savanna Cloud: Interactive Shell")
    print("Commands:")
    print("  1. status           - Check health and connectivity")
    print("  2. stats            - Show all vertex counts")
    print("  3. schema [type]    - Inspect schema overview or specific type")
    print("  4. sample <type>    - Sample records for a vertex type")
    print("  5. lookup <type> <id> - Lookup single vertex")
    print("  6. neighbors <type> <id> - 1-2 hop neighborhood")
    print("  7. queries          - List installed queries")
    print("  8. gsql <command>   - Execute raw GSQL statement")
    print("  q. quit / exit      - Exit shell\n")

    while True:
        try:
            user_input = input("tigergraph> ").strip()
            if not user_input:
                continue
            if user_input.lower() in ["q", "quit", "exit"]:
                print("Exiting interactive shell. Goodbye!")
                break
                
            parts = user_input.split()
            cmd = parts[0].lower()
            
            if cmd == "status":
                cmd_status(None)
            elif cmd == "stats":
                cmd_stats(None)
            elif cmd == "schema":
                sub_type = parts[1] if len(parts) > 1 else None
                cmd_schema(argparse.Namespace(type=sub_type))
            elif cmd == "sample":
                if len(parts) < 2:
                    print("Usage: sample <vertex_type> [limit]")
                    continue
                v_type = parts[1]
                limit = int(parts[2]) if len(parts) > 2 else 5
                cmd_sample(argparse.Namespace(vertex_type=v_type, limit=limit))
            elif cmd == "lookup":
                if len(parts) < 3:
                    print("Usage: lookup <vertex_type> <id>")
                    continue
                cmd_lookup(argparse.Namespace(vertex_type=parts[1], id=parts[2]))
            elif cmd == "neighbors":
                if len(parts) < 3:
                    print("Usage: neighbors <vertex_type> <id> [depth]")
                    continue
                depth = int(parts[3]) if len(parts) > 3 else 1
                cmd_neighbors(argparse.Namespace(vertex_type=parts[1], id=parts[2], depth=depth))
            elif cmd == "queries":
                cmd_queries(argparse.Namespace(run=None, params=None))
            elif cmd == "gsql":
                raw_gsql = user_input[5:].strip()
                cmd_gsql(argparse.Namespace(command=raw_gsql))
            else:
                print(f"Unknown command: '{cmd}'. Try 'status', 'stats', 'schema', 'sample', 'lookup', 'neighbors', 'queries', or 'gsql'.")
        except KeyboardInterrupt:
            print("\nExiting interactive shell.")
            break
        except Exception as e:
            print(f"[ERROR]: {e}")


def main():
    parser = argparse.ArgumentParser(
        description="TigerGraph Savanna Cloud Workspace CLI Tool",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    subparsers = parser.add_subparsers(dest="command", help="Available subcommands")

    # status
    p_status = subparsers.add_parser("status", help="Check connection health and server echo")
    p_status.set_defaults(func=cmd_status)

    # stats
    p_stats = subparsers.add_parser("stats", help="Show all vertex counts in graph")
    p_stats.set_defaults(func=cmd_stats)

    # schema
    p_schema = subparsers.add_parser("schema", help="Inspect schema of graph or specific type")
    p_schema.add_argument("type", nargs="?", default=None, help="Optional vertex or edge type name")
    p_schema.set_defaults(func=cmd_schema)

    # sample
    p_sample = subparsers.add_parser("sample", help="Sample records of a vertex type")
    p_sample.add_argument("vertex_type", help="Vertex type name (e.g. Card, Device, Payment_Transaction)")
    p_sample.add_argument("--limit", type=int, default=5, help="Number of records to fetch (default: 5)")
    p_sample.set_defaults(func=cmd_sample)

    # lookup
    p_lookup = subparsers.add_parser("lookup", help="Lookup single vertex by type and primary ID")
    p_lookup.add_argument("vertex_type", help="Vertex type name (e.g. Card, Payment_Transaction)")
    p_lookup.add_argument("id", help="Primary Key ID")
    p_lookup.set_defaults(func=cmd_lookup)

    # neighbors
    p_neighbors = subparsers.add_parser("neighbors", help="Traverse neighbors of a vertex")
    p_neighbors.add_argument("vertex_type", help="Vertex type name")
    p_neighbors.add_argument("id", help="Primary Key ID")
    p_neighbors.add_argument("--depth", type=int, default=1, choices=[1, 2], help="Traversal depth (1 or 2)")
    p_neighbors.set_defaults(func=cmd_neighbors)

    # queries
    p_queries = subparsers.add_parser("queries", help="List or execute installed GSQL queries")
    p_queries.add_argument("--run", default=None, help="Name of installed query to execute")
    p_queries.add_argument("--params", default=None, help="JSON string of query parameters")
    p_queries.set_defaults(func=cmd_queries)

    # gsql
    p_gsql = subparsers.add_parser("gsql", help="Run raw GSQL statement")
    p_gsql.add_argument("command", help="GSQL command string to run (e.g. 'ls', 'show user')")
    p_gsql.set_defaults(func=cmd_gsql)

    # interactive
    p_inter = subparsers.add_parser("interactive", help="Start interactive shell session")
    p_inter.set_defaults(func=cmd_interactive)

    args = parser.parse_args()
    if not args.command:
        # Default to interactive if no command specified
        cmd_interactive(None)
    else:
        args.func(args)


if __name__ == "__main__":
    main()
