require('dotenv').config();
const express = require('express');
const empleadosRouter = require('./routes/empleados.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/api/empleados', empleadosRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
