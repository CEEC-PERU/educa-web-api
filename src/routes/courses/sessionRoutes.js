// src/routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/courses/sessionController');

router.get('/', sessionController.getAllSessions);
router.get('/:id', sessionController.getSessionById);
router.post('/', sessionController.createSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
