// src/controllers/questionController.js
const questionService = require('../../services/courses/questionServive');


exports.createQuestion = async (req, res) => {
  try {
    const newQuestion = await questionService.createQuestion(req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Error creating question' });
  }
};

exports.getQuestionsByEvaluationId = async (req, res) => {
  try {
    const questions = await questionService.getQuestionsByEvaluationId(req.params.evaluationId);
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
};
