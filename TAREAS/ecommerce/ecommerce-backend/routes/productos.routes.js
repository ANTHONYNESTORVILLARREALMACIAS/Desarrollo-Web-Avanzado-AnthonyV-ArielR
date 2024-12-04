const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const [productos] = await db.query("SELECT * FROM productos");
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Obtener detalles de un producto por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [producto] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);
        if (producto.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

module.exports = router;
