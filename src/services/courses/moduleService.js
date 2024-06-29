const Module = require('../../models/moduleModel');
const Session = require('../../models/sessionModel');
const { Op } = require('sequelize');

const getAllModules = async () => {
  return await Module.findAll();
};

const validateCourseAndEvaluation = async (course_id, evaluation_id, module_id = null) => {
  const whereClause = module_id 
    ? { evaluation_id, module_id: { [Op.ne]: module_id } } 
    : { evaluation_id };

  const moduleWithSameEvaluation = await Module.findOne({ where: whereClause });
  if (moduleWithSameEvaluation) {
    return 'La evaluación ya está asignada a otro módulo';
  }
  return null;
};

const createModule = async (data) => {
  const validationError = await validateCourseAndEvaluation(data.course_id, data.evaluation_id);
  if (validationError) {
    throw new Error(validationError);
  }
  return await Module.create(data);
};

const getModuleById = async (id) => {
  return await Module.findByPk(id);
};

const updateModule = async (id, moduleData) => {
  const module = await Module.findByPk(id);
  if (!module) {
    throw new Error('Module not found');
  }

  // Verificar si la evaluación ha cambiado
  if (module.evaluation_id !== moduleData.evaluation_id) {
    const validationError = await validateCourseAndEvaluation(moduleData.course_id, moduleData.evaluation_id, id);
    if (validationError) {
      throw new Error(validationError);
    }
  }

  return await module.update(moduleData);
};

const deleteModule = async (id) => {
  const module = await Module.findByPk(id);
  if (!module) {
    throw new Error('Module not found');
  }
  return await module.destroy();
};

const getModulesByCourseId = async (courseId) => {
  try {
    console.log(`Fetching modules for course ID: ${courseId}`); // Agregar mensaje de depuración
    const modules = await Module.findAll({
      where: { course_id: courseId },
      include: [
        {
          model: Session,
          as: 'moduleSessions'
        }
      ]
    });
    console.log(`Modules fetched: ${JSON.stringify(modules)}`); // Agregar mensaje de depuración
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
  validateCourseAndEvaluation
};
