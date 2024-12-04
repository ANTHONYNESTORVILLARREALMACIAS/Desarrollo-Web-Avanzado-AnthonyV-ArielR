const express = require("express");
const cors = require("cors");
const app = express();
const productosRoutes = require("./routes/productos.routes");
const carritoRoutes = require("./routes/carrito.routes");

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
