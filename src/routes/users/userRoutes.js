const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userControllers');


router.post('/bulk', userController.createUsersController);
router.post('/new', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/createuserAdmin', userController.createUserAdmin);
router.get('/courses/:user_id', userController.getCoursesByUser);


//OBTENER INFO DE USUARIO CON EMPRESA Y PERFIL
router.get('/enterprise/:userId', userController.getUserInfo);

module.exports = router;
