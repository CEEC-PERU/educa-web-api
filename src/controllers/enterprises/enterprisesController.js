const enterpriseService = require('../../services/enterprise/enterprisesService');
const enterpriseController = {
  create: async (req, res) => {
    const enterprise = await enterpriseService.create(req.body);
    res.json(enterprise);
  },
  
  getAll: async (req, res) => {
    const enterprises = await enterpriseService.getAll();
    res.json(enterprises);
  },

  getById: async (req, res) => {
    const enterprises = await enterpriseService.getById(req.params.id);
    res.json(enterprises);
  },

  update: async (req, res) => {
    const enterprises = await enterpriseService.update(req.params.id, req.body);
    res.json(enterprises);
  },

  delete: async (req, res) => {
    await enterpriseService.delete(req.params.id);
    res.json({ message: 'Enterprise deleted successfully' });
  }
};

module.exports = enterpriseController;