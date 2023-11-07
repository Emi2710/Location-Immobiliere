import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    apartments: [],
    newApartment: {
      adresse: '',
      ville: '',
      code_postal: '',
      // Include other apartment fields as needed
    },
  };

  handleNewApartmentChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newApartment: {
        ...prevState.newApartment,
        [name]: value,
      },
    }));
  };

  handleAddApartment = () => {
    axios.post('http://localhost:5000/appartements', this.state.newApartment).then(() => {
      this.fetchApartments();
    });
  };

  componentDidMount() {
    this.fetchApartments();
  }

  fetchApartments = () => {
    axios.get('http://localhost:5000/appartements').then((response) => {
      this.setState({ apartments: response.data.appartements });
    });
  };

  render() {
    return (
      <div>
        <h1>Apartment Management</h1>
        <button onClick={this.fetchApartments}>Refresh Apartments</button>
        <ul>
          {this.state.apartments.map((apartment) => (
            <li key={apartment.id}>
              <strong>Apartment ID:</strong> {apartment.id}
              <br />
              <strong>Address:</strong> {apartment.adresse}
              <br />
              <strong>City:</strong> {apartment.ville}
              <br />
              <strong>Postal Code:</strong> {apartment.code_postal}
            </li>
          ))}
        </ul>

        <form>
          <h2>Add a New Apartment</h2>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="adresse"
              value={this.state.newApartment.adresse}
              onChange={this.handleNewApartmentChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="ville"
              value={this.state.newApartment.ville}
              onChange={this.handleNewApartmentChange}
            />
          </div>
          <div>
            <label>Postal Code:</label>
            <input
              type="text"
              name="code_postal"
              value={this.state.newApartment.code_postal}
              onChange={this.handleNewApartmentChange}
            />
          </div>
          {/* Include other input fields for apartment details */}
          <button type="button" onClick={this.handleAddApartment}>Add Apartment</button>
        </form>
      </div>
    );
  }
}

export default App;
