require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const reservasRouter = require('./routes/reservas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
const cors = require('cors');
app.use(cors());
// Rutas
app.use('/api/reservas', reservasRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});