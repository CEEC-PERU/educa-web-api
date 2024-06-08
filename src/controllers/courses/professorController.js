
// professorController.js
const professorService = require('../../services/courses/professorService');
exports.getAllProfessors = async (req, res) => {
  try {
    const professors = await professorService.getAllProfessors();
    res.json(professors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessorById = async (req, res) => {
  try {
    const professor = await professorService.getProfessorById(req.params.id);
    if (professor) {
      res.json(professor);
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProfessor = async (req, res) => {
  try {
    const newProfessor = await professorService.createProfessor(req.body);
    res.status(201).json(newProfessor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfessor = async (req, res) => {
  try {
    const updatedProfessor = await professorService.updateProfessor(req.params.id, req.body);
    if (updatedProfessor) {
      res.json(updatedProfessor);
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfessor = async (req, res) => {
  try {
    const deleted = await professorService.deleteProfessor(req.params.id);
    if (deleted) {
      res.json({ message: 'Professor deleted' });
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllLevels = async (req, res) => {
  try {
    const levels = await professorService.getAllLevels();
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
