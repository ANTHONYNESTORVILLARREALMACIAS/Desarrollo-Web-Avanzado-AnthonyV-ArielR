const mysql = require("mysql2/promise");

// Conexión a la base de datos
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
});

module.exports = pool;
