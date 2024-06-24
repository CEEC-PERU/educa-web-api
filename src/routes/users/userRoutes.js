const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userControllers');

const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.post('/new', userController.createUser);
router.get('/users/:id', authenticateToken, userController.getUserById);
router.put('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);
router.post('/createuserAdmin', userController.createUserAdmin);

//OBTENER INFO DE USUARIO CON EMPRESA Y PERFIL
router.get('/enterprise/:userId', authenticateToken, userController.getUserInfo);

module.exports = router;
