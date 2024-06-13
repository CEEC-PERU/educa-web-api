// src/routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../../controllers/courses/questionController');
const questionTypeController = require('../../controllers/courses/questionTypeController');

router.post('/', questionController.createQuestion);
router.get('/evaluation/:evaluationId', questionController.getQuestionsByEvaluationId);
router.get('/types', questionTypeController.getQuestionTypes);

module.exports = router;
