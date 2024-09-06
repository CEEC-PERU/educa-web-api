const Enterprise = require('../../models/EnterpriseModel');
const User = require('../../models/UserModel');
const Role = require('../../models/RolModel');
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



const getEnterpriseUserCount = async (enterpriseId) => {
  try {
    const enterprise = await Enterprise.findOne({
      where: { enterprise_id: enterpriseId },
      attributes: ['enterprise_id', 'name', 'user_count'], // Get enterprise details and user limit
      include: [{
        model: User,
        as: 'enterpriseUsers' ,
        attributes: ['user_id', 'user_name'], // Include user details
        where: { role_id: 1 }, // Filter by student role (role_id = 1)
      }],
    });

   
    if (!enterprise) {
      throw new Error('Enterprise not found');
    }

    // Count users associated with the enterprise and having role_id = 1 (students)
    const studentCount = await User.count({
      where: {
        enterprise_id: enterpriseId,  // Users belonging to the enterprise
        role_id: 1,
        is_active:true                // Filter by student role (role_id = 1)
      }
    });

    return {
      enterpriseName: enterprise.name,
      maxUserCount: enterprise.user_count,
      currentUserCount: studentCount
    };
  } catch (error) {
    console.error('Error fetching user count:', error);
    throw new Error('Error fetching enterprise user count');
  }
};


module.exports = {
  createEnterprise,
  getAllEnterprises,
  getEnterpriseById,
  updateEnterprise,
  deleteEnterprise,
  getEnterpriseUserCount,
 
};
