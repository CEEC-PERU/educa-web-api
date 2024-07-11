const express = require('express');
const router = express.Router();
const userModuleProgressController = require('../../controllers/users/UserModuleProgress');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.post('/', authenticateToken, userModuleProgressController.createUserModuleProgress);
router.get('/:id', authenticateToken , userModuleProgressController.getUserModuleProgressById);
router.get('/', authenticateToken , userModuleProgressController.getAllUserModuleProgresses);
router.put('/:id', authenticateToken , userModuleProgressController.updateUserModuleProgress);
router.delete('/:id',authenticateToken ,  userModuleProgressController.deleteUserModuleProgress);
// Actualizar un registro de progreso de módulo de usuario por module_id y user_id
router.put('/module/:module_id/user/:user_id', userModuleProgressController.updateByModuleAndUser);

// Obtener un registro de progreso de módulo de usuario por module_id y user_id
router.get('/module/:module_id/user/:user_id', userModuleProgressController.getByModuleAndUser);

module.exports = router;
