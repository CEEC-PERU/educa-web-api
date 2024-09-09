
const express = require('express');
const router = express.Router();
const classroomController = require('../../controllers/enterprises/classromController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
// Obtener todas las aulas
router.get('/',authenticateToken, classroomController.getAllClassrooms);

// Obtener un aula por su ID
router.get('/:id',authenticateToken, classroomController.getClassroomById);

// Crear una nueva aula
router.post('/', classroomController.createClassroom);

// Actualizar un aula por su ID
router.put('/:id',authenticateToken, classroomController.updateClassroom);

// Eliminar un aula por su ID
router.delete('/:id',authenticateToken, classroomController.deleteClassroom);

router.get('/enterprise/:enterprise_id',authenticateToken, classroomController.getClassroomsByEnterprise);


module.exports = router;
