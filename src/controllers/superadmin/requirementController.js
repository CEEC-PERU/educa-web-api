const Requirement = require('../../models/Requirement');
const User = require('../../models/UserModel');
const requirementService = require('../../services/superadmin/requirementService');

const createRequirement = async (req, res) => {
    try {
      const requirement = await requirementService.createRequirement(req.body);
      res.status(201).json(requirement);
    } catch (error) {
      res.status(500).json({ error: 'Error creating requirement' });
    }
  };
  
  const getAllRequirements = async (req, res) => {
    try {
      const requirements = await Requirement.findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: ['user_name'], // Aquí seleccionas el nombre del usuario
        }],
      });
      res.status(200).json(requirements);
    } catch (error) {
      console.error('Error fetching requirements:', error);
      res.status(500).json({ error: 'Error fetching requirements' });
    }
  };
  const deleteRequirement = async (req, res) => {
    try {
      await requirementService.deleteRequirement(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting requirement' });
    }
  };
  
  module.exports = {
    createRequirement,
    getAllRequirements,
    deleteRequirement,
  };
