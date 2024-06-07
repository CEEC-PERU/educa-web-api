const Course = require('../../models/courseModel');

exports.getAllCourses = async () => {
  try {
    return await Course.findAll({
      attributes: ['course_id', 'image', 'name', 'description_short', 'duracion_curso'],
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching courses');
  }
};

exports.getCourseById = async (courseId) => {
  try {
    return await Course.findByPk(courseId, {
      attributes: ['course_id', 'image', 'name', 'description_short', 'description_large', 'duracion_curso', 'intro_video']
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching course by ID');
  }
};

exports.createCourse = async (courseData) => {
  try {
    return await Course.create(courseData);
  } catch (error) {
    console.error(error);
    throw new Error('Error creating course');
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
    console.error(error);
    throw new Error('Error updating course');
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
    console.error(error);
    throw new Error('Error deleting course');
  }
};
