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
  Alert, } from '@mui/material';


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

  const [isAddApartmentModalOpen, setIsAddApartmentModalOpen] = useState(false);


  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog visibility

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [apartmentToDelete, setApartmentToDelete] = useState(null);

  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');


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
    // Perform form validation
    if (
      newApartment.adresse === '' ||
      newApartment.ville === '' ||
      newApartment.code_postal === '' ||
      newApartment.charges_cout === '' ||
      newApartment.loyer_cout === '' ||
      newApartment.depot_garantie_cout === ''
    ) {
      // Display an error message
      setErrorMessage('Please fill in all required fields.');
      setSuccessMessage('');

      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);

      return;
    }

    // Make the Axios POST request
    axios
      .post('http://localhost:5000/appartements', newApartment)
      .then(() => {
        // Successful response
        setSuccessMessage('Apartment added successfully!');
        setErrorMessage('');

        setTimeout(() => {
          setSuccessMessage('');
          setErrorMessage('');
        }, 5000);

        setIsAddApartmentModalOpen(false);

        // Clear the form fields after successful submission
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
      })
      .catch((error) => {
        // Error response
        setSuccessMessage('');
        setErrorMessage('Error adding apartment. Please try again.');

        setTimeout(() => {
          setSuccessMessage('');
          setErrorMessage('');
        }, 5000);

        console.error('Error adding apartment:', error);
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
  // Perform form validation
  if (
    updateApartment.adresse === '' ||
    updateApartment.ville === '' ||
    updateApartment.code_postal === '' ||
    updateApartment.charges_cout === '' ||
    updateApartment.loyer_cout === '' ||
    updateApartment.depot_garantie_cout === ''
  ) {
    // Display an error message
    setErrorMessage('Please fill in all required fields.');
    setSuccessMessage('');

      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
    return;
  }

  // Destructure the id from updateApartment
  const { id, ...updatedApartmentData } = updateApartment;

  // Make the Axios PUT request to update the apartment
  axios
    .put(`http://localhost:5000/appartements/${id}`, updatedApartmentData)
    .then(() => {
      // Successful response
      setSuccessMessage('Apartment updated successfully!');
      setErrorMessage('');

      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);

      setIsDialogOpen(false);

      // Clear the form fields after successful update
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

      // Fetch apartments if needed
      fetchApartments();
    })
    .catch((error) => {
      // Error response
      setSuccessMessage('');
      setErrorMessage('Error updating apartment. Please try again.');

      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);

      console.error('Error updating apartment:', error);
    });
};


  const openDeleteConfirmationDialog = (apartment) => {
    setApartmentToDelete(apartment);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteApartmentConfirmed = () => {
  if (apartmentToDelete) {
    // Make the Axios DELETE request to delete the apartment
    axios
      .delete(`http://localhost:5000/appartements/${apartmentToDelete.id}`)
      .then(() => {
        // Successful response
        setSuccessMessage('Apartment deleted successfully!');
        setErrorMessage('');

        setTimeout(() => {
          setSuccessMessage('');
          setErrorMessage('');
        }, 5000);

        setIsDeleteDialogOpen(false); // Close the confirmation dialog

        // Fetch apartments if needed
        // fetchApartments();
      })
      .catch((error) => {
        // Error response
        
        setSuccessMessage('');
        setErrorMessage('Error deleting apartment. Please try again.');

        setTimeout(() => {
          setSuccessMessage('');
          setErrorMessage('');
        }, 5000);

        console.error('Error deleting apartment:', error);
      });
  }
};


  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'adresse', headerName: 'Adresse', flex: 1 },
    { field: 'complement_adresse', headerName: "Complément d'adresse", flex: 1 },
    { field: 'ville', headerName: 'Ville', flex: 1 },
    { field: 'code_postal', headerName: 'Code Postal', width: 150 },
    { field: 'charges_cout', headerName: 'Coût des charges', flex: 1 },
    { field: 'loyer_cout', headerName: 'Coût du loyer', flex: 1 },
    { field: 'depot_garantie_cout', headerName: 'Coût de dépôt de garantie', flex: 1 },
    {
      field: 'update',
      headerName: 'Modifier',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleEditApartment(params.row)}
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
      {successMessage && <Alert severity='success' variant='filled' sx={{position: 'fixed', zIndex: 'tooltip'}} >{successMessage}</Alert>}
      {errorMessage && <Alert severity='error' variant='filled' sx={{position: 'fixed', zIndex: 'tooltip'}} >{errorMessage}</Alert>}
      <h1 className='text-3xl text-center underline my-11'>Gérer les apartments</h1>

      <Paper>
        {/* Button to open the add apartment modal */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddApartmentModalOpen(true)}
          sx={{my: 2}}
        >
          Ajouter un appartement
        </Button>
      </Paper>

      <Dialog open={isAddApartmentModalOpen} onClose={() => setIsAddApartmentModalOpen(false)}>
        

        <DialogTitle>Ajouter un nouvel appartement</DialogTitle>
        <DialogContent>
          <TextField
            label="Adresse"
            name="adresse"
            value={newApartment.adresse}
            onChange={handleNewApartmentChange}
            sx={{m: 1}}
            required
          />
          <TextField
            label="Complément d'adresse"
            name="complement_adresse"
            value={newApartment.complement_adresse}
            onChange={handleNewApartmentChange}
            sx={{m: 1}}
          />
          <TextField
            label="Ville"
            name="ville"
            value={newApartment.ville}
            onChange={handleNewApartmentChange}
            sx={{m: 1}}
            required
          />
          <TextField
            label="Code Postal"
            name="code_postal"
            type="number"
            value={newApartment.code_postal}
            onChange={handleNewApartmentChange}
            sx={{m: 1}}
            required
          />
          <TextField
            label="Charges coût"
            name="charges_cout"
            type="number"
            value={newApartment.charges_cout}
            onChange={handleNewApartmentChange}
            sx={{m: 1}}
            required
          />
          <TextField
            label="Loyer coût"
            name="loyer_cout"
            type="number"
            value={newApartment.loyer_cout}
            onChange={handleNewApartmentChange}
            sx={{m: 1}}
            required
          />
          <TextField
            label="Dépôt garantie coût"
            name="depot_garantie_cout"
            type="number"
            value={newApartment.depot_garantie_cout}
            onChange={handleNewApartmentChange}
            sx={{m: 1}}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddApartmentModalOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddApartment} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
        
        <DialogTitle>Modifier un appartement</DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Adresse"
            name="adresse"
            value={updateApartment.adresse}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, adresse: event.target.value })
            }
            sx={{m: 1}}
          />
          <TextField
            label="Complément d'adresse"
            name="complement_adresse"
            value={updateApartment.complement_adresse}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, complement_adresse: event.target.value })
            }
            sx={{m: 1}}
          />
          <TextField
            required
            label="Ville"
            name="ville"
            value={updateApartment.ville}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, ville: event.target.value })
            }
            sx={{m: 1}}
          />
          <TextField
            required
            label="Code Postal"
            name="code_postal"
            type="number"
            value={updateApartment.code_postal}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, code_postal: event.target.value })
            }
            sx={{m: 1}}
          />
          <TextField
            required
            label="Charges coût"
            name="charges_cout"
            type="number"
            value={updateApartment.charges_cout}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, charges_cout: event.target.value })
            }
            sx={{m: 1}}
          />
          <TextField
            required
            label="Loyer coût"
            name="loyer_cout"
            type="number"
            value={updateApartment.loyer_cout}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, loyer_cout: event.target.value })
            }
            sx={{m: 1}}
          />
          <TextField
            required
            label="Dépôt garantie coût"
            name="depot_garantie_cout"
            type="number"
            value={updateApartment.depot_garantie_cout}
            onChange={(event) =>
              setUpdateApartment({ ...updateApartment, depot_garantie_cout: event.target.value })
            }
            sx={{m: 1}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleUpdateApartment} color="primary">
            Modifer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sûr de vouloir supprimer cet appartement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteApartmentConfirmed} color="primary">
            Supprimer
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
