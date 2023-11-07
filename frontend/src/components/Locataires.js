import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const Locataires = () => {
  const [locataires, setLocataires] = useState([]);
  const [newLocataire, setNewLocataire] = useState({
    nom: '',
    appartement_id: '',
    etat_lieux_entree: '',
    etat_lieux_sortie: '',
    date_entree: '',
    date_sortie: '',
    solde: '',
    en_regle: '',
  });

  const [isAddLocataireModalOpen, setIsAddLocataireModalOpen] = useState(false);

  useEffect(() => {
    fetchLocataires();
  }, []);

  const fetchLocataires = () => {
    axios.get('http://localhost:5000/locataires').then((response) => {
      setLocataires(response.data); // Assuming locataires is an array in the response
    });
  };

  const handleNewLocataireChange = (event) => {
    const { name, value } = event.target;
    setNewLocataire({
      ...newLocataire,
      [name]: value,
    });
  };

  const handleAddLocataire = () => {
    axios.post('http://localhost:5000/locataires', newLocataire).then(() => {
      setNewLocataire({
        nom: '',
        appartement_id: '',
        etat_lieux_entree: '',
        etat_lieux_sortie: '',
        date_entree: '',
        date_sortie: '',
        solde: '',
        en_regle: '',
      });
      fetchLocataires();
      setIsAddLocataireModalOpen(false);
    });
  };

  const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'nom', headerName: 'Nom', flex: 1 },
  { field: 'appartement_id', headerName: 'Appartement ID', width: 150 },
  { field: 'etat_lieux_entree', headerName: 'État Lieux Entrée', flex: 1 },
  { field: 'etat_lieux_sortie', headerName: 'État Lieux Sortie', flex: 1 },
  { field: 'date_entree', headerName: 'Date Entrée', flex: 1 },
  { field: 'date_sortie', headerName: 'Date Sortie', flex: 1 },
  { field: 'solde', headerName: 'Solde', flex: 1 },
  { field: 'en_regle', headerName: 'En Règle', flex: 1 },
  
  
];


  return (
    <div>
      <h1 className='text-3xl text-center underline my-11 mt-24'>Locataire Management</h1>

      <Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddLocataireModalOpen(true)}
          sx={{ my: 2 }}
        >
          Add Locataire
        </Button>
      </Paper>

      <Dialog open={isAddLocataireModalOpen} onClose={() => setIsAddLocataireModalOpen(false)}>
        <DialogTitle>Add New Locataire</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            name="nom"
            value={newLocataire.nom}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Appartement ID"
            name="appartement_id"
            value={newLocataire.appartement_id}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="État Lieux Entrée"
            name="etat_lieux_entree"
            value={newLocataire.etat_lieux_entree}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="État Lieux Sortie"
            name="etat_lieux_sortie"
            value={newLocataire.etat_lieux_sortie}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Date Entrée"
            name="date_entree"
            value={newLocataire.date_entree}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Date Sortie"
            name="date_sortie"
            value={newLocataire.date_sortie}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Solde"
            name="solde"
            value={newLocataire.solde}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="En Règle"
            name="en_regle"
            value={newLocataire.en_regle}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddLocataireModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddLocataire} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={locataires} columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default Locataires;
