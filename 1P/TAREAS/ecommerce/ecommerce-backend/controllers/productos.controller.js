const db = require("../models/db");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
    const [productos] = await db.query("SELECT * FROM productos");
    res.json(productos);
    } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
    }
};

// Obtener detalles de un producto
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
    const [producto] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);
    if (producto.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto[0]);
    } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
};
