
const Professor = require('../../models/professorModel');
// professorController.js
const professorService = require('../../services/courses/professorService');

exports.getAllProfessors = async (req, res) => {
  try {
    const professors = await professorService.getAllProfessors();
    res.json(professors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};