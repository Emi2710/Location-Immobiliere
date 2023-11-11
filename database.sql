CREATE DATABASE location_immobiliere;


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

ALTER TABLE locataire
ADD CONSTRAINT unique_appartement_id UNIQUE (appartement_id);


ALTER TABLE paiement 
ADD CONSTRAINT FK_locataire
FOREIGN KEY(locataire_id) REFERENCES locataire(id);

ALTER TABLE paiement 
ADD CONSTRAINT FK_appartement
FOREIGN KEY(appartement_id) REFERENCES appartement(id); 


-- Inserting sample data for the 'appartement' table
-- Appartement Data
INSERT INTO appartement (adresse, complement_adresse, ville, code_postal, charges_cout, loyer_cout, depot_garantie_cout) 
VALUES
('123 Rue de la Liberté', 'Appt 2B', 'Paris', 75001, 100, 1200, 1500),
('456 Avenue des Roses', 'Appt 5C', 'Marseille', 13001, 80, 1000, 1200),
('789 Boulevard du Soleil', 'Appt 10A', 'Lyon', 69001, 120, 1500, 1800),
('101 Rue de la Paix', 'Appt 3D', 'Toulouse', 31000, 90, 1100, 1400),
('202 Avenue des Champs', 'Appt 8E', 'Nice', 06000, 110, 1300, 1600),
('303 Rue de la Joie', 'Appt 15F', 'Bordeaux', 33000, 95, 1150, 1450),
('404 Avenue des Arbres', 'Appt 7B', 'Lille', 59000, 85, 1050, 1300),
('505 Rue Espoir', 'Appt 12C', 'Strasbourg', 67000, 100, 1200, 1500),
('606 Boulevard des Vents', 'Appt 4A', 'Nantes', 44000, 75, 950, 1200),
('707 Rue des Etoiles', 'Appt 9D', 'Montpellier', 34000, 105, 1250, 1550),
('808 Avenue du Bonheur', 'Appt 6F', 'Rennes', 35000, 115, 1350, 1700),
('909 Rue des Nuages', 'Appt 11E', 'Dijon', 21000, 80, 1000, 1250),
('1010 Boulevard de la Nature', 'Appt 14B', 'Reims', 51100, 95, 1150, 1450),
('1111 Rue Avenir', 'Appt 13C', 'Toulon', 83000, 110, 1300, 1600),
('1212 Avenue de la Sérénité', 'Appt 5A', 'Angers', 49000, 85, 1050, 1300);

-- Locataire Data with date_sortie
INSERT INTO locataire (nom, appartement_id, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle) 
VALUES
('Jean Dupont', 1, 'Bon état', 'Bon état', '2023-01-15', '2023-11-15', 0, TRUE),
('Marie Martin', 2, 'Très bon état', 'Très bon état', '2023-02-20', '2023-12-20', 0, TRUE),
('Pierre Durand', 3, 'Excellent état', 'Excellent état', '2023-03-10', '2024-01-10', 0, TRUE),
('Sophie Leroy', 4, 'Bon état', 'Bon état', '2023-04-05', '2024-02-05', 0, TRUE),
('Luc Moreau', 5, 'Très bon état', 'Très bon état', '2023-05-12', '2024-03-12', 0, TRUE),
('Claire Lefevre', 6, 'Excellent état', 'Excellent état', '2023-06-18', '2024-04-18', 0, TRUE),
('Thomas Roux', 7, 'Bon état', 'Bon état', '2023-07-22', '2024-05-22', 0, TRUE),
('Julie Martin', 8, 'Très bon état', 'Très bon état', '2023-08-30', '2024-06-30', 0, TRUE),
('Nicolas Bernard', 9, 'Excellent état', 'Excellent état', '2023-09-14', '2024-07-14', 0, TRUE),
('Camille Dupuis', 10, 'Bon état', 'Bon état', '2023-10-03', '2024-08-03', 0, TRUE);


-- Paiement Data
INSERT INTO paiement (locataire_id, appartement_id, date_paiement, origine_paiement, cout) 
VALUES
(1, 1, '2023-01-15', 'Locataire', 1200),
(2, 2, '2023-02-20', 'Locataire', 1000),
(3, 3, '2023-03-10', 'Caf', 1500),
(4, 4, '2023-04-05', 'Locataire', 1100),
(5, 5, '2023-05-12', 'Caf', 1300),
(6, 6, '2023-06-18', 'Locataire', 1600),
(7, 7, '2023-07-22', 'Caf', 1050),
(8, 8, '2023-08-30', 'Locataire', 1200),
(9, 9, '2023-09-14', 'Caf', 1450),
(10, 10, '2023-10-03', 'Locataire', 950),
(10, 11, '2023-11-08', 'Locataire', 1700),
(9, 12, '2023-12-20', 'Caf', 1250),
(8, 13, '2024-01-05', 'Locataire', 1450),
(10, 14, '2024-02-15', 'Caf', 1200),
(9, 15, '2024-03-02', 'Locataire', 1350),
(1, 1, '2024-04-10', 'Caf', 1100),
(2, 2, '2024-05-18', 'Locataire', 1550),
(3, 3, '2024-06-25', 'Caf', 1400),
(4, 4, '2024-07-12', 'Locataire', 1250),
(5, 5, '2024-08-30', 'Caf', 1200),
(6, 6, '2024-09-14', 'Locataire', 1800),
(7, 7, '2024-10-03', 'Caf', 950),
(8, 8, '2024-11-08', 'Locataire', 1300),
(9, 9, '2024-12-20', 'Caf', 1600),
(10, 10, '2025-01-05', 'Locataire', 1450),
(8, 11, '2025-02-15', 'Caf', 1200),
(6, 12, '2025-03-02', 'Locataire', 1350),
(7, 13, '2025-04-10', 'Caf', 1100),
(10, 14, '2025-05-18', 'Locataire', 1550),
(1, 15, '2025-06-25', 'Caf', 1400);
