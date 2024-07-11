const Enterprise = require('../../models/EnterpriseModel');

const createEnterprise = async (enterpriseData) => {
  try {
    return await Enterprise.create(enterpriseData);
  } catch (error) {
    console.error('Error creating enterprise:', error);
    throw new Error('Error creating enterprise');
  }
};

const getAllEnterprises = async () => {
  try {
    return await Enterprise.findAll();
  } catch (error) {
    console.error('Error fetching enterprises:', error);
    throw new Error('Error fetching enterprises');
  }
};

const getEnterpriseById = async (enterpriseId) => {
  try {
    return await Enterprise.findByPk(enterpriseId);
  } catch (error) {
    console.error('Error fetching enterprise by ID:', error);
    throw new Error('Error fetching enterprise by ID');
  }
};

const updateEnterprise = async (enterpriseId, enterpriseData) => {
  try {
    const enterprise = await Enterprise.findByPk(enterpriseId);
    if (enterprise) {
      await enterprise.update(enterpriseData);
      return enterprise;
    }
    return null;
  } catch (error) {
    console.error('Error updating enterprise:', error);
    throw new Error('Error updating enterprise');
  }
};

const deleteEnterprise = async (enterpriseId) => {
  try {
    const enterprise = await Enterprise.findByPk(enterpriseId);
    if (enterprise) {
      await enterprise.destroy();
      return enterprise;
    }
    return null;
  } catch (error) {
    console.error('Error deleting enterprise:', error);
    throw new Error('Error deleting enterprise');
  }
};

module.exports = {
  createEnterprise,
  getAllEnterprises,
  getEnterpriseById,
  updateEnterprise,
  deleteEnterprise,
};
