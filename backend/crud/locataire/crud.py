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

def create_locataire(nom, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle):
    conn = create_connection()
    cur = conn.cursor()
    query = sql.SQL("INSERT INTO locataire (nom, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle) VALUES ({}, {}, {}, {}, {}, {}, {}) RETURNING id").format(
        sql.Literal(nom),
        sql.Literal(etat_lieux_entree),
        sql.Literal(etat_lieux_sortie),
        sql.Literal(date_entree),
        sql.Literal(date_sortie),
        sql.Literal(solde),
        sql.Literal(en_regle)
    )
    cur.execute(query)
    locataire_id = cur.fetchone()[0]
    conn.commit()
    conn.close()
    return locataire_id

def get_all_locataires():
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM locataire ORDER BY id ASC")
    locataires = cur.fetchall()
    conn.close()

    # Convert date objects to ISO format strings
    locataires = [{
        "id": row[0],
        "nom": row[1],
        "etat_lieux_entree": row[2],
        "etat_lieux_sortie": row[3],
        "date_entree": row[4].isoformat(),
        "date_sortie": row[5].isoformat(),
        "solde": row[6],
        "en_regle": row[7]
    } for row in locataires]

    return locataires

def get_locataire(locataire_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM locataire WHERE id = %s", (locataire_id,))
    locataire = cur.fetchone()
    conn.close()

    if locataire:
        # Convert date objects to ISO format strings
        locataire = {
            "id": locataire[0],
            "nom": locataire[1],
            "etat_lieux_entree": locataire[2],
            "etat_lieux_sortie": locataire[3],
            "date_entree": locataire[4].isoformat(),
            "date_sortie": locataire[5].isoformat(),
            "solde": locataire[6],
            "en_regle": locataire[7]
        }
    return locataire

def delete_locataire(locataire_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM locataire WHERE id = %s", (locataire_id,))
    conn.commit()
    conn.close()

def update_locataire(locataire_id, nom, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("UPDATE locataire SET nom = %s, etat_lieux_entree = %s, etat_lieux_sortie = %s, date_entree = %s, date_sortie = %s, solde = %s, en_regle = %s WHERE id = %s",
                (nom, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle, locataire_id))
    conn.commit()
    conn.close()
