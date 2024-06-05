const Enterprise = require('../../models/EnterpriseModel');
const sequelize = require('sequelize');
const enterpriseService = {
  create: async (data) => {
    return await Enterprise.create(data);
  },

  getAll: async () => {
    return await Enterprise.findAll();
  },

  getById: async (id) => {
    return await Enterprise.findByPk(id);
  },

  update: async (id, data) => {
    return await Enterprise.update(data, { where: { enterprise_id: id } });
  },

  delete: async (id) => {
    return await Enterprise.destroy({ where: { enterprise_id: id } });
  }
};

module.exports = enterpriseService;