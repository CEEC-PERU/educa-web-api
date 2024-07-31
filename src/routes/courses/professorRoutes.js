const express = require('express');
const router = express.Router();
const professorController = require('../../controllers/courses/professorController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Agregar un nuevo profesor con subida de imagen
router.post('/', upload.fields([
  { name: 'image', maxCount: 1 }
]), professorController.createProfessor);

// Actualizar un profesor con subida de imagen
router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 }
]), professorController.updateProfessor);

// Todos los profesores
router.get('/', professorController.getAllProfessors);

// Obtener todos los niveles
router.get('/levels', professorController.getAllLevels);

// Obtener detalle de un profesor por su ID
router.get('/:id', professorController.getProfessorById);

// Eliminar un profesor
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;
