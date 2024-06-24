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

exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await evaluationService.getEvaluationById(req.params.id);
    res.status(200).json(evaluation);
  } catch (error) {
    console.error('Error fetching evaluation by id:', error);
    res.status(500).json({ error: 'Error fetching evaluation by id' });
  }
};

exports.updateEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const { evaluation, questions } = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: 'Questions must be an array' });
    }

    const updatedEvaluation = await evaluationService.updateEvaluation(id, evaluation, questions);
    res.status(200).json(updatedEvaluation);
  } catch (error) {
    console.error('Error updating evaluation:', error);
    res.status(500).json({ error: 'Error updating evaluation' });
  }
};


exports.deleteEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    await evaluationService.deleteEvaluation(id);
    res.status(200).json({ message: 'Evaluation deleted successfully' });
  } catch (error) {
    console.error('Error deleting evaluation:', error);
    res.status(500).json({ error: 'Error deleting evaluation' });
  }
};
