// src/services/questionService.js
const Question = require('../../models/questionModel');
const imageService = require('../../services/images/imageService');
const fs = require('fs');

exports.createQuestion = async (questionData) => {
  try {
    const newQuestion = await Question.create(questionData);
    return newQuestion;
  } catch (error) {
    console.error('Error creating question:', error);
    throw new Error('Error creating question');
  }
};

exports.getQuestionsByEvaluationId = async (evaluationId) => {
  try {
    return await Question.findAll({ where: { evaluation_id: evaluationId } });
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Error fetching questions');
  }
};
