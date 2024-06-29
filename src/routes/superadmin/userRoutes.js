// src/routes/superadmin/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../../controllers/superadmin/userController');
const uploadController = require('../../controllers/superadmin/uploadController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', userController.createUser);
router.post('/import', upload.single('file'), uploadController.uploadUsers);

module.exports = router;
