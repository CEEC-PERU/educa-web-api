// src/routes/videos/videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../../controllers/video/videoController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('video'), videoController.uploadVideo);

module.exports = router;
