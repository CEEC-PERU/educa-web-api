// src/services/evaluationService.js
const Evaluation = require('../../models/evaluationModel');

exports.createEvaluation = async (evaluationData) => {
  try {
    return await Evaluation.create(evaluationData);
  } catch (error) {
    console.error('Error creating evaluation:', error);
    throw new Error('Error creating evaluation');
  }
};

exports.getEvaluations = async () => {
  try {
    return await Evaluation.findAll();
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    throw new Error('Error fetching evaluations');
  }
};
