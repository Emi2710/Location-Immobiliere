from flask import Flask
from flask_restful import Api

from crud.appartement.routes import AppartementResource, AppartementDetailResource
from crud.locataire.routes import LocataireResource, LocataireDetailResource
from crud.paiement.routes import PaiementResource, PaiementDetailResource


app = Flask(__name__)

api = Api(app)

api.add_resource(AppartementResource, '/appartements')
api.add_resource(AppartementDetailResource, '/appartements/<int:appartement_id>')

api.add_resource(LocataireResource, '/locataires')
api.add_resource(LocataireDetailResource, '/locataires/<int:locataire_id>')

api.add_resource(PaiementResource, '/paiements')
api.add_resource(PaiementDetailResource, '/paiements/<int:paiement_id>')

if __name__ == '__main__':
    app.run()
