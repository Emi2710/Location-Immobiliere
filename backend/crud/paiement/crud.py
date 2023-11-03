import psycopg2
from psycopg2 import sql
from config import get_db_name, get_db_user, get_db_password, get_db_host
from datetime import date

def create_connection():
    return psycopg2.connect(
        dbname=get_db_name(),
        user=get_db_user(),
        password=get_db_password(),
        host=get_db_host()
    )

def create_paiement(date_paiement, origine_paiement, cout):
    conn = create_connection()
    cur = conn.cursor()
    query = sql.SQL("INSERT INTO paiement (date_paiement, origine_paiement, cout) VALUES ({}, {}, {}) RETURNING id").format(
        sql.Literal(date_paiement),
        sql.Literal(origine_paiement),
        sql.Literal(cout)
    )
    cur.execute(query)
    paiement_id = cur.fetchone()[0]
    conn.commit()
    conn.close()
    return paiement_id

def get_all_paiements():
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM paiement ORDER BY id ASC")
    paiements = cur.fetchall()
    conn.close()

    # Convert date objects to ISO format strings
    paiements = [{
        "id": row[0],
        "date_paiement": row[1].isoformat(),
        "origine_paiement": row[2],
        "cout": row[3]
    } for row in paiements]

    return paiements

def get_paiement(paiement_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM paiement WHERE id = %s", (paiement_id,))
    paiement = cur.fetchone()
    conn.close()

    if paiement:
        # Convert date objects to ISO format strings
        paiement = {
            "id": paiement[0],
            "date_paiement": paiement[1].isoformat(),
            "origine_paiement": paiement[2],
            "cout": paiement[3]
        }
    return paiement

def delete_paiement(paiement_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM paiement WHERE id = %s", (paiement_id,))
    conn.commit()
    conn.close()

def update_paiement(paiement_id, date_paiement, origine_paiement, cout):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("UPDATE paiement SET date_paiement = %s, origine_paiement = %s, cout = %s WHERE id = %s",
                (date_paiement, origine_paiement, cout, paiement_id))
    conn.commit()
    conn.close()
