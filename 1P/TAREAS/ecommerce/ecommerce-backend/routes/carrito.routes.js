const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Obtener el contenido del carrito
router.get("/", async (req, res) => {
    try {
        const [carrito] = await db.query(`
            SELECT c.id, p.nombre, p.precio, c.cantidad, (p.precio * c.cantidad) AS total
            FROM carrito c
            JOIN productos p ON c.producto_id = p.id
        `);
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
});

// Agregar un producto al carrito
router.post("/", async (req, res) => {
    const { producto_id, cantidad } = req.body;

    try {
        // Verificar si el producto existe
        const [producto] = await db.query("SELECT * FROM productos WHERE id = ?", [producto_id]);
        if (producto.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Verificar si el producto ya está en el carrito
        const [existente] = await db.query("SELECT * FROM carrito WHERE producto_id = ?", [producto_id]);

        if (existente.length > 0) {
            // Actualizar cantidad si ya existe
            await db.query("UPDATE carrito SET cantidad = cantidad + ? WHERE producto_id = ?", [cantidad, producto_id]);
        } else {
            // Insertar nuevo producto en el carrito
            await db.query("INSERT INTO carrito (producto_id, cantidad) VALUES (?, ?)", [producto_id, cantidad]);
        }

        res.json({ message: "Producto añadido al carrito" });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
});

// Actualizar la cantidad de un producto en el carrito
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;

    try {
        await db.query("UPDATE carrito SET cantidad = ? WHERE id = ?", [cantidad, id]);
        res.json({ message: "Cantidad actualizada" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la cantidad" });
    }
});

// Eliminar un producto del carrito
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM carrito WHERE id = ?", [id]);
        res.json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});

module.exports = router;
