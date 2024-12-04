import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Puedes agregar más estilos personalizados aquí

const App = () => {
  const [asientos, setAsientos] = useState([]); // Estado inicial vacío para los asientos

  // Obtener los asientos desde el backend
  useEffect(() => {
    const fetchAsientos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/asientos");
        setAsientos(response.data);
      } catch (error) {
        console.error("Error al obtener los asientos:", error.message);
        alert("No se pudieron cargar los asientos.");
      }
    };

    fetchAsientos(); // Llamar a la función al montar el componente
  }, []);

  // Reservar un asiento
  const reservarAsiento = async (numero) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/asientos/reservar",
        { numero, reservadoPor: "Usuario" }
      );
      alert(response.data.message);
      setAsientos((prev) =>
        prev.map((asiento) =>
          asiento.Numero === numero
            ? { ...asiento, Disponible: 0, reservadoPor: "Usuario" }
            : asiento
        )
      );
    } catch (error) {
      console.error("Error al reservar el asiento:", error.message);
      alert("El asiento no pudo ser reservado.");
    }
  };

  // Liberar un asiento
  const liberarAsiento = async (numero) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/asientos/liberar",
        { numero }
      );
      alert(response.data.message);
      setAsientos((prev) =>
        prev.map((asiento) =>
          asiento.Numero === numero
            ? { ...asiento, Disponible: 1, reservadoPor: null }
            : asiento
        )
      );
    } catch (error) {
      console.error("Error al liberar el asiento:", error.message);
      alert("El asiento no pudo ser liberado.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary fw-bold">
        <i className="bi bi-ticket-perforated"></i> Reserva de Asientos
      </h1>
      <p className="text-center text-secondary mb-4">
        Selecciona un asiento disponible para reservar o libera uno reservado.
      </p>
      <div className="row">
        {asientos.map((asiento) => (
          <div key={asiento.Numero} className="col-md-4 col-lg-3 mb-4">
            <div
              className={`card shadow-sm ${
                asiento.Disponible ? "border-success" : "border-danger"
              }`}
            >
              <div className="card-body text-center">
                <h5
                  className={`card-title fw-bold ${
                    asiento.Disponible ? "text-success" : "text-danger"
                  }`}
                >
                  {asiento.Disponible
                    ? `Asiento ${asiento.Numero}`
                    : `Reservado`}
                </h5>
                <p className="card-text">
                  {asiento.Disponible
                    ? "Disponible para reservar"
                    : `Reservado por: ${asiento.reservadoPor || "N/A"}`}
                </p>
                <button
                  className={`btn ${
                    asiento.Disponible ? "btn-outline-success" : "btn-outline-danger"
                  }`}
                  onClick={() =>
                    asiento.Disponible
                      ? reservarAsiento(asiento.Numero)
                      : liberarAsiento(asiento.Numero)
                  }
                >
                  {asiento.Disponible ? (
                    <>
                      <i className="bi bi-check-circle"></i> Reservar
                    </>
                  ) : (
                    <>
                      <i className="bi bi-x-circle"></i> Liberar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
