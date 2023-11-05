from flask import Flask, request, redirect, url_for, session, jsonify
from flask_restful import Api

from crud.appartement.routes import AppartementResource, AppartementDetailResource, AppartementByLocataireAppartementResource
from crud.locataire.routes import LocataireResource, LocataireDetailResource, LocataireByAppartementResource
from crud.paiement.routes import PaiementResource, PaiementDetailResource, LocataireByPaiementLocataireResource, AppartementByPaiementAppartementResource, PaiementByFiltersResource

app = Flask(__name__)

api = Api(app)

# Secret key for session management
app.secret_key = 'your_secret_key'

# Sample user data (replace with your user database)
users = {
    'user1': 'password1',
    'user2': 'password2',
}

# Authentication route
@app.route('/login', methods=['POST'])
def login():
    if 'username' in session:
        return 'Already logged in as ' + session['username']

    username = request.json.get('username')
    password = request.json.get('password')

    if username in users and users[username] == password:
        session['username'] = username
        return 'Logged in successfully'
    else:
        return 'Login failed', 401

# Logout route
@app.route('/logout', methods=['GET'])
def logout():
    session.pop('username', None)
    return 'Logged out'

# Protected route (requires authentication)
@app.route('/protected', methods=['GET'])
def protected_route():
    if 'username' in session:
        return 'This route is protected and requires authentication. You are logged in as ' + session['username']
    else:
        return 'Not authenticated', 401



# Add your resource routes as before
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

if __name__ == '__main__':
    app.run()
