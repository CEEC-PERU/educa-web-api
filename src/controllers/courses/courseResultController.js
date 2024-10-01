const courseResultService = require('../../services/courses/CourseResultService');
const CourseResult = require('../../models/EvaluationCourseResult');
const AnswerCourseResult = require('../../models/AnswerCourseResult');
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
  const { user_id, course_id,  evaluation_id, puntaje , second_chance , answers  } = req.body;

  try {
      // Crear el resultado principal en la tabla Result
      const result = await CourseResult.create({
      user_id : user_id, 
      course_id: course_id,  
      evaluation_id : evaluation_id,
      puntaje: puntaje, 
      second_chance: second_chance
      });

       // Guardar cada respuesta en la tabla AnswerResultModule
  const answerPromises = answers.map(async (answer) => {
      await AnswerCourseResult.create({
          course_result_id: result.course_result_id,
          question_id: answer.question_id,
          response: JSON.stringify(answer.response), // Guardar como JSON si es array
          is_correct: Array.isArray(answer.isCorrect2) 
              ? answer.isCorrect2.every(val => val) 
              : answer.isCorrect,
          is_correct2: JSON.stringify(answer.isCorrect2), 
          response_text: answer.response2 || null ,// Guardar el texto adicional (response2)
          score: answer.score, 
      });
  });

  await Promise.all(answerPromises);  // Ejecutar todas las promesas de creación
     
  return res.status(201).json({ message: 'Respuestas guardadas correctamente' });
    
  } catch (error) {
      res.status(400).json({ error: error.message });
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
