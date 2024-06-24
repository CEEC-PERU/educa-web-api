const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/images/imageController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/uploadImage', upload.single('image'), imageController.uploadImage);

module.exports = router;
