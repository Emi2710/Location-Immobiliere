from flask import request, send_file
from flask_restful import Resource
from datetime import datetime, timedelta
from crud.paiement.crud import create_paiement, get_paiement, delete_paiement, update_paiement, get_all_paiements, get_locataire_by_paiement_locataire_id,get_appartement_by_paiement_appartement_id, get_paiements_by_info_and_period, generate_pdf, get_paiements_by_locataire_and_appartement

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
        


class PaiementByFiltersResource(Resource):
    def post(self):
        data = request.json
        locataire_id = data.get('locataire_id')
        appartement_id = data.get('appartement_id')
        start_date_str = data.get('start_date')
        end_date_str = data.get('end_date')
        
        if not locataire_id or not appartement_id or not start_date_str or not end_date_str:
            return {'error': 'Missing parameters: locataire_id, appartement_id, start_date, and end_date are required.'}, 400

        try:
            start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
            end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
        except ValueError:
            return {'error': 'Invalid date format. Use "YYYY-MM-DD".'}, 400

        # Call a function to retrieve payments based on the provided information and date range
        payments = get_paiements_by_info_and_period(locataire_id, appartement_id, start_date, end_date)

        if payments:
            # Generate PDF and send it as a response
            pdf_buffer = generate_pdf(payments)
            return send_file(
                pdf_buffer,
                download_name="payment_details.pdf",
                as_attachment=True,
                mimetype="application/pdf"
            )
        else:
            return {'message': 'No payments found for the specified criteria.'}, 404

class PaymentsByLocataireAndAppartementResource(Resource):
    def post(self):
        data = request.json
        locataire_id = data.get('locataire_id')
        appartement_id = data.get('appartement_id')

        if not locataire_id or not appartement_id:
            return {'error': 'Missing parameters: locataire_id and appartement_id are required.'}, 400

        # Call a function to retrieve payments based on locataire_id and appartement_id
        payments = get_paiements_by_locataire_and_appartement(locataire_id, appartement_id)

        if payments:
            # Generate PDF and send it as a response
            pdf_buffer = generate_pdf(payments)
            return send_file(
                pdf_buffer,
                download_name="payment_details.pdf",
                as_attachment=True,
                mimetype="application/pdf"
            )
        else:
            return {'message': 'No payments found for the specified locataire_id and appartement_id.'}, 404