const express = require('express');
const router = express.Router();
const { realizarCalculo } = require('./calculo.controller');

// Ruta para manejar el cálculo
router.post("/calcular", (req, res) => {
    try {
        const { operacion, a, b } = req.body;

        // Realizar el cálculo usando el controlador
        const resultado = realizarCalculo({ operacion, a, b });

        // Responder con el resultado
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
