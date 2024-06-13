// src/routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/courses/sessionController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Ruta para crear una sesión con video
router.post('/', upload.single('video'), sessionController.createSession);

router.get('/', sessionController.getAllSessions);
router.get('/:id', sessionController.getSessionById);
router.post('/', sessionController.createSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
