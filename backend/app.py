from flask import Flask
from flask_restful import Api

from crud.appartement.routes import AppartementResource, AppartementDetailResource, AppartementByLocataireAppartementResource
from crud.locataire.routes import LocataireResource, LocataireDetailResource, LocataireByAppartementResource
from crud.paiement.routes import PaiementResource, PaiementDetailResource, LocataireByPaiementLocataireResource, AppartementByPaiementAppartementResource, PaiementByFiltersResource  # Import the new resource

app = Flask(__name__)

api = Api(app)

api.add_resource(AppartementResource, '/appartements')
api.add_resource(AppartementDetailResource, '/appartements/<int:appartement_id>')
api.add_resource(AppartementByLocataireAppartementResource, '/appartements/by_locataire_appartement_id/<int:locataire_appartement_id>')

api.add_resource(LocataireResource, '/locataires')
api.add_resource(LocataireDetailResource, '/locataires/<int:locataire_id>')
api.add_resource(LocataireByAppartementResource, '/locataires/by_appartement/<int:appartement_id>')

api.add_resource(PaiementResource, '/paiements')
api.add_resource(PaiementDetailResource, '/paiements/<int:paiement_id>')
api.add_resource(LocataireByPaiementLocataireResource, '/paiements/locataire_by_paiement_locataire_id/<int:paiement_locataire_id>')
api.add_resource(AppartementByPaiementAppartementResource, '/paiements/appartement_by_paiement_appartement_id/<int:paiement_appartement_id>')


api.add_resource(PaiementByFiltersResource, '/paiements/filter')

if __name__ == '__main':
    app.run()
