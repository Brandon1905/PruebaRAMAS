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

}

export default App;
