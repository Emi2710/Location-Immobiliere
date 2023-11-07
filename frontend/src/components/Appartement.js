import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Button,
  TextField,
  Paper,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions, } from '@mui/material';

const Appartement = () => {
  const [apartments, setApartments] = useState([]);
  const [newApartment, setNewApartment] = useState({
    adresse: '',
    complement_adresse: '',
    ville: '',
    code_postal: '',
    charges_cout: '',
    loyer_cout: '',
    depot_garantie_cout: ''
  });
  const [updateApartment, setUpdateApartment] = useState({
    id: null,
    adresse: '',
    complement_adresse: '',
    ville: '',
    code_postal: '',
    charges_cout: '',
    loyer_cout: '',
    depot_garantie_cout: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog visibility

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState(null);



  useEffect(() => {
    fetchApartments();
  }, []); // Empty dependency array to run once on component mount

  const fetchApartments = () => {
    axios.get('http://localhost:5000/appartements').then((response) => {
      setApartments(response.data.appartements);
    });
  };

  const handleNewApartmentChange = (event) => {
    const { name, value } = event.target;
    setNewApartment({
      ...newApartment,
      [name]: value,
    });
  };

  const handleAddApartment = () => {
    axios.post('http://localhost:5000/appartements', newApartment).then(() => {
      setNewApartment({
        adresse: '',
        complement_adresse: '',
        ville: '',
        code_postal: '',
        charges_cout: '',
        loyer_cout: '',
        depot_garantie_cout: '',
      });
      fetchApartments();
    });
  };

  const handleEditApartment = (apartment) => {
    setUpdateApartment({
      id: apartment.id,
      adresse: apartment.adresse,
      complement_adresse: apartment.complement_adresse,
      ville: apartment.ville,
      code_postal: apartment.code_postal,
      charges_cout: apartment.charges_cout,
      loyer_cout: apartment.loyer_cout,
      depot_garantie_cout: apartment.depot_garantie_cout,
    });
    setIsDialogOpen(true); // Open the dialog
  };

  const handleUpdateApartment = () => {
    const { id, ...updatedApartment } = updateApartment;
    axios.put(`http://localhost:5000/appartements/${id}`, updatedApartment).then(() => {
      setUpdateApartment({
        id: null,
        adresse: '',
        complement_adresse: '',
        ville: '',
        code_postal: '',
        charges_cout: '',
        loyer_cout: '',
        depot_garantie_cout: '',
      });
      fetchApartments();
      setIsDialogOpen(false); // Close the dialog
    });
  };

  const openDeleteConfirmationDialog = (apartment) => {
    setApartmentToDelete(apartment);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteApartmentConfirmed = () => {
  if (apartmentToDelete) {
    axios.delete(`http://localhost:5000/appartements/${apartmentToDelete.id}`).then(() => {
      fetchApartments();
      setIsDeleteDialogOpen(false); // Close the confirmation dialog
    });
  }
};


  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'adresse', headerName: 'Address', flex: 1 },
    { field: 'complement_adresse', headerName: 'Complément adresse', flex: 1 },
    { field: 'ville', headerName: 'City', flex: 1 },
    { field: 'code_postal', headerName: 'Postal Code', width: 150 },
    { field: 'charges_cout', headerName: 'Coût des charges', flex: 1 },
    { field: 'loyer_cout', headerName: 'Coût du loyer', flex: 1 },
    { field: 'depot_garantie_cout', headerName: 'Coût de dépôt de garantie', flex: 1 },
    {
      field: 'update',
      headerName: 'Update',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditApartment(params.row)}
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
      <h1>Apartment Management</h1>
      
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Add a New Apartment</Typography>
            <TextField
              label="Address"
              name="adresse"
              value={newApartment.adresse}
              onChange={handleNewApartmentChange}
            />
            <TextField
              label="Complement adresse"
              name="complement_adresse"
              value={newApartment.complement_adresse}
              onChange={handleNewApartmentChange}
            />
            <TextField
              label="City"
              name="ville"
              value={newApartment.ville}
              onChange={handleNewApartmentChange}
            />
            <TextField
              label="Postal Code"
              name="code_postal"
              value={newApartment.code_postal}
              onChange={handleNewApartmentChange}
            />
            <TextField
              label="Charges coût"
              name="charges_cout"
              value={newApartment.charges_cout}
              onChange={handleNewApartmentChange}
            />
            <TextField
              label="Loyer coût"
              name="loyer_cout"
              value={newApartment.loyer_cout}
              onChange={handleNewApartmentChange}
            />
            <TextField
              label="Dépôt de garantie coût"
              name="depot_garantie_cout"
              value={newApartment.depot_garantie_cout}
              onChange={handleNewApartmentChange}
            />
            <Button variant="contained" onClick={handleAddApartment}>
              Add Apartment
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Apartment</DialogTitle>
        <DialogContent>
          <TextField
            label="Address"
            name="adresse"
            value={updateApartment.adresse}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, adresse: event.target.value })
            }
          />
          <TextField
            label="Complément adresse"
            name="complement_adresse"
            value={updateApartment.complement_adresse}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, complement_adresse: event.target.value })
            }
          />
          <TextField
            label="City"
            name="ville"
            value={updateApartment.ville}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, ville: event.target.value })
            }
          />
          <TextField
            label="Postal Code"
            name="code_postal"
            value={updateApartment.code_postal}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, code_postal: event.target.value })
            }
          />
          <TextField
            label="Charges coût"
            name="charges_cout"
            value={updateApartment.charges_cout}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, charges_cout: event.target.value })
            }
          />
          <TextField
            label="Loyer coût"
            name="loyer_cout"
            value={updateApartment.loyer_cout}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, loyer_cout: event.target.value })
            }
          />
          <TextField
            label="Dépôt garantie coût"
            name="depot_garantie_cout"
            value={updateApartment.depot_garantie_cout}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, depot_garantie_cout: event.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateApartment} color="primary">
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
          <Button onClick={handleDeleteApartmentConfirmed} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>



      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={apartments} columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default Appartement;
