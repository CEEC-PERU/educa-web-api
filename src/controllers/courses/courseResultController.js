const courseResultService = require('../../services/courses/CourseResultService');

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
    const result = await courseResultService.createCourseResult(data);
    res.status(201).json(result);
  } catch (error) {
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
