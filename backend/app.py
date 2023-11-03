from flask import Flask
from flask_restful import Api
from datetime import date
import json

from crud.appartement.routes import AppartementResource, AppartementDetailResource
from crud.locataire.routes import LocataireResource, LocataireDetailResource


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)
    

app = Flask(__name__)
app.json_encoder = CustomJSONEncoder

api = Api(app)

api.add_resource(AppartementResource, '/appartements')
api.add_resource(AppartementDetailResource, '/appartements/<int:appartement_id>')

api.add_resource(LocataireResource, '/locataires')
api.add_resource(LocataireDetailResource, '/locataires/<int:locataire_id>')

if __name__ == '__main__':
    app.run()
