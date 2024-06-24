const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const courseController = require('../../controllers/courses/courseController');

router.post('/upload', upload.single('video'), courseController.uploadCourseVideo);
router.post('/uploadImage', upload.single('image'), courseController.uploadCourseImage);

// Todos los cursos
router.get('/', courseController.getAllCourses);


// Info de curso por id_course
router.get('/:id', courseController.getCourseById);

// Agregar un nuevo curso
router.post('/', courseController.createCourse);

// Actualizar un curso
router.put('/:id', courseController.updateCourse);  // Aquí asegurarse de que updateCourse es una función

// Eliminar un curso
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
