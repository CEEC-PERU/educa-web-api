// src/routes/evaluationRoutes.js
// src/routes/courses/evaluationRoutes.js
const express = require('express');
const router = express.Router();
const evaluationController = require('../../controllers/courses/evaluationController');

router.post('/', evaluationController.createEvaluation);
router.get('/', evaluationController.getEvaluations);
router.get('/available', evaluationController.getAvailableEvaluationsController); 
router.get('/:id', evaluationController.getEvaluationById);
router.put('/:id', evaluationController.updateEvaluation);
router.delete('/:id', evaluationController.deleteEvaluation);

module.exports = router;
