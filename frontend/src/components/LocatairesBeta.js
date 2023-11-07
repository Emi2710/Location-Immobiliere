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
  DialogActions, } from '@mui/material';

const LocatairesBeta = () => {
  const [locataires, setLocataires] = useState([]);
  const [newLocataire, setNewLocataire] = useState({
    nom: '',
    appartement_id: null,
    etat_lieux_entree: '',
    etat_lieux_sortie: '',
    date_entree: null,
    date_sortie: null,
    solde: null,
    en_regle: null,
    });

  const [updateLocataire, setUpdateLocataire] = useState({
    id: null,
    nom: '',
    appartement_id: null,
    etat_lieux_entree: '',
    etat_lieux_sortie: '',
    date_entree: null,
    date_sortie: null,
    solde: null,
    en_regle: null,
    
    });
  

  const [isAddLocataireModalOpen, setIsAddLocataireModalOpen] = useState(false);


  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog visibility

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [locataireToDelete, setLocataireToDelete] = useState(null);



  useEffect(() => {
    fetchLocataires();
  }, []); // Empty dependency array to run once on component mount

  const fetchLocataires = () => {
    axios.get('http://localhost:5000/locataires').then((response) => {
      setLocataires(response.data.locataires);
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
        appartement_id: null,
        etat_lieux_entree: '',
        etat_lieux_sortie: '',
        date_entree: null,
        date_sortie: null,
        solde: null,
        en_regle: null,
      });
      fetchLocataires();
      setIsAddLocataireModalOpen(false);
    });
  };

  const handleEditLocataire = (locataire) => {
    setUpdateLocataire({
        id: locataire.id,
        nom: locataire.adresse,
        appartement_id: locataire.complement_adresse,
        etat_lieux_entree: locataire.ville,
        etat_lieux_sortie: locataire.code_postal,
        date_entree: locataire.charges_cout,
        date_sortie: locataire.loyer_cout,
        solde: locataire.depot_garantie_cout,
        en_regle: locataire.en_regle,
    });
    setIsDialogOpen(true); // Open the dialog
  };

  const handleUpdateLocataire = () => {
    const { id, ...updatedLocataire } = updateLocataire;
    axios.put(`http://localhost:5000/locataires/${id}`, updatedLocataire).then(() => {
      setUpdateLocataire({
        id: null,
        nom: '',
        appartement_id: null,
        etat_lieux_entree: '',
        etat_lieux_sortie: '',
        date_entree: null,
        date_sortie: null,
        solde: null,
        en_regle: false,
      });
      fetchLocataires();
      setIsDialogOpen(false); // Close the dialog
    });
  };

  const openDeleteConfirmationDialog = (locataire) => {
    setLocataireToDelete(locataire);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteLocataireConfirmed = () => {
  if (locataireToDelete) {
    axios.delete(`http://localhost:5000/locataires/${locataireToDelete.id}`).then(() => {
      fetchLocataires();
      setIsDeleteDialogOpen(false); // Close the confirmation dialog
    });
  }
};


  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nom', headerName: 'Name', flex: 1 },
    { field: 'appartement_id', headerName: 'Apartment ID', flex: 1 },
    { field: 'etat_lieux_entree', headerName: 'Entry Condition', flex: 1 },
    { field: 'etat_lieux_sortie', headerName: 'Exit Condition', flex: 1 },
    { field: 'date_entree', headerName: 'Entry Date', flex: 1 },
    { field: 'date_sortie', headerName: 'Exit Date', flex: 1 },
    { field: 'solde', headerName: 'Balance', flex: 1 },
    { field: 'en_regle', headerName: 'In Compliance', flex: 1 },
    {
      field: 'update',
      headerName: 'Update',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditLocataire(params.row)}
        >
          Update
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => openDeleteConfirmationDialog(params.row)}
        >
          Delete
        </Button>
      ),
    }

  ];

  return (
    <div>
    <h1 className='text-3xl text-center underline my-11'>Locataires Management</h1>

      <Paper>
        {/* Button to open the add apartment modal */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddLocataireModalOpen(true)}
          sx={{my: 2}}
        >
          Add Locataire
        </Button>
      </Paper>

      <Dialog open={isAddLocataireModalOpen} onClose={() => setIsAddLocataireModalOpen(false)}>
        <DialogTitle>Add New Locataire</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="nom"
            value={newLocataire.nom}
            onChange={handleNewLocataireChange}
            sx={{m: 1}}
          />
          <TextField
            label="Appartement"
            name="appartement_id"
            value={newLocataire.appartement_id}
            onChange={handleNewLocataireChange}
            sx={{m: 1}}
          />
          <TextField
            label="Etat des lieux entrée"
            name="etat_lieux_entree"
            value={newLocataire.etat_lieux_entree}
            onChange={handleNewLocataireChange}
            sx={{m: 1}}
          />
          <TextField
            label="Etat des lieux sortie"
            name="etat_lieux_sortie"
            value={newLocataire.etat_lieux_sortie}
            onChange={handleNewLocataireChange}
            sx={{m: 1}}
          />
          <TextField
            label="Date entrée"
            name="date_entree"
            value={newLocataire.date_entree}
            onChange={handleNewLocataireChange}
            sx={{m: 1}}
          />
          <TextField
            label="Date sortie"
            name="date_sortie"
            value={newLocataire.date_sortie}
            onChange={handleNewLocataireChange}
            sx={{m: 1}}
          />
          <TextField
            label="Solde"
            name="solde"
            value={newLocataire.solde}
            onChange={handleNewLocataireChange}
            sx={{m: 1}}
          />
          <TextField
            label="En règle"
            name="en_regle"
            value={newLocataire.en_regle}
            onChange={handleNewLocataireChange}
            sx={{m: 1}}
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


      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Apartment</DialogTitle>
        <DialogContent>
            <TextField
            label="Name"
            name="nom"
            value={updateLocataire.nom}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, nom: event.target.value })
            }
            sx={{ m: 1 }}
            />
            <TextField
            label="Appartement"
            name="appartement_id"
            value={updateLocataire.appartement_id}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, appartement_id: event.target.value })
            }
            sx={{ m: 1 }}
            />
            <TextField
            label="Etat des lieux entrée"
            name="etat_lieux_entree"
            value={updateLocataire.etat_lieux_entree}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, etat_lieux_entree: event.target.value })
            }
            sx={{ m: 1 }}
            />
            <TextField
            label="Etat des lieux sortie"
            name="etat_lieux_sortie"
            value={updateLocataire.etat_lieux_sortie}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, etat_lieux_sortie: event.target.value })
            }
            sx={{ m: 1 }}
            />
            <TextField
            label="Date entrée"
            name="date_entree"
            value={updateLocataire.date_entree}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, date_entree: event.target.value })
            }
            sx={{ m: 1 }}
            />
            <TextField
            label="Date sortie"
            name="date_sortie"
            value={updateLocataire.date_sortie}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, date_sortie: event.target.value })
            }
            sx={{ m: 1 }}
            />
            <TextField
            label="Solde"
            name="solde"
            value={updateLocataire.solde}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, solde: event.target.value })
            }
            sx={{ m: 1 }}
            />
            <TextField
            label="En règle"
            name="en_regle"
            value={updateLocataire.en_regle}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, en_regle: event.target.value })
            }
            sx={{ m: 1 }}
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateLocataire} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this apartment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteLocataireConfirmed} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>



      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={locataires} columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default LocatairesBeta;
