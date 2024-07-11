const Requirement = require('../../models/Requirement');

const createRequirement = async (requirement) => {
  return await Requirement.create(requirement);
};

const getAllRequirements = async () => {
  return await Requirement.findAll({ order: [['created_at', 'DESC']] });
};

const deleteRequirement = async (id) => {
  return await Requirement.destroy({ where: { requirement_id: id } });
};

module.exports = {
  createRequirement,
  getAllRequirements,
  deleteRequirement,
};
