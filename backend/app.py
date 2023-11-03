from flask import Flask
from flask_restful import Api
from crud.appartement.routes import AppartementResource, AppartementDetailResource

app = Flask(__name__)
api = Api(app)

api.add_resource(AppartementResource, '/appartements')
api.add_resource(AppartementDetailResource, '/appartements/<int:appartement_id>')

if __name__ == '__main__':
    app.run()
