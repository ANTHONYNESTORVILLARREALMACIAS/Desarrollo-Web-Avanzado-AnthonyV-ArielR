const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS
app.use(cors({
    origin: "http://localhost:3001"
}));

// Middleware para manejar archivos JSON
app.use(express.json());

// Importar las rutas de la calculadora
const calculadoraRoutes = require('./endpoints');

// Usar las rutas de la calculadora
app.use('/api', calculadoraRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de calculadora");
});

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
