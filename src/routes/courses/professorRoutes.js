const express = require('express');
const router = express.Router();
const professorController = require('../../controllers/courses/professorController');

// Todos los profesores
router.get('/', professorController.getAllProfessors);


// Obtener todos los niveles
router.get('/levels', professorController.getAllLevels);

// Obtener detalle de un profesor por su ID
router.get('/:id', professorController.getProfessorById);

// Agregar un nuevo profesor
router.post('/', professorController.createProfessor);

// Actualizar un profesor
router.put('/:id', professorController.updateProfessor);

// Eliminar un profesor
router.delete('/:id', professorController.deleteProfessor);


module.exports = router;
