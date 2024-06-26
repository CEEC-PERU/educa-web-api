const CourseStudent = require('../../models/courseStudent');
const Course = require('../../models/courseModel');
const Category = require('../../models/categoryModel');
const Profesor = require('../../models/professorModel');
const Nivel = require('../../models/levelModel');
const Module = require('../../models/moduleModel');
const Session = require('../../models/sessionModel');
const Evaluation = require('../../models/evaluationModel');
const Question = require('../../models/questionModel');
const Option = require('../../models/optionModel');
const QuestionType = require('../../models/questionTypeModel');
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
                  attributes: [ 'name', 'description_short','image', 'course_id'],
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
                      ]
                    },
                    {
                        model: Module,
                        attributes: [ 'name' , 'is_active','module_id'],
                        as: 'courseModules',
                        include: [
                            {
                                model: Session,
                                attributes: [ 'name' ],
                                as: 'moduleSessions' 
                                
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


    async getModulesByCourseId(course_id){
      try {
          const coursesByStudent = await Course.findAll({
            where: { course_id: course_id },
            attributes: [  'course_id','name', 
             ],
                include : [
                  {
                      model: Module,
                      attributes: [ 'name' , 'is_active','module_id' , 'evaluation_id'],
                      as: 'courseModules',
                      include: [
                          {
                              model: Session,
                              attributes: ['session_id', 'name', 'video_enlace' , 'duracion_minutos' , ],
                              as: 'moduleSessions' 
                          },
                          {
                            model: Evaluation,
                            attributes: [ 'evaluation_id','name', 'description' ],
                            as: 'moduleEvaluation',
                            include: [
                              {
                                  model: Question,
                                  attributes: [ 'question_id' , 'question_text','score', 'image','question_text',  'evaluation_id', 'type_id'],
                                  as: 'questions' ,
                                  include: [
                                    {
                                        model: QuestionType,
                                        attributes: [ 'type_id','name' ],
                                        as: 'questionType'
                                        
                                    },
                                    {
                                      model: Option,
                                      attributes: [ 'option_id' , 'option_text' , 'is_correct',  ],
                                      as: 'options' 
                                      
                                  }
                                ]
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


}

module.exports = new CourseStudentService();
