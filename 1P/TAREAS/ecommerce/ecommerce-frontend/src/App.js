import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/productos')
            .then(response => {
                // Validar datos recibidos
                console.log(response.data);
                setProductos(response.data);
            })
            .catch(error => console.error('Error al cargar productos:', error));
    }, []);

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">E-Commerce</h1>

            {/* Productos */}
            <div className="row">
                {productos.map(producto => (
                    <div className="col-md-4 mb-4" key={producto.id}>
                        <div className="card">
                            <img
                                src={producto.imagen_url}
                                className="card-img-top"
                                alt={producto.nombre}
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <p className="card-text"><strong>${Number(producto.precio).toFixed(2)}</strong></p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => agregarAlCarrito(producto)}
                                >
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carrito */}
            <div className="my-5">
                <h2>Carrito de Compras</h2>
                {carrito.length === 0 ? (
                    <p>No hay productos en el carrito.</p>
                ) : (
                    <ul className="list-group">
                        {carrito.map((producto, index) => (
                            <li className="list-group-item" key={index}>
                                {producto.nombre} - ${Number(producto.precio).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                )}
                <button
                    className="btn btn-danger mt-3"
                    onClick={limpiarCarrito}
                >
                    Limpiar Carrito
                </button>
            </div>
        </div>
    );
}

export default App;
