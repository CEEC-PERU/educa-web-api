// src/controllers/evaluationController.js
const evaluationService = require('../../services/courses/evaluationService');

exports.createEvaluation = async (req, res) => {
  try {
    const newEvaluation = await evaluationService.createEvaluation(req.body);
    res.status(201).json(newEvaluation);
  } catch (error) {
    console.error('Error creating evaluation:', error);
    res.status(500).json({ error: 'Error creating evaluation' });
  }
};

exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await evaluationService.getEvaluations();
    res.status(200).json(evaluations);
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    res.status(500).json({ error: 'Error fetching evaluations' });
  }
};
