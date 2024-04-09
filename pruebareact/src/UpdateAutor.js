import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './UpdateAutor.css';

function UpdateAutor({ userToUpdate, onUpdate }) {
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

  useEffect(() => {
    setEditedAutor(userToUpdate);
  }, [userToUpdate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEditedAutor(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleUpdate = () => {
    axios.put(`https://localhost:44351/api/Autores/${editedAutor.au_id}`, editedAutor)
      .then(() => {
        onUpdate();
      })
      .catch(error => console.error('Error:', error));
  };

  const handleClear = () => {
    setEditedAutor(initialAutorState);
  };

  return (
    <div className="centered-form">
      <form>
        <h2>Editar autor</h2>
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
          <input type="checkbox" name="contract" checked={editedAutor.contract} onChange={handleInputChange} />
          <label htmlFor="contract">Contrato</label>
        </div>
        
        <Button variant="contained" onClick={handleUpdate}>Guardar Cambios</Button>
        <Button variant="contained" onClick={handleClear}>Limpiar Campos</Button>
      </form>
    </div>
  );
}

export default UpdateAutor;
