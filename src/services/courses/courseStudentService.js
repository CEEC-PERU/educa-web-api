const CourseStudent = require('../../models/courseStudent');
const Course = require('../../models/courseModel');
const Category = require('../../models/categoryModel');
const Profesor = require('../../models/professorModel');
const Nivel = require('../../models/levelModel');
const Module = require('../../models/moduleModel');
const Session = require('../../models/sessionModel');
class CourseStudentService {
    async create(data) {
        return await CourseStudent.create(data);
    }

    async getAll() {
        return await CourseStudent.findAll();
    }

    async getById(id) {
        return await CourseStudent.findByPk(id);
    }


    async update(id, data) {
        const courseStudent = await CourseStudent.findByPk(id);
        if (!courseStudent) {
            throw new Error('CourseStudent not found');
        }
        return await courseStudent.update(data);
    }

    async delete(id) {
        const courseStudent = await CourseStudent.findByPk(id);
        if (!courseStudent) {
            throw new Error('CourseStudent not found');
        }
        await courseStudent.destroy();
        return courseStudent;
    }

    
    async getCourseStudentsByUserId(user_id){
        try {
            const coursesByStudent = await CourseStudent.findAll({
              where: { user_id: user_id },
              attributes: [  'course_id','deadline'],
              include: [
                {
                  model: Course,
                  attributes: [ 'name', 'description_short','image'],
                  include : [
                    {
                      model: Category,
                      attributes: [ 'name'],
                      as: 'courseCategory'
                     
                    },
                    {
                      model: Profesor,
                      attributes: [ 'full_name'],
                      as: 'courseProfessor'
                    },
                    {
                        model: Module,
                        attributes: [ 'name' , 'is_active'],
                        as: 'courseModules',
                        include: [
                            {
                                model: Session,
                                attributes: [ 'name' , 'is_active'],
                               as: 'moduleSessions'
                                
                            }
                        ]
                    }
                ]
                }
              ],
            });
            return coursesByStudent
          } catch (error) {
            console.log(error)
            throw error;
          }
    }


    async getCourseDetailByCourseId(course_id){
        try {
            const coursesByStudent = await Course.findAll({
              where: { course_id: course_id },
              attributes: [  'course_id','name', 'description_short', 'description_large', 'intro_video', 'duration_video', 'image', 'duration_course', 'is_active'
               ],
                  include : [
                    {
                      model: Category,
                      attributes: [ 'name'],
                      as: 'courseCategory'
                     
                    },
                    {
                      model: Profesor,
                      attributes: [ 'full_name', 'image' , 'especialitation', 'description',],
                      as: 'courseProfessor',
                      include : [
                        {
                          model: Nivel,
                          attributes: [ 'name'],
                          as: 'professorLevel'
                        },
                  ],
                    }
              ],
            });
            return coursesByStudent
          } catch (error) {
            console.log(error)
            throw error;
          }
    }


}

module.exports = new CourseStudentService();
