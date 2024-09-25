// src/routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const cuestionarioController = require('../../controllers/courses/cuestionarioController');

router.get('/', cuestionarioController.getAllCuestionario);
router.get('/:id', cuestionarioController.getCuestionarioById);
router.post('/', cuestionarioController.createCuestionario);
router.put('/:id', cuestionarioController.updateCuestionario);
router.delete('/:id', cuestionarioController.deleteCuestionario);
// Nueva ruta para obtener cuestionarios por course_id y cuestype_id como parámetros de la URL
router.get('/course/:course_id/type/:cuestype_id', cuestionarioController.getCuestionarioByCourseAndType);

module.exports = router;
