const Course = require('../../models/courseModel');
const { isEvaluationAssigned } = require('./evaluationService');

exports.getAllCourses = async () => {
  try {
    return await Course.findAll();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Error fetching courses');
  }
};

exports.getCourseById = async (courseId) => {
  try {
    return await Course.findByPk(courseId);
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw new Error('Error fetching course by ID');
  }
};

exports.createCourse = async (courseData) => {
  if (await isEvaluationAssigned(courseData.evaluation_id)) {
    throw new Error('La evaluación ya está asignada a otro curso o módulo');
  }
  return await Course.create(courseData);
};

exports.updateCourse = async (courseId, courseData) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  if (course.evaluation_id !== courseData.evaluation_id && await isEvaluationAssigned(courseData.evaluation_id, courseId)) {
    throw new Error('La evaluación ya está asignada a otro curso o módulo');
  }

  return await course.update(courseData);
};

exports.deleteCourse = async (courseId) => {
  try {
    const course = await Course.findByPk(courseId);
    if (course) {
      await course.destroy();
      return course;
    }
    return null;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw new Error('Error deleting course');
  }
};
