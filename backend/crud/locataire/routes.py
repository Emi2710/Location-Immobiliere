from flask import request
from flask_restful import Resource
from crud.locataire.crud import create_locataire, get_locataire, delete_locataire, update_locataire, get_all_locataires, get_locataire_by_appartement_id

class LocataireResource(Resource):
    def post(self):
        data = request.json
        nom = data['nom']
        appartement_id = data['appartement_id']
        etat_lieux_entree = data['etat_lieux_entree']
        etat_lieux_sortie = data['etat_lieux_sortie']
        date_entree = data['date_entree']
        date_sortie = data['date_sortie']
        solde = data['solde']
        en_regle = data['en_regle']
        locataire_id = create_locataire(nom, appartement_id, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle)
        return {'id': locataire_id}

    def get(self):
        locataires = get_all_locataires()
        return locataires

class LocataireDetailResource(Resource):
    def get(self, locataire_id):
        locataire = get_locataire(locataire_id)
        if locataire:
            return locataire
        else:
            return {'message': 'Locataire not found'}, 404

    def delete(self, locataire_id):
        delete_locataire(locataire_id)
        return {'message': 'Locataire deleted'}

    def put(self, locataire_id):
        data = request.json
        nom = data['nom']
        appartement_id = data['appartement_id']
        etat_lieux_entree = data['etat_lieux_entree']
        etat_lieux_sortie = data['etat_lieux_sortie']
        date_entree = data['date_entree']
        date_sortie = data['date_sortie']
        solde = data['solde']
        en_regle = data['en_regle']
        update_locataire(locataire_id, nom, appartement_id, etat_lieux_entree, etat_lieux_sortie, date_entree, date_sortie, solde, en_regle)
        return {'message': 'Locataire updated'}

class LocataireByAppartementResource(Resource):
    def get(self, appartement_id):
        locataire = get_locataire_by_appartement_id(appartement_id)
        if locataire:
            locataire_dict = {
                'id': locataire[0],
                'nom': locataire[1],
                'appartement_id': locataire[2],
                'etat_lieux_entree': locataire[3],
                'etat_lieux_sortie': locataire[4],
                'date_entree': locataire[5],
                'date_sortie': locataire[6],
                'solde': locataire[7],
                'en_regle': locataire[8]
            }
            return {'locataire': locataire_dict}
        else:
            return {'error': 'Locataire not found for the specified appartement_id'}, 404
