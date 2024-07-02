const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const userSessionProgressController = require('../../controllers/users/UserSesionProgress');

router.post('/', authenticateToken,  userSessionProgressController.createUserSessionProgress);
router.get('/:id', authenticateToken,  userSessionProgressController.getUserSessionProgressById);
router.get('/', authenticateToken, userSessionProgressController.getAllUserSessionProgresses);
router.put('/:id', authenticateToken,  userSessionProgressController.updateUserSessionProgress);
router.delete('/:id',authenticateToken, userSessionProgressController.deleteUserSessionProgress);
// Ruta para obtener el progreso de la sesión del usuario por user_id y session_id
router.get('/progress/user/:userId/session/:sessionId', userSessionProgressController.getUserSessionProgressByUserAndSessionController);

module.exports = router;
