import psycopg2
from psycopg2 import sql
from datetime import datetime
import os

from config import get_db_name, get_db_user, get_db_password, get_db_host

def create_connection():
    return psycopg2.connect(
        dbname=get_db_name(),
        user=get_db_user(),
        password=get_db_password(),
        host=get_db_host()
    )



def create_appartement(adresse, complement_adresse, ville, code_postal, charges_cout, loyer_cout, depot_garantie_cout):
    conn = create_connection()
    cur = conn.cursor()
    query = sql.SQL("INSERT INTO appartement (adresse, complement_adresse, ville, code_postal, charges_cout, loyer_cout, depot_garantie_cout) VALUES ({}, {}, {}, {}, {}, {}, {}) RETURNING id").format(
        sql.Literal(adresse),
        sql.Literal(complement_adresse),
        sql.Literal(ville),
        sql.Literal(code_postal),
        sql.Literal(charges_cout),
        sql.Literal(loyer_cout),
        sql.Literal(depot_garantie_cout)
    )
    cur.execute(query)
    appartement_id = cur.fetchone()[0]
    conn.commit()
    conn.close()
    return appartement_id

def get_all_appartements():
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM appartement ORDER BY id ASC")
    appartements = cur.fetchall()
    conn.close()
    return appartements

def get_appartement(appartement_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM appartement WHERE id = %s", (appartement_id,))
    appartement = cur.fetchone()
    conn.close()
    return appartement

def delete_appartement(appartement_id):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM appartement WHERE id = %s", (appartement_id,))
    conn.commit()
    conn.close()

def update_appartement(appartement_id, adresse, complement_adresse, ville, code_postal, charges_cout, loyer_cout, depot_garantie_cout):
    conn = create_connection()
    cur = conn.cursor()
    cur.execute("UPDATE appartement SET adresse = %s, complement_adresse = %s, ville = %s, code_postal = %s, charges_cout = %s, loyer_cout = %s, depot_garantie_cout = %s WHERE id = %s",
                (adresse, complement_adresse, ville, code_postal, charges_cout, loyer_cout, depot_garantie_cout, appartement_id))
    conn.commit()
    conn.close()
