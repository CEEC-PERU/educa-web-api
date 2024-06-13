// src/routes/evaluationRoutes.js
const express = require('express');
const router = express.Router();
const evaluationController = require('../../controllers/courses/evaluationController');

router.post('/', evaluationController.createEvaluation);
router.get('/', evaluationController.getEvaluations);

module.exports = router;
