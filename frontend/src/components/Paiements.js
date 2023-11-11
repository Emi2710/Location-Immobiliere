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

const Paiements = () => {
  const [paiements, setPaiements] = useState([]);
  const [newPaiement, setNewPaiement] = useState({
    locataire_id: '',
    appartement_id: '',
    date_paiement: '',
    origine_paiement: '',
    cout: '',
  });

  const [updatePaiement, setUpdatePaiement] = useState({
    id: null,
    locataire_id: '',
    appartement_id: '',
    date_paiement: '',
    origine_paiement: '',
    cout: '',
  });

  const [isAddPaiementModalOpen, setIsAddPaiementModalOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog visibility

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [paiementToDelete, setPaiementToDelete] = useState(null);


  useEffect(() => {
    fetchPaiements();
  }, []);

  const fetchPaiements = () => {
    axios.get('http://localhost:5000/paiements').then((response) => {
      setPaiements(response.data); 
    });
  };

  const handleNewPaiementChange = (event) => {
    const { name, value } = event.target;
    setNewPaiement({
      ...newPaiement,
      [name]: value,
    });
  };

  const handleAddPaiement = () => {
    axios.post('http://localhost:5000/paiements', newPaiement).then(() => {
      setNewPaiement({
        locataire_id: '',
        appartement_id: '',
        date_paiement: '',
        origine_paiement: '',
        cout: '',
      });
      fetchPaiements();
      setIsAddPaiementModalOpen(false);
    });
  };

  const handleEditPaiement = (paiement) => {
    setUpdatePaiement({
      id: paiement.id,
      locataire_id: paiement.locataire_id,
      appartement_id: paiement.appartement_id,
      date_paiement: paiement.date_paiement,
      origine_paiement: paiement.origine_paiement,
      cout: paiement.cout,
    });
    setIsDialogOpen(true); // Open the dialog
  };

  const handleUpdatePaiement = () => {
    const { id, ...updatedPaiement } = updatePaiement;
    axios.put(`http://localhost:5000/paiements/${id}`, updatedPaiement).then(() => {
      setUpdatePaiement({
        id: null,
        locataire_id: '',
        appartement_id: '',
        date_paiement: '',
        origine_paiement: '',
        cout: '',
      });
      fetchPaiements();
      setIsDialogOpen(false); // Close the dialog
    });
  };

  const openDeleteConfirmationDialog = (paiement) => {
    setPaiementToDelete(paiement);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePaiementConfirmed = () => {
  if (paiementToDelete) {
    axios.delete(`http://localhost:5000/paiements/${paiementToDelete.id}`).then(() => {
      fetchPaiements();
      setIsDeleteDialogOpen(false); // Close the confirmation dialog
    });
  }
};

  const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'locataire_id', headerName: 'Locataire ID', flex: 1 },
  { field: 'appartement_id', headerName: 'Appartement ID', width: 150 },
  { field: 'date_paiement', headerName: 'Date Paiement', flex: 1 },
  { field: 'origine_paiement', headerName: 'Origine Paiement', flex: 1 },
  { field: 'cout', headerName: 'Prix payé', flex: 1 },
      {
      field: 'update',
      headerName: 'Modifier',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditPaiement(params.row)}
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
    }
  
  
];


  return (
    <div>
      <h1 className='text-3xl text-center underline my-11 mt-24'>Gérer les paiements</h1>

      <Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddPaiementModalOpen(true)}
          sx={{ my: 2 }}
        >
          Ajouter un paiement
        </Button>
      </Paper>

      <Dialog open={isAddPaiementModalOpen} onClose={() => setIsAddPaiementModalOpen(false)}>
        <DialogTitle>Ajouter un nouveau paiement</DialogTitle>
        <DialogContent>
          <TextField
            label="Locataire ID"
            name="locataire_id"
            type="number"
            value={newPaiement.locataire_id}
            onChange={handleNewPaiementChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Appartement ID"
            name="appartement_id"
            type="number"
            value={newPaiement.appartement_id}
            onChange={handleNewPaiementChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Date Paiement"
            name="date_paiement"
            helperText="AAAA-MM-JJ (Ex:2023-01-15)"
            value={newPaiement.date_paiement}
            onChange={handleNewPaiementChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Origine Paiement"
            name="origine_paiement"
            value={newPaiement.origine_paiement}
            onChange={handleNewPaiementChange}
            sx={{ m: 1 }}
          />
          <TextField
            label="Prix payé"
            name="cout"
            type="number"
            value={newPaiement.cout}
            onChange={handleNewPaiementChange}
            sx={{ m: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddPaiementModalOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddPaiement} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Modifier un paiement</DialogTitle>
        <DialogContent>
          <TextField
            label="Locataire ID"
            name="locataire_id"
            value={updatePaiement.locataire_id}
            onChange={(event) =>
              setUpdatePaiement({ ...updatePaiement, locataire_id: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Appartement ID"
            name="appartement_id"
            value={updatePaiement.appartement_id}
            onChange={(event) =>
              setUpdatePaiement({ ...updatePaiement, appartement_id: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Date Paiement"
            name="date_paiement"
            value={updatePaiement.date_paiement}
            onChange={(event) =>
              setUpdatePaiement({ ...updatePaiement, date_paiement: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Origine Paiement"
            name="origine_paiement"
            value={updatePaiement.origine_paiement}
            onChange={(event) =>
              setUpdatePaiement({ ...updatePaiement, origine_paiement: event.target.value })
            }
            sx={{ m: 1 }}
          />
          <TextField
            label="Prix payé"
            name="cout"
            value={updatePaiement.cout}
            onChange={(event) =>
              setUpdatePaiement({ ...updatePaiement, cout: event.target.value })
            }
            sx={{ m: 1 }}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleUpdatePaiement} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sur de vouloir supprimer ce paiement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeletePaiementConfirmed} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={paiements} columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default Paiements;
