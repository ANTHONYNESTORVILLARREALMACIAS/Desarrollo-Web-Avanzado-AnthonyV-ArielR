import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
const [asientos, setAsientos] = useState([
    { numero: 1, disponible: 1, reservadoPor: null },
    { numero: 2, disponible: 0, reservadoPor: "Pedro" },
    { numero: 3, disponible: 1, reservadoPor: null },
    { numero: 4, disponible: 0, reservadoPor: "Marco" },
]);

// Actualizar estado del asiento
const actualizarAsiento = (numero, disponible, reservadoPor) => {
    setAsientos((prev) =>
    prev.map((asiento) =>
        asiento.numero === numero
        ? { ...asiento, disponible, reservadoPor }
        : asiento
    )
    );
};

// Reservar asiento
const reservarAsiento = (numero) => {
    actualizarAsiento(numero, 0, "Usuario");
    alert(`Asiento ${numero} reservado`);
};

// Liberar asiento
const liberarAsiento = (numero) => {
    actualizarAsiento(numero, 1, null);
    alert(`Asiento ${numero} liberado`);
};

return (
    <div className="container mt-4">
        <h1 className="text-center mb-4">Reserva de Asientos</h1>
        <div className="row">
            {asientos.map((asiento) => (
            <div key={asiento.numero} className="col-md-3 col-sm-6 mb-3">
                <button
                className={`btn btn-block ${
                    asiento.disponible ? "btn-success" : "btn-danger"
                }`}
                onClick={() =>
                    asiento.disponible
                    ? reservarAsiento(asiento.numero)
                    : liberarAsiento(asiento.numero)
                }
                >
                {asiento.disponible
                    ? `Asiento ${asiento.numero}: Disponible`
                    : `Asiento ${asiento.numero}: Reservado (${asiento.reservadoPor})`}
                </button>
            </div>
            ))}
        </div>
    </div>
    );
};

export default App;