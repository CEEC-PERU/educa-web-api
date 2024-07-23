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

// Nueva ruta para obtener estudiantes asignados
router.get('/assigned/:course_id', courseStudentController.getAssignedStudents);


//Asignar cursos a estudiantes por empresa
router.post('/assign', courseStudentController.assignStudentsToCourseByEnterprise);

// Obtener estudiantes no asignados
router.get('/assigned/:course_id/:enterprise_id', courseStudentController.getUnassignedStudents);

// Nueva ruta para obtener cursos por empresa
router.get('/enterprise/:enterprise_id', courseStudentController.getCoursesByEnterprise);

// Nueva ruta para obtener usuarios con sesiones por empresa
router.get('/enterprise/users/sessions', courseStudentController.getUsersByEnterpriseWithSessions);

router.get('/enterprise/:enterprise_id/students', courseStudentController.getStudentsByEnterprise);
router.get('/students/:user_id/grades', courseStudentController.getCoursesWithGradesByStudent);
router.get('/modules2/:course_id/:user_id', courseStudentController.getModulesByCourseId2);


module.exports = router;
