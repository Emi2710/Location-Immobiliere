from flask import request
from flask_restful import Resource
from crud.paiement.crud import create_paiement, get_paiement, delete_paiement, update_paiement, get_all_paiements, get_locataire_by_paiement_locataire_id,get_appartement_by_paiement_appartement_id  # Import the CRUD functions for paiement

class PaiementResource(Resource):
    def post(self):
        data = request.json
        locataire_id = data['locataire_id']
        appartement_id = data['appartement_id']
        date_paiement = data['date_paiement']
        origine_paiement = data['origine_paiement']
        cout = data['cout']
        paiement_id = create_paiement(locataire_id, appartement_id, date_paiement, origine_paiement, cout)
        return {'id': paiement_id}

    def get(self):
        paiements = get_all_paiements()
        return paiements

class PaiementDetailResource(Resource):
    def get(self, paiement_id):
        paiement = get_paiement(paiement_id)
        if paiement:
            return paiement
        else:
            return {'message': 'Paiement not found'}, 404

    def delete(self, paiement_id):
        delete_paiement(paiement_id)
        return {'message': 'Paiement deleted'}

    def put(self, paiement_id):
        data = request.json
        locataire_id = data['locataire_id']
        appartement_id = data['appartement_id']
        date_paiement = data['date_paiement']
        origine_paiement = data['origine_paiement']
        cout = data['cout']
        update_paiement(paiement_id, locataire_id, appartement_id, date_paiement, origine_paiement, cout)
        return {'message': 'Paiement updated'}

class LocataireByPaiementLocataireResource(Resource):
    def get(self, paiement_locataire_id):
        locataire = get_locataire_by_paiement_locataire_id(paiement_locataire_id)
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

class AppartementByPaiementAppartementResource(Resource):
    def get(self, paiement_appartement_id):
        appartement = get_appartement_by_paiement_appartement_id(paiement_appartement_id)
        if appartement:
            appartement_dict = {
                'id': appartement[0],
                'adresse': appartement[1],
                'complement_adresse': appartement[2],
                'ville': appartement[3],
                'code_postal': appartement[4],
                'charges_cout': appartement[5],
                'loyer_cout': appartement[6],
                'depot_garantie_cout': appartement[7]
            }
            return {'appartement': appartement_dict}
        else:
            return {'error': 'Appartement not found for the specified appartement_id'}, 404