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
  Modal,
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

  const [updateLocataire, setUpdateLocataire] = useState({
    id: null,
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

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog visibility

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [locataireToDelete, setLocataireToDelete] = useState(null);


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

  const handleEditLocataire = (locataire) => {
    setUpdateLocataire({
      id: locataire.id,
      nom: locataire.nom,
      appartement_id: locataire.appartement_id,
      etat_lieux_entree: locataire.etat_lieux_entree,
      etat_lieux_sortie: locataire.etat_lieux_sortie,
      date_entree: locataire.date_entree,
      date_sortie: locataire.date_sortie,
      solde: locataire.solde,
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
        appartement_id: '',
        etat_lieux_entree: '',
        etat_lieux_sortie: '',
        date_entree: '',
        date_sortie: '',
        solde: '',
        en_regle: '',
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
  { field: 'nom', headerName: 'Nom', flex: 1 },
  { field: 'appartement_id', headerName: 'Appartement ID', width: 150 },
  { field: 'etat_lieux_entree', headerName: 'État Lieux Entrée', flex: 1 },
  { field: 'etat_lieux_sortie', headerName: 'État Lieux Sortie', flex: 1 },
  { field: 'date_entree', headerName: 'Date Entrée', flex: 1 },
  { field: 'date_sortie', headerName: 'Date Sortie', flex: 1 },
  { field: 'solde', headerName: 'Solde', flex: 1 },
  { field: 'en_regle', headerName: 'En Règle', flex: 1 },
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
    },
    {
      field: 'fetchPayments',
      headerName: 'Paiements',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleGetPaiement(params.row)}
        >
          Paiements
        </Button>
      ),
    },
];

const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    locataire_id: '',
    appartement_id: '',
    start_date: '',
    end_date: '',
  });
  const [payments, setPayments] = useState([]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Adjust the URL based on your Flask API endpoint
    axios.post('http://localhost:5000/paiements/filter', formData)
      .then((response) => {
        setPayments(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching payments:', error);
      });
  };

  const handleGetPaiement = (locataire) => {
    setFormData({
      locataire_id: locataire.id,
      appartement_id: locataire.appartement_id,
      start_date: '',
      end_date: '',
      
    });
    handleOpen(); // Open the dialog
  };
 

  
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

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Apartment</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            name="nom"
            value={updateLocataire.nom}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, nom: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Appartement ID"
            name="appartement_id"
            value={updateLocataire.appartement_id}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, appartement_id: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="État Lieux Entrée"
            name="etat_lieux_entree"
            value={updateLocataire.etat_lieux_entree}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, etat_lieux_entree: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="État Lieux Sortie"
            name="etat_lieux_sortie"
            value={updateLocataire.etat_lieux_sortie}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, etat_lieux_sortie: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Date Entrée"
            name="date_entree"
            value={updateLocataire.date_entree}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, date_entree: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Date Sortie"
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
            label="En Règle"
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
            Are you sure you want to delete this locataire ?
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Récuperer les paiements</DialogTitle>
        <DialogContent>
          <TextField
            label="Locataire ID"
            name="locataire_id"
            value={formData.locataire_id}
            onChange={handleChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Appartement ID"
            name="appartement_id"
            value={formData.appartement_id}
            onChange={handleChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Start Date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="End Date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            sx={{ m: 1 }}
          />
          <DialogActions>
            <Button onClick={handleSubmit}>Envoyer</Button>
          </DialogActions>

          <DialogTitle>Paiements:</DialogTitle>
          <ul>
            {payments.map((payment) => (
              <li key={payment.id}>
                {`ID: ${payment.id}, Locataire ID: ${payment.locataire_id}, Appartement ID: ${payment.appartement_id}, Date: ${payment.date_paiement}, Cost: ${payment.cout}`}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
      
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={locataires} columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default Locataires;
