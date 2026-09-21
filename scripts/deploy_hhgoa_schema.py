"""
Deploy official HHGOA Fraud graph schema into Transaction_Fraud using AccountCard to avoid collision with obsolete global Card.
"""

import sys
from pathlib import Path
from dotenv import load_dotenv

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from src.graph.client import get_tg_connection

load_dotenv(dotenv_path=REPO_ROOT / ".env")


def main():
    print("Connecting to TigerGraph Savanna Cloud...")
    conn = get_tg_connection()

    schema_change_gsql = """
USE GRAPH Transaction_Fraud

DROP JOB add_hhgoa_schema

CREATE SCHEMA_CHANGE JOB add_hhgoa_schema FOR GRAPH Transaction_Fraud {
    // 1. Add official HHGOA vertex types
    ADD VERTEX Customer (
        PRIMARY_ID id STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX AccountCard (
        PRIMARY_ID id STRING,
        customer_id STRING,
        card_network STRING,
        card_type STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX Transaction (
        PRIMARY_ID id STRING,
        ts DATETIME,
        amount DOUBLE,
        product_cd STRING,
        risk_score DOUBLE,
        channel STRING,
        dist1 DOUBLE,
        dist2 DOUBLE,
        addr1 STRING,
        addr2 STRING,
        p_emaildomain STRING,
        r_emaildomain STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX DeviceProfile (
        PRIMARY_ID id STRING,
        device_info STRING,
        device_type STRING,
        os STRING,
        browser STRING,
        screen STRING,
        is_new BOOL
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX EmailDomain (
        PRIMARY_ID id STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX BillingRegion (
        PRIMARY_ID id STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX ClosedCase (
        PRIMARY_ID id STRING,
        customer_id STRING,
        card_id STRING,
        opened_at DATETIME,
        closed_at DATETIME,
        outcome STRING,
        pattern STRING,
        exposure_usd DOUBLE,
        analyst_notes STRING
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    ADD VERTEX Investigation_Case (
        PRIMARY_ID id STRING,
        verdict STRING,
        status STRING,
        pattern STRING,
        fraud_probability DOUBLE,
        exposure_usd DOUBLE,
        summary STRING,
        written_at DATETIME
    ) WITH STATS="OUTDEGREE_BY_EDGETYPE";

    // 2. Add official HHGOA edge types
    ADD UNDIRECTED EDGE OWNS (FROM Customer, TO AccountCard);
    ADD DIRECTED EDGE MADE (FROM AccountCard, TO Transaction) WITH REVERSE_EDGE="REVERSE_MADE";
    ADD DIRECTED EDGE FROM_DEVICE (FROM Transaction, TO DeviceProfile) WITH REVERSE_EDGE="REVERSE_FROM_DEVICE";
    ADD DIRECTED EDGE PURCHASER_EMAIL (FROM Transaction, TO EmailDomain) WITH REVERSE_EDGE="REVERSE_PURCHASER_EMAIL";
    ADD DIRECTED EDGE BILLED_IN (FROM Transaction, TO BillingRegion) WITH REVERSE_EDGE="REVERSE_BILLED_IN";
    ADD DIRECTED EDGE NEXT (FROM Transaction, TO Transaction) WITH REVERSE_EDGE="PREV";

    ADD DIRECTED EDGE INVOLVES (FROM ClosedCase, TO Transaction) WITH REVERSE_EDGE="REVERSE_INVOLVES";
    ADD DIRECTED EDGE ON_CARD (FROM ClosedCase, TO AccountCard) WITH REVERSE_EDGE="REVERSE_ON_CARD";
    ADD DIRECTED EDGE CONNECTED_TO (FROM ClosedCase, TO AccountCard) WITH REVERSE_EDGE="REVERSE_CONNECTED_TO";

    ADD DIRECTED EDGE CASE_INVOLVES_TXN (FROM Investigation_Case, TO Transaction) WITH REVERSE_EDGE="TXN_IN_CASE";
    ADD DIRECTED EDGE CASE_ON_CARD (FROM Investigation_Case, TO AccountCard) WITH REVERSE_EDGE="CARD_IN_CASE";
    ADD DIRECTED EDGE CASE_CONNECTED_CARD (FROM Investigation_Case, TO AccountCard) WITH REVERSE_EDGE="CARD_CONNECTED_CASE";
    ADD DIRECTED EDGE CASE_CONNECTED_DEVICE (FROM Investigation_Case, TO DeviceProfile) WITH REVERSE_EDGE="DEVICE_IN_CASE";
}

RUN SCHEMA_CHANGE JOB add_hhgoa_schema
DROP JOB add_hhgoa_schema
"""
    print("Executing online schema change job...")
    res = conn.gsql(schema_change_gsql)
    print("Response:\n", res)

    print("\n--- Verifying Catalog after Migration ---")
    ls_res = conn.gsql("ls")
    print(ls_res)


if __name__ == "__main__":
    main()
