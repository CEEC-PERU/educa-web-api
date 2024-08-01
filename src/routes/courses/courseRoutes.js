const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const courseController = require('../../controllers/courses/courseController');

// Ruta para crear un curso con subida de video e imagen
router.post('/', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), courseController.createCourse);

// Todos los cursos
router.get('/', courseController.getAllCourses);

// Info de curso por id_course
router.get('/:id', courseController.getCourseById);

// Obtener módulos y sesiones por ID de curso
router.get('/:id/modules', courseController.getModulesWithSessionsByCourse);

// Actualizar un curso
router.put('/:id', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), courseController.updateCourse);

// Eliminar un curso
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
