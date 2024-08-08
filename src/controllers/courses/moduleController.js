const moduleService = require('../../services/courses/moduleService');

const createModule = async (req, res) => {
    try {
      console.log('Request body:', req.body); // Agrega este mensaje
      const newModule = await moduleService.createModule(req.body);
      res.status(201).json(newModule);
    } catch (error) {
      console.error('Error creating module:', error);
      res.status(400).json({ error: error.message });
    }
  };

const updateModule = async (req, res) => {
  try {
    const updatedModule = await moduleService.updateModule(req.params.id, req.body);
    res.status(200).json(updatedModule);
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(400).json({ error: error.message });
  }
};

const updateModuleStatus = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { is_active } = req.body;
    console.log(`Updating module status: moduleId=${moduleId}, is_active=${is_active}`);

    const updatedModule = await moduleService.updateModuleStatus(moduleId, is_active);
    res.status(200).json(updatedModule);
  } catch (error) {
    console.error('Error updating module status:', error);
    res.status(500).json({ message: 'Error updating module status', error });
  }
};


const getAllModules = async (req, res) => {
  try {
    const modules = await moduleService.getAllModules();
    res.status(200).json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Error fetching modules' });
  }
};

const getModuleById = async (req, res) => {
  try {
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json(module);
  } catch (error) {
    console.error('Error fetching module:', error);
    res.status(500).json({ error: 'Error fetching module' });
  }
};

const deleteModule = async (req, res) => {
  try {
    await moduleService.deleteModule(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ error: 'Error deleting module' });
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
  updateModuleStatus
};
