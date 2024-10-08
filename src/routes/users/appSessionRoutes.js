const express = require('express');
const router = express.Router();
const appSessionController = require('../../controllers/users/appSessionController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.get('/', authenticateToken, appSessionController.getAppSessions);
router.get('/usemonth/:clientId', authenticateToken, appSessionController.getAppSessions2);
router.get('/user/:userId', authenticateToken, appSessionController.getAppSessionsByUser);
router.get('/inactive', authenticateToken, appSessionController.getInactiveUsersController);
router.get('/last-login/:userId', authenticateToken, appSessionController.getLastLoginController);
router.get('/activity-count', appSessionController.getUsersActivityCountController); // Cambiar aquí

router.get('/average-session-time/:enterpriseId', appSessionController.getAverageSessionTime);

module.exports = router;