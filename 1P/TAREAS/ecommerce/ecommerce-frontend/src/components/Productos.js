import React, { useState, useEffect } from "react";
import axios from "axios";

const Productos = ({ agregarAlCarrito }) => {
    const [productos, setProductos] = useState([]);

    // Cargar productos
    useEffect(() => {
        const obtenerProductos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/productos");
            setProductos(response.data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
        };
        obtenerProductos();
    }, []);

    return (
        <div className="row">
        {productos.map((producto) => (
            <div className="col-md-4 mb-3" key={producto.id}>
            <div className="card">
                <img src={producto.imagen_url} alt={producto.nombre} className="card-img-top" />
                <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">Precio: ${producto.precio}</p>
                <p className="card-text">Stock: {producto.stock}</p>
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
    );
};

export default Productos;
