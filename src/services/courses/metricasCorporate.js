const Course = require('../../models/courseModel');
const User = require('../../models/UserModel');
const CourseStudent = require('../../models/courseStudent');
const { sequelize } = require('../../config/database');


async function getStudentCountByCourse(enterprise_id) {
  try {
    const results = await CourseStudent.findAll({
      include: [
        {
          model: Course,
          attributes: ['name'],
        },
        {
          model: User,
          attributes: [],
          where: { enterprise_id }
        }
      ],
      attributes: [
        'course_id',
        [sequelize.fn('COUNT', sequelize.col('CourseStudent.user_id')), 'student_count']
      ],
      group: ['CourseStudent.course_id', 'Course.course_id'],
      order: [[sequelize.col('student_count'), 'DESC']],
      raw: true
    });

    const colors = results.map(() => '#' + Math.floor(Math.random()*16777215).toString(16));
    
    return {
      labels: results.map(result => result['Course.name']),
      datasets: {
        data: results.map(result => parseInt(result.student_count)),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      }
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching student count by course: ${error.message}`);
  }
}

module.exports = { getStudentCountByCourse };
