const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Cambia según tu configuración
    database: "reservas_db", // Nombre de la base de datos
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

// Obtener todos los asientos
app.get("/api/asientos", (req, res) => {
    const query = "SELECT * FROM asientos";
    db.query(query, (err, results) => {
        if (err) {
        res.status(500).send({ error: "Error al obtener los asientos" });
        return;
        }
        res.json(results);
    });
});

// Reservar un asiento
app.post("/api/asientos/reservar", (req, res) => {
    const { numero, reservadoPor } = req.body;
    const query = "UPDATE asientos SET Disponible = 0, reservadoPor = ? WHERE Numero = ? AND Disponible = 1";
    db.query(query, [reservadoPor, numero], (err, results) => {
        if (err || results.affectedRows === 0) {
        res.status(400).send({ message: "El asiento no pudo ser reservado." });
        return;
        }
        res.send({ message: `Asiento ${numero} reservado con éxito.` });
    });
});

// Liberar un asiento
app.post("/api/asientos/liberar", (req, res) => {
    const { numero } = req.body;
    const query = "UPDATE asientos SET Disponible = 1, reservadoPor = NULL WHERE Numero = ?";
    db.query(query, [numero], (err, results) => {
        if (err || results.affectedRows === 0) {
        res.status(400).send({ message: "El asiento no pudo ser liberado." });
        return;
        }
        res.send({ message: `Asiento ${numero} liberado con éxito.` });
    });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
