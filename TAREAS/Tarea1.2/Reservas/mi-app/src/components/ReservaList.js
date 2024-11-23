import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';//permite crear enlaces de navegacion de la interfaza
import axios from 'axios';//Para hacer solicitudes HTTP la backend
import '../css/ReservaList.css';

const API_URL = 'http://localhost:3000/api/reservas';//define el URL para interactuar con el API reservas

function ReservaList() {
    const [reservas, setReservas] = useState([]); // Estado para almacenar reservas

    // Obtener reservas al cargar el componente
    useEffect(() => {
        axios.get(API_URL)
            .then((response) => setReservas(response.data))
            .catch((error) => console.error('Error al obtener las reservas:', error));
    }, []);

    // Eliminar reserva por ID
    const deleteReserva = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                // Actualizar el estado eliminando la reserva
                setReservas(reservas.filter((reserva) => reserva.id !== id));
            })
            .catch((error) => console.error('Error al eliminar la reserva:', error));
    };

    // Renderizar el componente
    return (
        <div className="reserva-list-container">
        <h2>Lista de Reservas</h2>
        <Link to="/nueva" className="create-btn">
            Crear nueva reserva
        </Link>
        <table className="reserva-table">
            <thead>
            <tr>
                <th>Nombre Cliente</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {reservas.map((reserva) => (
                <tr key={reserva.id}>
                <td>{reserva.nombre_cliente}</td>
                <td>{reserva.tipo}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora}</td>
                <td>
                    <Link to={`/editar/${reserva.id}`} className="edit-btn">
                    Editar
                    </Link>
                    <button onClick={() => deleteReserva(reserva.id)} className="delete-btn">
                    Eliminar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default ReservaList;