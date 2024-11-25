const EmpleadoRepository = require('../repositories/empleado.repository');

class EmpleadoService {
    async obtenerTodos() {
        return await EmpleadoRepository.obtenerTodos();
    }

    async crear(empleado) {
        return await EmpleadoRepository.crear(empleado);
    }

    async obtenerPorId(id) {
        return await EmpleadoRepository.obtenerPorId(id);
    }

    async actualizar(id, datos) {
        return await EmpleadoRepository.actualizar(id, datos);
    }

    async eliminar(id) {
        return await EmpleadoRepository.eliminar(id);
    }
}

module.exports = new EmpleadoService();
