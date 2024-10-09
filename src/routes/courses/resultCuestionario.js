const express = require('express');
const router = express.Router();
const ResultCuestionarioController = require('../../controllers/courses/resultCuestionarioController');

// Crear un nuevo resultado
router.post('/', ResultCuestionarioController.create);

// Obtener todos los resultados
router.get('/', ResultCuestionarioController.findAll);

// Obtener un resultado por ID
router.get('/:id', ResultCuestionarioController.findById);

// Buscar resultados por course_id, user_id, y cuestype_id
router.get('/search/:course_id/:user_id/:cuestype_id', ResultCuestionarioController.findByCourseUserCuestype);

// Actualizar un resultado
router.put('/:id', ResultCuestionarioController.update);

// Eliminar un resultado
router.delete('/:id', ResultCuestionarioController.delete);

module.exports = router;
