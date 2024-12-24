import React from "react";

const DetalleProducto = ({ producto }) => {
    if (!producto) {
        return (
        <div className="text-center">
            <h5>Selecciona un producto para ver los detalles</h5>
        </div>
        );
    }

    return (
        <div className="card">
        <img src={producto.imagen_url} alt={producto.nombre} className="card-img-top" />
        <div className="card-body">
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">{producto.descripcion}</p>
            <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
            <p className="card-text"><strong>Stock:</strong> {producto.stock}</p>
            <p className="card-text"><strong>Categoría:</strong> {producto.categoria}</p>
        </div>
        </div>
    );
};

export default DetalleProducto;
