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
const UserModuleProgress = require('../../models/UserModuleProgress');
const UserSessionProgress = require('../../models/UserSessionProgress');
const QuestionType = require('../../models/questionTypeModel');
const User = require('../../models/UserModel');
const Enterprise = require('../../models/EnterpriseModel'); 

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


    async getCourseDetailByCourseId(course_id ){
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

    async getModulesByCourseId(course_id, user_id) {
      try {
        const coursesByStudent = await Course.findAll({
          where: { course_id: course_id },
          attributes: ['course_id', 'name', 'evaluation_id'],
          include: [
            {
              model: Module,
              attributes: ['name', 'is_active', 'module_id', 'evaluation_id'],
              as: 'courseModules',
              include: [
                {
                  model: UserModuleProgress,
                  attributes: ['is_completed', 'progress', 'user_id', 'user_module_progress_id'],
                  as: 'usermoduleprogress',
                  where: { user_id: user_id },
                  required: false  // Añadir required: false para evitar filtrar módulos
                },
                {
                  model: Session,
                  attributes: ['session_id', 'name', 'video_enlace', 'duracion_minutos'],
                  as: 'moduleSessions',
                  required: false ,
                  include: [
                    {
                      model: UserSessionProgress,
                      as: 'usersessionprogress',
                      where: { user_id: user_id },
                      required: false  // Añadir required: false para evitar filtrar sesiones
                    }
                  ],
                 
                },
                {
                  model: Evaluation,
                  attributes: ['evaluation_id', 'name', 'description'],
                  as: 'moduleEvaluation',
                  include: [
                    {
                      model: Question,
                      attributes: ['question_id', 'question_text', 'score', 'image', 'question_text', 'evaluation_id', 'type_id'],
                      as: 'questions',
                      include: [
                        {
                          model: QuestionType,
                          attributes: ['type_id', 'name'],
                          as: 'questionType'
                        },
                        {
                          model: Option,
                          attributes: ['option_id', 'option_text', 'is_correct'],
                          as: 'options'
                        }
                      ]
                    }
                  ],
                  required: false  // Añadir required: false para evitar filtrar módulos
                }
              ],
              required: false  // Añadir required: false para evitar filtrar cursos
            },
            {
              model: Evaluation,
              attributes: ['evaluation_id', 'name', 'description'],
              include: [
                {
                  model: Question,
                  attributes: ['question_id', 'question_text', 'score', 'image', 'question_text', 'evaluation_id', 'type_id'],
                  as: 'questions',
                  include: [
                    {
                      model: QuestionType,
                      attributes: ['type_id', 'name'],
                      as: 'questionType'
                    },
                    {
                      model: Option,
                      attributes: ['option_id', 'option_text', 'is_correct'],
                      as: 'options'
                    }
                  ]
                }
              ],
              required: false  // Añadir required: false para evitar filtrar módulos
            }
          ],
        });
        return coursesByStudent;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    
    async assignStudentsToCourseByEnterprise(enterprise_id, course_id) {
      try {
          // Verificar que la empresa exista
          const enterpriseExists = await Enterprise.findByPk(enterprise_id);
          if (!enterpriseExists) {
              throw new Error('Enterprise not found');
          }

          // Verificar que el curso exista
          const courseExists = await Course.findByPk(course_id);
          if (!courseExists) {
              throw new Error('Course not found');
          }

          // Obtener todos los estudiantes de la empresa
          const students = await User.findAll({
              where: { enterprise_id: enterprise_id, role_id: 1 },
              attributes: ['user_id']
          });

          if (students.length === 0) {
              throw new Error('No students found for the given enterprise');
          }

          // Verificar si ya están asignados al curso
          const existingAssignments = await CourseStudent.findAll({
              where: {
                  course_id: course_id,
                  user_id: students.map(student => student.user_id)
              },
              attributes: ['user_id']
          });

          const existingUserIds = existingAssignments.map(assignment => assignment.user_id);

          const courseStudents = students
              .filter(student => !existingUserIds.includes(student.user_id))
              .map(student => ({
                  course_id: course_id,
                  user_id: student.user_id,
                  is_approved: true
              }));

          if (courseStudents.length === 0) {
              throw new Error('All students are already assigned to the course');
          }

          // Crear las asignaciones en la tabla CourseStudent
          await CourseStudent.bulkCreate(courseStudents);

          return {
              assigned: courseStudents,
              alreadyAssigned: existingUserIds
          };
      } catch (error) {
          console.error('Error in assignStudentsToCourseByEnterprise service:', error);
          throw error;
      }
  }
}
module.exports = new CourseStudentService();
