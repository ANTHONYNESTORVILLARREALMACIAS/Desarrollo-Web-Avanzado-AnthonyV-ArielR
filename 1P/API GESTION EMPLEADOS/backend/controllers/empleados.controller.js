const EmpleadoService = require('../services/empleado.services');

class EmpleadoController {
    async obtenerTodos(req, res) {
        const empleados = await EmpleadoService.obtenerTodos();
        res.json(empleados);
    }

    async crear(req, res) {
        const nuevoEmpleado = req.body;
        const id = await EmpleadoService.crear(nuevoEmpleado);
        res.status(201).json({ id, ...nuevoEmpleado });
    }

    async obtenerPorId(req, res) {
        const empleado = await EmpleadoService.obtenerPorId(req.params.id);
        if (!empleado) {
        return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }
        res.json(empleado);
    }

    async actualizar(req, res) {
        await EmpleadoService.actualizar(req.params.id, req.body);
        res.json({ mensaje: 'Empleado actualizado' });
    }

    async eliminar(req, res) {
        await EmpleadoService.eliminar(req.params.id);
        res.json({ mensaje: 'Empleado eliminado' });
    }
}

module.exports = new EmpleadoController();
