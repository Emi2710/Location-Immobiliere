import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver'
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
  MenuItem,
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
      headerName: 'Modifier',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditLocataire(params.row)}
        >
          Modifier
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Supprimer',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => openDeleteConfirmationDialog(params.row)}
        >
          Supprimer
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
          color="success"
          onClick={() => handleGetPaiement(params.row)}
        >
          Paiements
        </Button>
      ),
    },
    {
      field: 'fetchAllPayments',
      headerName: 'Bilan des comptes',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleGetAllPaiement(params.row)}
        >
          Bilan
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


  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  const handleGetAllPaiement = async (locataire) => {
  const locataireId = locataire.id;
  const appartementId = locataire.appartement_id;

  try {
    // Make a request to the /all_paiements endpoint with locataire_id and appartement_id
    const response = await axios.post('http://localhost:5000/all_paiements', {
      locataire_id: locataireId,
      appartement_id: appartementId,
    }, {
      responseType: 'arraybuffer',
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Trigger a file download using the FileSaver library
    saveAs(blob, 'payment_details.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Handle error accordingly, e.g., show an error message to the user
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/paiements/filter', formData, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, 'payment_details.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Handle error accordingly, e.g., show an error message to the user
    }
  };
 
  
  return (
    <div>
      <h1 className='text-3xl text-center underline my-11 mt-24'>Gérer les locataires</h1>

      <Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddLocataireModalOpen(true)}
          sx={{ my: 2 }}
        >
          Ajouter un locataire
        </Button>
      </Paper>

      <Dialog open={isAddLocataireModalOpen} onClose={() => setIsAddLocataireModalOpen(false)}>
        <DialogTitle>Ajouter un nouveau locataire</DialogTitle>
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
            helperText="AAAA-MM-JJ (Ex:2023-01-15)"
            value={newLocataire.date_entree}
            onChange={handleNewLocataireChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Date Sortie"
            name="date_sortie"
            helperText="AAAA-MM-JJ (Ex:2023-12-15)"
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
            select
            label="En Règle"
            name="en_regle"
            value={updateLocataire.en_regle}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, en_regle: event.target.value })
            }
            sx={{ m: 1 }}
          >
            <MenuItem value="true">Oui</MenuItem>
            <MenuItem value="false">Non</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddLocataireModalOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddLocataire} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Modifier un appartement</DialogTitle>
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
            type="number"
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
            helperText="AAAA-MM-JJ (Ex:2023-01-15)"
            value={updateLocataire.date_entree}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, date_entree: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Date Sortie"
            name="date_sortie"
            helperText="AAAA-MM-JJ (Ex:2023-12-15)"
            value={updateLocataire.date_sortie}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, date_sortie: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Solde"
            name="solde"
            type="number"
            value={updateLocataire.solde}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, solde: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            select
            label="En Règle"
            name="en_regle"
            value={updateLocataire.en_regle}
            onChange={(event) =>
              setUpdateLocataire({ ...updateLocataire, en_regle: event.target.value })
            }
            sx={{ m: 1 }}
          >
            <MenuItem value="true">Oui</MenuItem>
            <MenuItem value="false">Non</MenuItem>
          </TextField>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleUpdateLocataire} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sûr de vouloir supprimer ce locataire ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteLocataireConfirmed} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Récuperer les paiements</DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="Locataire ID"
              name="locataire_id"
              value={formData.locataire_id}
              onChange={handleChange}
              sx={{m: 1}}
            />

            <TextField
              label="Appartement ID"
              name="appartement_id"
              value={formData.appartement_id}
              onChange={handleChange}
              sx={{m: 1}}
            />

            <TextField
              label="Start Date"
              name="start_date"
              helperText="AAAA-MM-JJ (Ex:2023-01-15)"
              value={formData.start_date}
              onChange={handleChange}
              sx={{m: 1}}
            />

            <TextField
              label="End date"
              name="end_date"
              helperText="AAAA-MM-JJ (Ex:2023-12-15)"
              value={formData.end_date}
              onChange={handleChange}
              sx={{m: 1}}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Générer PDF</Button>
          </DialogActions>
       
          
        
        
      </form>
      </Dialog>
      
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={locataires} columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default Locataires;
