import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operacion, setOperacion] = useState("suma");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleCalcular = async () => {
    try {
      setError(null);
      const response = await fetch("http://localhost:3000/api/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operacion, a, b }),
      });

      const data = await response.json();
      if (response.ok) {
        setResultado(data.resultado);
      } else {
        setError(data.error);
        setResultado(null);
      }
    } catch (err) {
      setError("Hubo un problema al conectar con el servidor.");
      setResultado(null);
    }
  };

  const handleLimpiar = () => {
    setA("");
    setB("");
    setOperacion("suma");
    setResultado(null);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header text-center bg-primary text-white">
          <h2>Calculadora VILLA</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="numero1" className="form-label">
                Primer Número:
              </label>
              <input
                type="number"
                id="numero1"
                className="form-control"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numero2" className="form-label">
                Segundo Número:
              </label>
              <input
                type="number"
                id="numero2"
                className="form-control"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="operacion" className="form-label">
                Operación:
              </label>
              <select
                id="operacion"
                className="form-select"
                value={operacion}
                onChange={(e) => setOperacion(e.target.value)}
              >
                <option value="suma">Suma</option>
                <option value="resta">Resta</option>
                <option value="multiplicacion">Multiplicación</option>
                <option value="division">División</option>
              </select>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-success w-45 me-2"
                onClick={handleCalcular}
              >
                Calcular
              </button>
              <button
                type="button"
                className="btn btn-secondary w-45"
                onClick={handleLimpiar}
              >
                Limpiar
              </button>
            </div>
          </form>
          <div className="mt-4">
            {resultado !== null && (
              <div className="alert alert-success text-center">
                Resultado: <strong>{resultado}</strong>
              </div>
            )}
            {error && (
              <div className="alert alert-danger text-center">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        </div>
        <div className="card-footer text-center text-muted">
          &copy; 2024 - Calculadora con React y Bootstrap
        </div>
      </div>
    </div>
  );
};

export default App;
