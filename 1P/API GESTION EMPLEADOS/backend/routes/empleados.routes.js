const express = require('express');
const EmpleadoController = require('../controllers/empleados.controller');
const router = express.Router();

router.get('/', EmpleadoController.obtenerTodos);
router.post('/', EmpleadoController.crear);
router.get('/:id', EmpleadoController.obtenerPorId);
router.put('/:id', EmpleadoController.actualizar);
router.delete('/:id', EmpleadoController.eliminar);

module.exports = router;
