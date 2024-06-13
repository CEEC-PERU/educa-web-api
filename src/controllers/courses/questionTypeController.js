// src/controllers/questionTypeController.js
const QuestionType = require('../../models/questionTypeModel');

exports.getQuestionTypes = async (req, res) => {
  try {
    const questionTypes = await QuestionType.findAll();
    res.status(200).json(questionTypes);
  } catch (error) {
    console.error('Error fetching question types:', error);
    res.status(500).json({ error: 'Error fetching question types' });
  }
};
