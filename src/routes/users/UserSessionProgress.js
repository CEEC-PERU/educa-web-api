const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const userSessionProgressController = require('../../controllers/users/UserSesionProgress');

router.post('/', authenticateToken,  userSessionProgressController.createUserSessionProgress);
router.get('/:id', authenticateToken,  userSessionProgressController.getUserSessionProgressById);
router.get('/', authenticateToken, userSessionProgressController.getAllUserSessionProgresses);
router.put('/:id', authenticateToken,  userSessionProgressController.updateUserSessionProgress);
router.delete('/:id',authenticateToken, userSessionProgressController.deleteUserSessionProgress);

module.exports = router;
