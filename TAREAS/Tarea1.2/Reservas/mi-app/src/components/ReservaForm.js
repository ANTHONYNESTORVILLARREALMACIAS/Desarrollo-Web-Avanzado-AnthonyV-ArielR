import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ReservaForm.css'; // Importar los estilos

const API_URL = 'http://localhost:3000/api/reservas'; 

function ReservaForm() {
  const [reserva, setReserva] = useState({
    tipo: '',
    nombre_cliente: '',
    fecha: '',
    hora: '',
    detalles: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`).then((response) => setReserva(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`${API_URL}/${id}`, reserva).then(() => navigate('/'));
    } else {
      axios.post(API_URL, reserva).then(() => navigate('/'));
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="reserva-form">
        <h2>{id ? 'Editar Reserva' : 'Nueva Reserva'}</h2>
        <div className="form-group">
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            placeholder="Tipo de reserva"
            value={reserva.tipo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre_cliente">Nombre Cliente</label>
          <input
            type="text"
            id="nombre_cliente"
            name="nombre_cliente"
            placeholder="Nombre del cliente"
            value={reserva.nombre_cliente}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input type="date" id="fecha" name="fecha" value={reserva.fecha} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hora">Hora</label>
          <input type="time" id="hora" name="hora" value={reserva.hora} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="detalles">Detalles</label>
          <textarea
            id="detalles"
            name="detalles"
            placeholder="Detalles adicionales"
            value={reserva.detalles}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {id ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservaForm;
