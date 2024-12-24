import React from "react";

const Carrito = ({ carrito, vaciarCarrito }) => {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    return (
        <div className="card">
        <div className="card-header">
            <h4>Carrito de Compras</h4>
        </div>
        <div className="card-body">
            {carrito.length === 0 ? (
            <p className="text-center">El carrito está vacío</p>
            ) : (
            <ul className="list-group">
                {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                    <h5>{item.nombre}</h5>
                    <p>Cantidad: {item.cantidad}</p>
                    </div>
                    <span>${item.precio * item.cantidad}</span>
                </li>
                ))}
            </ul>
            )}
        </div>
        <div className="card-footer">
            <h5>Total: ${total.toFixed(2)}</h5>
            <button className="btn btn-danger w-100" onClick={vaciarCarrito}>
            Vaciar Carrito
            </button>
        </div>
        </div>
    );
};

export default Carrito;
