import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function App() {
  
  const [asientos, setAsientos] = useState([]);

  //backEnd
  const obtenerAsientos = async() =>{
    try {
      const respuesta = await axios.get('http://localhost:3000/api/asientos');
      setAsientos(respuesta.data);
    } catch (error) {
      console.error('Error al capturar los asientos:',error)
    }
  }

  const reservarAsientos = async(id) =>{
    try {
      await axios.post(`http://localhost:3000/api/asientos/${id}`);
      obtenerAsientos(); // actualiza los asientos
    } catch (error) {
      console.error('Error al capturar los asientos:',error)
    }
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
