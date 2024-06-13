// src/services/optionService.js
const Option = require('../../models/optionModel');

exports.createOption = async (optionData) => {
  try {
    return await Option.create(optionData);
  } catch (error) {
    console.error('Error creating option:', error);
    throw new Error('Error creating option');
  }
};

exports.getOptionsByQuestionId = async (questionId) => {
  try {
    return await Option.findAll({ where: { question_id: questionId } });
  } catch (error) {
    console.error('Error fetching options:', error);
    throw new Error('Error fetching options');
  }
};
