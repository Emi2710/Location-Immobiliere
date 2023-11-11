import psycopg2
from psycopg2 import sql
from config import get_db_name, get_db_user, get_db_password, get_db_host

def create_connection():
    return psycopg2.connect(
        dbname=get_db_name(),
        user=get_db_user(),
        password=get_db_password(),
        host=get_db_host()
    )

def create_locataire(nom, appartement_id, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle):
    conn = create_connection()
    cur = conn.cursor()
    query = sql.SQL("INSERT INTO locataire (nom, appartement_id, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle) VALUES ({}, {}, {}, {}, {}, {}, {}, {}) RETURNING id").format(
        sql.Literal(nom),
        sql.Literal(appartement_id),
        sql.Literal(etat_lieux_entree),
        sql.Literal(etat_lieux_sortie),
        sql.Literal(date_entree),
        sql.Literal(date_sortie),
        sql.Literal(solde),
        sql.Literal(en_regle),
        
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
        "appartement_id": row[2],
        "etat_lieux_entree": row[3],
        "etat_lieux_sortie": row[4],
        "date_entree": row[5].isoformat(),
        "date_sortie": row[6].isoformat(),
        "solde": row[7],
        "en_regle": row[8],
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
            "appartement_id": locataire[2],
            "etat_lieux_entree": locataire[3],
            "etat_lieux_sortie": locataire[4],
            "date_entree": locataire[5].isoformat(),
            "date_sortie": locataire[6].isoformat(),
            "solde": locataire[7],
            "en_regle": locataire[8],
            
        }
    return locataire

def delete_locataire(locataire_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM locataire WHERE id = %s", (locataire_id,))
    conn.commit()
    conn.close()

def update_locataire(locataire_id, nom, appartement_id, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("UPDATE locataire SET nom = %s, appartement_id = %s, etat_lieux_entree = %s, etat_lieux_sortie = %s, date_entree = %s, date_sortie = %s, solde = %s, en_regle = %s WHERE id = %s",
                (nom, appartement_id, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle, locataire_id))
    conn.commit()
    conn.close()


def get_locataire_by_appartement_id(appartement_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM locataire WHERE appartement_id = %s", (appartement_id,))
    locataire = cur.fetchone()
    conn.close()

    if locataire:
        locataire = list(locataire)  # Convert the result to a list for modification
        locataire[5] = locataire[5].isoformat()  # Convert date_entree to ISO format
        locataire[6] = locataire[6].isoformat()  # Convert date_sortie to ISO format
        return locataire
    else:
        return locataire