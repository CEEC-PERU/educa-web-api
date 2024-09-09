const courseResultService = require('../../services/courses/CourseResultService');
const CourseResult = require('../../models/EvaluationCourseResult');
// Manejador para obtener todos los resultados de cursos
async function getAllCourseResults(req, res, next) {
  try {
    const results = await courseResultService.getAllCourseResults();
    res.json(results);
  } catch (error) {
    next(error);
  }
}


async function getCourseResultsByUserId(req, res, next) {
  const { userId } = req.params;
  try {
    const results = await courseResultService.getCourseResultsByUserId(userId);
    res.json(results);
  } catch (error) {
    next(error);
  }
}



async function createCourseResult(req, res, next) {
  const data = req.body;
  try {
    // Contar cuántos resultados tiene el usuario para el curso específico
    const existingResults = await CourseResult.count({
      where: {
        course_id: course_id,
        user_id: user_id
      }
    });

    // Verificar si el usuario ya tiene dos resultados para este curso
    if (existingResults >= 2) {
      throw new Error('El usuario ya tiene dos resultados para este curso.');
    }

    // Crear el nuevo resultado
    const result = await CourseResult.create(data);
    return result;
  }catch (error) {
    next(error);
  }
}


async function updateCourseResult(req, res, next) {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await courseResultService.updateCourseResult(id, data);
    res.json(result);
  } catch (error) {
    next(error);
  }
}


async function deleteCourseResult(req, res, next) {
  const { id } = req.params;
  try {
    const result = await courseResultService.deleteCourseResult(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCourseResults,
  getCourseResultsByUserId,
  createCourseResult,
  updateCourseResult,
  deleteCourseResult
};
