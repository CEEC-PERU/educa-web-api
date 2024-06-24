const express = require('express');
const router = express.Router();
const professorController = require('../../controllers/courses/professorController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/uploadImage', upload.single('image'), professorController.uploadProfessorImage);


// Todos los profesores
router.get('/', professorController.getAllProfessors);

// Obtener todos los niveles
router.get('/levels', professorController.getAllLevels);

// Obtener detalle de un profesor por su ID
router.get('/:id', professorController.getProfessorById);

// Agregar un nuevo profesor
router.post('/', upload.single('image'), professorController.createProfessor);

// Actualizar un profesor
router.put('/:id', upload.single('image'), professorController.updateProfessor);

// Eliminar un profesor
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;
