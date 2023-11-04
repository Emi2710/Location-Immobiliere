from flask import request
from flask_restful import Resource
from crud.paiement.crud import create_paiement, get_paiement, delete_paiement, update_paiement, get_all_paiements  # Import the CRUD functions for paiement

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
        update_paiement(locataire_id, appartement_id, paiement_id, date_paiement, origine_paiement, cout)
        return {'message': 'Paiement updated'}
