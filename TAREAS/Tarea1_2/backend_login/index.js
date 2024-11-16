const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Crear la aplicación express
const app = express();

// Habilitar CORS antes de las rutas
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' })); // Permitir solo solicitudes desde localhost:3000

// Habilitar el parsing de JSON en el cuerpo de las solicitudes
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);

// Establecer el puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
