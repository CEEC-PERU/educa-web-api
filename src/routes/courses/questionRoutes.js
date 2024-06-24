// src/routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../../controllers/courses/questionController');
const questionTypeController = require('../../controllers/courses/questionTypeController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), questionController.createQuestion);
router.get('/evaluation/:evaluationId', questionController.getQuestionsByEvaluationId);
router.get('/types', questionTypeController.getQuestionTypes);

module.exports = router;
