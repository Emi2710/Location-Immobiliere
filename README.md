# Examen certifiant du bloc - Développement d'une solution digitale avec Python

Ce projet a été réalisé dans le cadre de l'examen certifiant du bloc - Développement d'une solution digitale avec Python

Le but était de développer une application web de gestion de location immobilière pour un client. Le client peut ajouter des appartements et affecter aux appartements de son choix un locataire. Le client peut également ajouter pour chaque locataire des paiements et générer des bilans des comptes en pdf.


Voici le lien vers mon logiciel de gestion pour ce projet:: Suivre [ce lien]()

Ci dessous les démarches de déploiment en local.

## Déployer l'application localement


Cloner le projet

```bash
    git clone https://github.com/Emi2710/Location-Immobiliere
```

Accéder au backend

```bash
    cd backend
```
Installer les dépendances nécessaires

```bash
    pipenv install
```

Activer pipenv

```bash
    pipenv shell
```

Accéder au terminal postgres

```bash
    psql -U (votre nom d'utlisateur postgres)
```

Exectuer le fichier database.sql

```bash
    \i database.sql
```

Sortir du terminal 

Définir les variables d'environnement
```bash
DB_NAME=location_immobiliere
DB_USER=(votre nom d'utilisateuer postgres)
DB_PASSWORD=(votre mot de passe postgres)
DB_HOST=localhost

PORT=5000
```
Créer un fichier .flaskenv et ajouter les variables suivantes:
```bash
FLASK_APP=app
FLASK_ENV=development
```

Lancer le serveur de développement

```bash
    flask run 
```

Ouvrir un nouveau terminal et accéder au front end 

```bash
    cd frontend
```

Installer les dépendances nécessaires

```bash
    npm install 
```

Lancer le serveur

```bash
    npm start
```

Vous pouvez maintenant tester l'application et les fonctionnalités


### Vous retrouverez mes livrables ici :

Suivre [ce lien]() 
