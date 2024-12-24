const db = require('../config/db');

class EmpleadoRepository {
    async obtenerTodos() {
        const [empleados] = await db.query('SELECT * FROM empleados');
        return empleados;
    }

    async crear(empleado) {
        const [resultado] = await db.query('INSERT INTO empleados SET ?', empleado);
        return resultado.insertId;
    }

    async obtenerPorId(id) {
        const [empleados] = await db.query('SELECT * FROM empleados WHERE id = ?', [id]);
        return empleados[0];
    }

    async actualizar(id, datos) {
        await db.query('UPDATE empleados SET ? WHERE id = ?', [datos, id]);
    }

    async eliminar(id) {
        await db.query('DELETE FROM empleados WHERE id = ?', [id]);
    }
}

module.exports = new EmpleadoRepository();
