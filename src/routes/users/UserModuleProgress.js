const express = require('express');
const router = express.Router();
const userModuleProgressController = require('../../controllers/users/UserModuleProgress');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.post('/', authenticateToken, userModuleProgressController.createUserModuleProgress);
router.get('/:id', authenticateToken , userModuleProgressController.getUserModuleProgressById);
router.get('/', authenticateToken , userModuleProgressController.getAllUserModuleProgresses);
router.put('/:id', authenticateToken , userModuleProgressController.updateUserModuleProgress);
router.delete('/:id',authenticateToken ,  userModuleProgressController.deleteUserModuleProgress);

module.exports = router;
