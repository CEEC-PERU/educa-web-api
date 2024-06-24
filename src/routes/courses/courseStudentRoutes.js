const express = require('express');
const courseStudentController = require('../../controllers/courses/courseStudentController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

const router = express.Router();

router.post('/', authenticateToken, courseStudentController.create);
router.get('/',authenticateToken, courseStudentController.getAll);
router.get('/cursos/:user_id',authenticateToken, courseStudentController.getCourseStudentsByUserId);
router.get('/:id',authenticateToken, courseStudentController.getById);

//obtener todos los detalles del curso 
router.get('/detailcourse/:course_id',authenticateToken, courseStudentController.getCourseDetailByCourseId);
router.get('/modules/:course_id/:user_id',authenticateToken, courseStudentController.getModulesByCourseId);
router.put('/:id',authenticateToken, courseStudentController.update);
router.delete('/:id', authenticateToken,courseStudentController.delete);

module.exports = router;
