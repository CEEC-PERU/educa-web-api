// src/controllers/moduleController.js
const moduleService = require('../../services/courses/moduleService');

exports.getAllModules = async (req, res) => {
  try {
    const modules = await moduleService.getAllModules();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getModuleById = async (req, res) => {
  const id = req.params.id;
  try {
    const module = await moduleService.getModuleById(id);
    if (module) {
      res.json(module);
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createModule = async (req, res) => {
  try {
    const newModule = await moduleService.createModule(req.body);
    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateModule = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedModule = await moduleService.updateModule(id, req.body);
    if (updatedModule) {
      res.json(updatedModule);
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteModule = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedModule = await moduleService.deleteModule(id);
    if (deletedModule) {
      res.json({ message: 'Module deleted' });
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
