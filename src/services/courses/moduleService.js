const Module = require('../../models/moduleModel');

exports.getAllModules = async () => {
  try {
    return await Module.findAll();
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw new Error('Error fetching modules');
  }
};

exports.getModuleById = async (moduleId) => {
  try {
    return await Module.findByPk(moduleId);
  } catch (error) {
    console.error('Error fetching module by ID:', error);
    throw new Error('Error fetching module by ID');
  }
};

exports.createModule = async (moduleData) => {
  try {
    return await Module.create(moduleData);
  } catch (error) {
    console.error('Error creating module:', error);
    throw new Error('Error creating module');
  }
};

exports.updateModule = async (moduleId, moduleData) => {
  try {
    const module = await Module.findByPk(moduleId);
    if (module) {
      await module.update(moduleData);
      return module;
    }
    return null;
  } catch (error) {
    console.error('Error updating module:', error);
    throw new Error('Error updating module');
  }
};

exports.deleteModule = async (moduleId) => {
  try {
    const module = await Module.findByPk(moduleId);
    if (module) {
      await module.destroy();
      return module;
    }
    return null;
  } catch (error) {
    console.error('Error deleting module:', error);
    throw new Error('Error deleting module');
  }
};
