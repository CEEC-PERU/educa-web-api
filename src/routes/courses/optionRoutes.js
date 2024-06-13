// src/routes/optionRoutes.js
const express = require('express');
const router = express.Router();
const optionController = require('../../controllers/courses/optionController');

router.post('/', optionController.createOption);
router.get('/question/:questionId', optionController.getOptionsByQuestionId);

module.exports = router;
