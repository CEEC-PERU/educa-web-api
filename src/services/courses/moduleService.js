const Module = require('../../models/moduleModel');
const Session = require('../../models/sessionModel');
const { isEvaluationAssigned } = require('./evaluationService');

const getAllModules = async () => {
  return await Module.findAll();
};

const createModule = async (data) => {
  if (await isEvaluationAssigned(data.evaluation_id)) {
    throw new Error('La evaluación ya está asignada a otro curso o módulo');
  }
  return await Module.create(data);
};

const updateModule = async (id, data) => {
  const module = await Module.findByPk(id);
  if (!module) {
    throw new Error('Module not found');
  }

  if (module.evaluation_id !== data.evaluation_id && await isEvaluationAssigned(data.evaluation_id, id)) {
    throw new Error('La evaluación ya está asignada a otro curso o módulo');
  }

  return await module.update(data);
};

const updateModuleStatus = async (id, isActive) => {
  const module = await Module.findByPk(id);
  if (!module) {
    throw new Error('Module not found');
  }
  module.is_active = isActive;
  await module.save();
  return module;
};

const getModuleById = async (id) => {
  return await Module.findByPk(id);
};

const deleteModule = async (id) => {
  const module = await Module.findByPk(id, {
    include: ['moduleSessions'] // Incluye las sesiones para eliminarlas en cascada
  });
  if (!module) {
    throw new Error('Module not found');
  }
  return await module.destroy();
};

const getModulesByCourseId = async (courseId) => {
  try {
    const modules = await Module.findAll({
      where: { course_id: courseId },
      include: [
        {
          model: Session,
          as: 'moduleSessions'
        }
      ]
    });
    return modules;
  } catch (error) {
    console.error('Error fetching modules by course ID:', error);
    throw new Error('Error fetching modules by course ID');
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
  getModulesByCourseId,
  updateModuleStatus
};
