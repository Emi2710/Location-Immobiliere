CREATE DATABASE location_immobiliere;

-- appartement

CREATE TABLE appartement( 
    id SERIAL PRIMARY KEY,
    adresse TEXT,
    complement_adresse TEXT,
    ville VARCHAR(255) NOT NULL,
    code_postal INT,
    charges_cout INT,
    loyer_cout INT,
    depot_garantie_cout INT
);

-- locataire

CREATE TABLE locataire(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) unique NOT NULL,
    etat_lieux_entree TEXT, 
    etat_lieux_sortie TEXT, 
    date_entree DATE,
    date_sortie DATE,
    solde INT,
    en_regle BOOLEAN
);


-- paiement

CREATE TABLE paiement( 
    id SERIAL PRIMARY KEY,
    date_paiement DATE,
    origine_paiement VARCHAR(255),
    cout INT
);

