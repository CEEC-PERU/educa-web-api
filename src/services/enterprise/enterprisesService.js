const Enterprise = require('../../models/EnterpriseModel');
const User = require('../../models/UserModel');

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
    // Primero, elimina todos los usuarios que están ligados a esta empresa
    await User.destroy({ where: { enterprise_id: enterpriseId } });

    // Luego, elimina la empresa
    const result = await Enterprise.destroy({ where: { enterprise_id: enterpriseId } });

    return result;
  } catch (error) {
    console.error('Error deleting enterprise:', error);
    throw error;
  }
};

module.exports = {
  createEnterprise,
  getAllEnterprises,
  getEnterpriseById,
  updateEnterprise,
  deleteEnterprise,
};
