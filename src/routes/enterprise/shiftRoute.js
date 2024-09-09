// routes/shiftRoutes.js
const express = require('express');
const router = express.Router();
const shiftController = require('../../controllers/enterprises/shiftController');

// Obtener todos los turnos
router.get('/', shiftController.getAllShifts);

// Obtener un turno por su ID
router.get('/:id', shiftController.getShiftById);

// Crear un nuevo turno
router.post('/', shiftController.createShift);

// Actualizar un turno por su ID
router.put('/:id', shiftController.updateShift);

// Eliminar un turno por su ID
router.delete('/:id', shiftController.deleteShift);

module.exports = router;
