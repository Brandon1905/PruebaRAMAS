import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateAutor from './CreateAutor';
import UpdateAutor from './UpdateAutor';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BrowserRouter  as Router, Route, Link} from 'react-router-dom';

function App() {
  const [user, setAutor] = useState([]);
  const [selectedAutor, setSelectedAutor] = useState(null);

  useEffect(() => {
    Get();
  }, []);

  const Delete = (id) => {
    axios.delete(`https://localhost:44351/api/Autores/${id}`)
      .then(() => {
        setAutor(prevState => prevState.filter(userObj => userObj.au_id !== id));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const Get = () => {
    axios.get("https://localhost:44351/api/Autores")
      .then((response) => setAutor(response.data))
      .catch(error => console.error('Error:', error));
  };

  const handleInsert = () => {
    Get();
  };

  const handleUpdate = () => {
    Get();
    setSelectedAutor(null);
  };

  return (
    <div className="App">
      <h1>Autores</h1>

      <Router>
      <Route path="/CreateAutor" component={CreateAutor} />
      <Route path="/UpdateAutor" component={UpdateAutor} />
    </Router>

    <Link to="/CreateAutor">CreateAutor</Link>

      {selectedAutor ? (
        <UpdateAutor userToUpdate={selectedAutor} onUpdate={handleUpdate} />
      ) : (
        <CreateAutor onInsert={handleInsert} />
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Apellido</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Código Postal</TableCell>
              <TableCell>Contrato</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((userObj) => (
              <TableRow key={userObj.au_id}>
                <TableCell>{userObj.au_lname}</TableCell>
                <TableCell>{userObj.au_fname}</TableCell>
                <TableCell>{userObj.phone}</TableCell>
                <TableCell>{userObj.address}</TableCell>
                <TableCell>{userObj.city}</TableCell>
                <TableCell>{userObj.state}</TableCell>
                <TableCell>{userObj.zip}</TableCell>
                <TableCell>{userObj.contract ? 'Contrato' : 'Sin contrato'}</TableCell>
                <TableCell>
                  <ButtonGroup size="small" variant="outlined" aria-label="Basic button group">
                    <Button onClick={() => setSelectedAutor(userObj)}>Editar</Button>
                    <Button onClick={() => Delete(userObj.au_id)}>Eliminar</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
