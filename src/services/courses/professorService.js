const Professor = require('../../models/professorModel');
const Level = require('../../models/levelModel');

exports.getAllProfessors = async () => {
  try {
    return await Professor.findAll({
      include: [{ model: Level, attributes: ['name'], as: 'professorLevel' }]
    });
  } catch (error) {
    console.error('Error fetching professors:', error);
    throw new Error('Error fetching professors');
  }
};

exports.getProfessorById = async (professorId) => {
  try {
    return await Professor.findByPk(professorId, {
      include: [{ model: Level, attributes: ['name'], as: 'professorLevel' }]
    });
  } catch (error) {
    console.error('Error fetching professor by ID:', error);
    throw new Error('Error fetching professor by ID');
  }
};

exports.createProfessor = async (professorData) => {
  try {
    return await Professor.create(professorData);
  } catch (error) {
    console.error('Error creating professor:', error);
    throw new Error('Error creating professor');
  }
};

exports.updateProfessor = async (professorId, professorData) => {
  try {
    const professor = await Professor.findByPk(professorId);
    if (professor) {
      await professor.update(professorData);
      return professor;
    }
    return null;
  } catch (error) {
    console.error('Error updating professor:', error);
    throw new Error('Error updating professor');
  }
};

exports.deleteProfessor = async (professorId) => {
  try {
    const professor = await Professor.findByPk(professorId);
    if (professor) {
      await professor.destroy();
      return professor;
    }
    return null;
  } catch (error) {
    console.error('Error deleting professor:', error);
    throw new Error('Error deleting professor');
  }
};

exports.getAllLevels = async () => {
  try {
    return await Level.findAll();
  } catch (error) {
    console.error('Error fetching levels:', error);
    throw new Error('Error fetching levels');
  }
};
