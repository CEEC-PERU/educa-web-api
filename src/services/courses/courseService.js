const Course = require('../../models/courseModel');

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
  try {
    return await Course.create(courseData);
  } catch (error) {
    console.error('Error creating course:', error);
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
    console.error('Error updating course:', error);
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
    console.error('Error deleting course:', error);
    throw new Error('Error deleting course');
  }
};
