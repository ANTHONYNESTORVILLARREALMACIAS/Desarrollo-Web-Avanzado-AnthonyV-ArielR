import React from "react";
import ReactDOM from "react-dom/client"; // Importa createRoot desde react-dom/client
import App from "./App";
import "./css/style.css"; // Asegúrate de tener el archivo de estilos cargado

// Crea un contenedor raíz usando createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
