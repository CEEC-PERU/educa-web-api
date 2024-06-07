const Professor = require('../../models/professorModel');

exports.getAllProfessors = async () => {
  try {
    return await Professor.findAll({
      attributes: ['professor_id', 'full_name'],
    });
  } catch (error) {
    console.error('Error fetching professors:', error);
    throw new Error('Error fetching professors');
  }
};
