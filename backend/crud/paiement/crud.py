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

def create_paiement(locataire_id, appartement_id, date_paiement, origine_paiement, cout):
    conn = create_connection()
    cur = conn.cursor()
    query = sql.SQL("INSERT INTO paiement (locataire_id, appartement_id, date_paiement, origine_paiement, cout) VALUES ({}, {}, {}, {}, {}) RETURNING id").format(
        sql.Literal(locataire_id),
        sql.Literal(appartement_id),
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
        "locataire_id": row[1],
        "appartement_id": row[2],
        "date_paiement": row[3].isoformat(),
        "origine_paiement": row[4],
        "cout": row[5]
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
            "locataire_id": paiement[1],
            "appartement_id": paiement[2],
            "date_paiement": paiement[3].isoformat(),
            "origine_paiement": paiement[4],
            "cout": paiement[5]
        }
    return paiement

def delete_paiement(paiement_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM paiement WHERE id = %s", (paiement_id,))
    conn.commit()
    conn.close()

def update_paiement(paiement_id, locataire_id, appartement_id, date_paiement, origine_paiement, cout):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("UPDATE paiement SET locataire_id = %s, appartement_id = %s, date_paiement = %s, origine_paiement = %s, cout = %s WHERE id = %s",
                (locataire_id, appartement_id, date_paiement, origine_paiement, cout, paiement_id))
    conn.commit()
    conn.close()

def get_locataire_by_paiement_locataire_id(paiement_locataire_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM locataire WHERE id = %s", (paiement_locataire_id,))
    locataire = cur.fetchone()
    conn.close()

    if locataire:
        locataire = list(locataire)  # Convert the result to a list for modification
        locataire[5] = locataire[5].isoformat()  # Convert date_entree to ISO format
        locataire[6] = locataire[6].isoformat()  # Convert date_sortie to ISO format
        return locataire
    else:
        return locataire
    
def get_appartement_by_paiement_appartement_id(paiement_appartement_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM appartement WHERE id = %s", (paiement_appartement_id,))
    appartement = cur.fetchone()
    conn.close()

    if appartement:
        appartement = list(appartement)  # Convert the result to a list for modification
        return appartement
    else:
        return appartement



def get_paiements_by_info_and_period(locataire_id, appartement_id, start_date, end_date):
    conn = create_connection()
    cur = conn.cursor()

    query = sql.SQL("""
        SELECT * FROM paiement
        WHERE locataire_id = %s
        AND appartement_id = %s
        AND date_paiement >= %s
        AND date_paiement <= %s
        ORDER BY date_paiement DESC
    """)
    
    cur.execute(query, (locataire_id, appartement_id, start_date, end_date))

    paiements = cur.fetchall()
    conn.close()

    if paiements:
        # Convert date objects to ISO format strings
        formatted_paiements = [{
            "id": row[0],
            "locataire_id": row[1],
            "appartement_id": row[2],
            "date_paiement": row[3].isoformat(),
            "origine_paiement": row[4],
            "cout": row[5]
        } for row in paiements]
        return formatted_paiements
    else:
        return []