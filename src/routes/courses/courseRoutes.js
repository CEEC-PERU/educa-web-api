const express = require('express');
const router = express.Router();
const coursesController = require('../../controllers/courses/courseController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

// Todos los cursos
router.get('/', coursesController.getAllCourses);

// Obtener detalle de un curso por su ID
router.get('/:id/detalle', coursesController.getCursoDetalleById);

// Info de curso por id_course
router.get('/:id', coursesController.getCourseById);

// Agregar un nuevo curso
router.post('/', coursesController.createCourse);

// Actualizar un curso
router.put('/:id', authenticateToken, coursesController.updateCourse);  // Aquí asegurarse de que updateCourse es una función

// Eliminar un curso
router.delete('/:id', authenticateToken, coursesController.deleteCourse);

module.exports = router;
