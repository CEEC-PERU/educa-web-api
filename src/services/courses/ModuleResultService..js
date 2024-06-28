const Evaluation = require('../../models/evaluationModel');
const Module = require('../../models/moduleModel');
const Course = require('../../models/courseModel');
const EvauationModuleResult= require('../../models/EvauationModuleResult');
// Obtener todos los resultados de cursos
async function getAllModulesResults() {
  try {
    const results = await EvauationModuleResult.findAll({
      include: [
        { model: Evaluation, attributes: ['evaluation_id', 'name'] },
        { model: Course, attributes: ['course_id', 'name'] }
      ]
    });
    return results;
  } catch (error) {
    throw new Error(`Error al obtener los resultados de cursos: ${error.message}`);
  }
}

// Obtener resultados de cursos por user_id (asumiendo que hay una relación que conecta CourseResult con User)
async function getModuleResultsByUserId(userId) {
  try {
    const results = await EvauationModuleResult.findAll({
      where: { user_id: userId },
      include: [
        { model: Evaluation, attributes: ['evaluation_id', 'name'] },
        { model: Course, attributes: ['course_id', 'name'] }
      ]
    });
    return results;
  } catch (error) {
    throw new Error(`Error al obtener los resultados de cursos por user_id: ${error.message}`);
  }
}

// Crear un nuevo resultado de curso
async function createModuleResult(data) {
  try {
    const result = await EvauationModuleResult.create(data);
    return result;
  } catch (error) {
    throw new Error(`Error al crear el resultado de curso: ${error.message}`);
  }
}

// Actualizar un resultado de curso existente
async function updateeResultResult(courseResultId, data) {
  try {
    const result = await EvauationModuleResult.findByPk(courseResultId);
    if (!result) {
      throw new Error('Resultado de curso no encontrado');
    }
    await result.update(data);
    return result;
  } catch (error) {
    throw new Error(`Error al actualizar el resultado de curso: ${error.message}`);
  }
}

// Eliminar un resultado de curso existente
async function deleteCourseResult(courseResultId) {
  try {
    const result = await EvauationModuleResult.findByPk(courseResultId);
    if (!result) {
      throw new Error('Resultado de curso no encontrado');
    }
    await result.destroy();
    return result;
  } catch (error) {
    throw new Error(`Error al eliminar el resultado de curso: ${error.message}`);
  }
}

module.exports = {
  getAllModulesResults,
  getModuleResultsByUserId,
  updateeResultResult,
  createModuleResult,
  deleteCourseResult
};
