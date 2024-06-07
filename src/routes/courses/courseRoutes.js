const express = require('express');
const router = express.Router();
const coursesController = require('../../controllers/courses/courseController');
const authenticateToken= require('../../middlewares/authenticationMiddleware');

//todos los cursos :http://192.168.18.3:4100/api/courses/
router.get('/', coursesController.getAllCourses);
// Obtener detalle de un curso por su ID
router.get('/:id/detalle', coursesController.getCursoDetalleById);


//info de curso por id_course : http://192.168.18.3:4100/api/courses/2
router.get('/:id', coursesController.getCourseById);


//agregar un nuevo curso :http://192.168.18.3:4100/api/courses/
router.post('/', coursesController.createCourse);

router.put('/:id', authenticateToken, coursesController.updateCourse);
router.delete('/:id', authenticateToken, coursesController.deleteCourse);


module.exports = router;
