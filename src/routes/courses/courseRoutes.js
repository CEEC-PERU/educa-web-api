const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const coursesController = require('../../controllers/courses/courseController');

router.post('/upload', upload.single('video'), coursesController.uploadCourseVideo);

// Todos los cursos
router.get('/', coursesController.getAllCourses);

// Obtener detalle de un curso por su ID
router.get('/:id/detalle', coursesController.getCursoDetalleById);

// Info de curso por id_course
router.get('/:id', coursesController.getCourseById);

// Agregar un nuevo curso
router.post('/', coursesController.createCourse);

// Actualizar un curso
router.put('/:id', coursesController.updateCourse);  // Aquí asegurarse de que updateCourse es una función

// Eliminar un curso
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
