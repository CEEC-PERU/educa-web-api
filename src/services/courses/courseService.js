const Course = require('../../models/courseModel');
const sequelize = require('sequelize');

exports.getAllCourses = async () => {
  try {
    return await Course.findAll();
  } catch (error) {
    console.error('Error al obtener todos los cursos:', error);
    throw new Error('Error al obtener todos los cursos. Detalles en la consola.');
  }
};

exports.getCourseById = async (courseId) => {
  try {
    return await Course.findByPk(courseId);
  } catch (error) {
    console.error(`Error al obtener el curso con ID ${courseId}:`, error);
    throw new Error(`Error al obtener el curso con ID ${courseId}. Detalles en la consola.`);
  }
};

exports.createCourse = async (courseData) => {
  try {
    return await Course.create(courseData);
  } catch (error) {
    console.error('Error al crear un nuevo curso:', error);
    throw new Error('Error al crear un nuevo curso. Detalles en la consola.');
  }
};

exports.updateCourse = async (courseId, courseData) => {
  try {
    const course = await Course.findByPk(courseId);
    if (course) {
      await course.update(courseData);
      return course;
    }
    return null;
  } catch (error) {
    console.error(`Error al actualizar el curso con ID ${courseId}:`, error);
    throw new Error(`Error al actualizar el curso con ID ${courseId}. Detalles en la consola.`);
  }
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
    console.error(`Error al eliminar el curso con ID ${courseId}:`, error);
    throw new Error(`Error al eliminar el curso con ID ${courseId}. Detalles en la consola.`);
  }
};

exports.getCoursesWithModules = async (campaignId) => {
  try {
    const coursesWithModules = await CourseCampaign.findAll({
      where: { campaign_id: campaignId },
      attributes: {
        exclude: ['id']
      },
      include: [
        {
          model: Course,
          include: [
            {
              model: Module,
              as: 'modules',
              attributes: ['is_active', 'created_at', 'name'],
              order: [
                ['created_at', 'DESC']
              ]
            },
          ],
          group: ['Course.course_id', 'modules.module_id'],
          order: [
            ['created_at', 'DESC']
          ]
        },
      ],
    });
    return coursesWithModules;
  } catch (error) {
    console.error('Error al obtener cursos con módulos:', error);
    throw new Error('Error al obtener cursos con módulos. Detalles en la consola.');
  }
};
