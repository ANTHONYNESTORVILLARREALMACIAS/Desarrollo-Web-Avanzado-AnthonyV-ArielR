const db = require('../config/db');

class ReservaRepository {
  async obtenerTodas() {
    const [reservas] = await db.query('SELECT * FROM reservas');
    return reservas;
  }

  async crear(reserva) {
    const [resultado] = await db.query('INSERT INTO reservas SET ?', reserva);
    return resultado.insertId;
  }

  async obtenerPorId(id) {
    const [reservas] = await db.query('SELECT * FROM reservas WHERE id = ?', [id]);
    return reservas[0];
  }

  async actualizar(id, datos) {
    await db.query('UPDATE reservas SET ? WHERE id = ?', [datos, id]);
  }

  async eliminar(id) {
    await db.query('DELETE FROM reservas WHERE id = ?', [id]);
  }
}

module.exports = new ReservaRepository();
