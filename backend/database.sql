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
    appartement_id INT,
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
    locataire_id INT,
    appartement_id INT,
    date_paiement DATE,
    origine_paiement VARCHAR(255),
    cout INT
);




ALTER TABLE locataire 
ADD CONSTRAINT FK_appartement
FOREIGN KEY(appartement_id) REFERENCES appartement(id);
ADD CONSTRAINT unique_appartement_id UNIQUE (appartement_id);


ALTER TABLE paiement 
ADD CONSTRAINT FK_locataire
FOREIGN KEY(locataire_id) REFERENCES locataire(id);

ALTER TABLE paiement 
ADD CONSTRAINT FK_appartement
FOREIGN KEY(appartement_id) REFERENCES appartement(id); 