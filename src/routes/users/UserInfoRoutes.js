// routes/userInfoRoutes.js
const express = require('express');
const router = express.Router();
const userInfoController = require('../../controllers/users/UserInfoController');

// Multer setup for handling file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Store temporary files before uploading to S3

// Route to create UserInfo (upload image, signature, and PDF)
router.post('/create', upload.fields([
  { name: 'foto_image', maxCount: 1 },
  { name: 'firma_image', maxCount: 1 },
  { name: 'documento_pdf', maxCount: 1 }
]), userInfoController.createUserInfo);


module.exports = router;
