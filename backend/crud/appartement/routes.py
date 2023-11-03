from flask import request
from flask_restful import Resource

from crud.appartement.crud import create_appartement, get_appartement, delete_appartement, update_appartement, get_all_appartements

class AppartementResource(Resource):
    def post(self):
        data = request.json
        # Ensure that the required fields are provided in the JSON data
        if 'adresse' in data and 'ville' in data and 'code_postal' in data:
            appartement_id = create_appartement(
                data['adresse'],
                data.get('complement_adresse', None),
                data['ville'],
                data['code_postal'],
                data.get('charges_cout', None),
                data.get('loyer_cout', None),
                data.get('depot_garantie_cout', None)
            )
            return {'id': appartement_id}, 201  # Include the created apartment data
        else:
            return {'error': 'adresse, ville, and code_postal are required fields'}, 400  # Utilize the response code 400 (Bad Request)

    def get(self):
        appartements = get_all_appartements()
        appartement_list = []
        for appartement in appartements:
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
            appartement_list.append(appartement_dict)
        return {'appartements': appartement_list}

class AppartementDetailResource(Resource):
    def get(self, appartement_id):
        appartement = get_appartement(appartement_id)
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
            return {'error': 'Appartement not found'}, 404

    def delete(self, appartement_id):
        appartement = get_appartement(appartement_id)
        if appartement:
            delete_appartement(appartement_id)
            return f'Appartement (id: {appartement_id}) deleted', 204  # Utilize the response code 204 (No Content)
        else:
            return {'error': 'Appartement not found'}, 404

    def put(self, appartement_id):
        appartement = get_appartement(appartement_id)
        if appartement:
            data = request.json
            if 'adresse' in data and 'ville' in data and 'code_postal' in data:
                update_appartement(
                    appartement_id,
                    data['adresse'],
                    data.get('complement_adresse', None),
                    data['ville'],
                    data['code_postal'],
                    data.get('charges_cout', None),
                    data.get('loyer_cout', None),
                    data.get('depot_garantie_cout', None)
                )
                updated_appartement = get_appartement(appartement_id)
                updated_appartement_dict = {
                    'id': updated_appartement[0],
                    'adresse': updated_appartement[1],
                    'complement_adresse': updated_appartement[2],
                    'ville': updated_appartement[3],
                    'code_postal': updated_appartement[4],
                    'charges_cout': updated_appartement[5],
                    'loyer_cout': updated_appartement[6],
                    'depot_garantie_cout': updated_appartement[7]
                }
                return {'appartement': updated_appartement_dict}
            else:
                return {'error': 'adresse, ville, and code_postal are required fields'}, 400  # Utilize the response code 400 (Bad Request)
        else:
            return {'error': 'Appartement not found'}, 404
