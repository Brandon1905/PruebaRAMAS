import React, { useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './CreateAutor.css';

function CreateAutor({ onInsert }) {
  const initialAutorState = {
    au_id: '',
    au_lname: '',
    au_fname: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contract: false
  };

  const [editedAutor, setEditedAutor] = useState(initialAutorState);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEditedAutor(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleInsert = () => {
    axios.post("https://localhost:44351/api/Autores", editedAutor)
      .then(() => {
        onInsert();
        setEditedAutor(initialAutorState);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleClear = () => {
    setEditedAutor(initialAutorState);
  };

  return (
    <div className="centered-form">
      <div className="user-details-container">
        <h2>Datos del nuevo autor</h2>
        <div>
          <TextField id="filled-basic" label="ID" variant="filled" name="au_id" value={editedAutor.au_id} onChange={handleInputChange} />
        </div>
        <div>
          <TextField id="filled-basic" label="Apellido" variant="filled" name="au_lname" value={editedAutor.au_lname} onChange={handleInputChange} />
        </div>
        <div>
          <TextField id="filled-basic" label="Nombre" variant="filled" name="au_fname" value={editedAutor.au_fname} onChange={handleInputChange} />
        </div>
        <div>
          <TextField id="filled-basic" label="Teléfono" variant="filled" name="phone" value={editedAutor.phone} onChange={handleInputChange} />
        </div>
        <div>
          <TextField id="filled-basic" label="Dirección" variant="filled" name="address" value={editedAutor.address} onChange={handleInputChange} />
        </div>
        <div>
          <TextField id="filled-basic" label="Ciudad" variant="filled" name="city" value={editedAutor.city} onChange={handleInputChange} />
        </div>
        <div>
          <TextField id="filled-basic" label="Estado" variant="filled" name="state" value={editedAutor.state} onChange={handleInputChange} />
        </div>
        <div>
          <TextField id="filled-basic" label="Código Postal" variant="filled" name="zip" value={editedAutor.zip} onChange={handleInputChange} />
        </div>
        <div>
          <label>
            <input type="checkbox" name="contract" checked={editedAutor.contract} onChange={handleInputChange} />
            Contract
          </label>
        </div>
        <Button variant="contained" onClick={handleInsert}>Insertar</Button>
        <Button variant="contained" onClick={handleClear}>Limpiar Campos</Button>
      </div>
    </div>
  );
}

export default CreateAutor;
