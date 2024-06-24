const optionService = require('../../services/courses/optionService');

exports.createOption = async (req, res) => {
  try {
    const newOption = await optionService.createOption(req.body);
    res.status(201).json(newOption);
  } catch (error) {
    console.error('Error creating option:', error);
    res.status(500).json({ error: 'Error creating option' });
  }
};


exports.getOptionsByQuestionId = async (req, res) => {
  try {
    const options = await optionService.getOptionsByQuestionId(req.params.questionId);
    res.status(200).json(options);
  } catch (error) {
    console.error('Error fetching options:', error);
    res.status(500).json({ error: 'Error fetching options' });
  }
};
