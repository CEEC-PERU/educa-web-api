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
const CourseResult = require('../../models/EvaluationCourseResult'); // Asegúrate de que la ruta es correcta
const { Op, fn, col, literal, Sequelize } = require('sequelize');
const ModuleResult = require('../../models/EvaluationModuleResult');
const AppSession = require('../../models/appSessionModel');
const Profile = require('../../models/profileModel'); // Importar el modelo Profile
const Videos= require('../../models/videoModel'); 
const VideoInteractivo= require('../../models/videoInteractivo');

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
              attributes: ['name', 'is_active', 'module_id', 'evaluation_id', 'created_at'],
              as: 'courseModules',
              include: [
                {
                  model: UserModuleProgress,
                  attributes: ['is_completed', 'progress', 'user_id', 'user_module_progress_id'],
                  as: 'usermoduleprogress',
                  where: { user_id: user_id },
                  required: false
                },
                {
                  model: Session,
                  attributes: ['session_id', 'name',  'duracion_minutos', 'created_at'],
                  as: 'moduleSessions',
                  required: false,
                  include: [
                    {
                      model: Videos,
                      required: false
                    },
                    {
                      model : VideoInteractivo,
                      required: false,
                    },
                    {
                      model: UserSessionProgress,
                      as: 'usersessionprogress',
                      where: { user_id: user_id },
                      required: false
                    }
                  ]
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
                  required: false
                },
                {
                  model: ModuleResult,
                  attributes: ['evaluation_id', 'module_id', 'puntaje', 'user_id'],
                  where: { user_id: user_id },
                  required: false,
                  include: [
                    {
                      model: Evaluation,
                      attributes: ['evaluation_id', 'name', 'description'],
                      required: false
                    }
                  ]
                }
              ],
              required: false
            },
            
            {
              model: CourseResult,
              attributes: ['evaluation_id', 'course_id', 'puntaje',  'user_id', 'second_chance' ],
              where: { user_id: user_id },
              include: [
                {
                  model: Evaluation,
                  attributes: ['evaluation_id', 'name', 'description'],
                  required: false
                }
              ],
              required: false
            }
            ,
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
              required: false
            }
          ],
        });
    
        // Sorting the modules and sessions by created_at field
        coursesByStudent.forEach(course => {
          if (course.courseModules) {
            course.courseModules.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            course.courseModules.forEach(module => {
              if (module.moduleSessions) {
                module.moduleSessions.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                module.moduleSessions.forEach(session => {
                  if (session.Videos) {
                    session.Videos.sort((a, b) => a.orden - b.orden);
                  }
                });
              }
            });
          }
        });
    
        return coursesByStudent;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    
// calificaciones de modulos y cursos
async getModulesByCourseId2(course_id, user_id) {
  try {
      const coursesByStudent = await Course.findAll({
          where: { course_id: course_id },
          attributes: ['course_id', 'name', 'evaluation_id'],
          include: [
              {
                  model: Module,
                  attributes: ['name', 'is_active', 'module_id', 'evaluation_id', 'created_at'],
                  as: 'courseModules',
                  include: [
                      {
                          model: ModuleResult,
                          attributes: ['evaluation_id', 'module_id', 'puntaje', 'user_id'],
                          where: { user_id: user_id },
                          required: false,
                          include: [
                              {
                                  model: Evaluation,
                                  attributes: ['evaluation_id', 'name', 'description'],
                                  required: false
                              }
                          ]
                      }
                  ],
                  required: false
              },
              {
                  model: Evaluation,
                  attributes: ['evaluation_id', 'name', 'description'],
                  include: [
                      {
                          model: CourseResult,
                          attributes: ['evaluation_id', 'course_id', 'puntaje', 'user_id'],
                          where: { user_id: user_id },
                          required: false
                      }
                  ],
                  required: false
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

  async getAssignedStudentsByCourseId(course_id) {
    try {
        const assignedStudents = await CourseStudent.findAll({
            where: { course_id },
            include: [{
                model: User,
                attributes: ['user_id'],
                include: [{
                    model: Profile,
                    attributes: ['first_name', 'last_name', 'email'],
                    as: 'userProfile'
                }]
            }]
        });
        return assignedStudents.map(cs => cs.user);
    } catch (error) {
        console.error('Error fetching assigned students:', error);
        throw error;
    }
  }

  async getUnassignedStudents(course_id, enterprise_id) {
    // Obtener los estudiantes asignados
    const assignedStudents = await CourseStudent.findAll({
        where: { course_id },
        attributes: ['user_id']
    });
    const assignedStudentIds = assignedStudents.map(student => student.user_id);

    // Obtener los estudiantes no asignados
    const unassignedStudents = await User.findAll({
        where: {
            enterprise_id,
            role_id: 1, // role_id para estudiantes
            user_id: {
                [Op.notIn]: assignedStudentIds
            }
        },
        include: [{
            model: Profile,
            as: 'userProfile'
        }]
    });

    return unassignedStudents;
  }
  
  async getCoursesByEnterprise(enterprise_id) {
    try {
        const courses = await Course.findAll({
            include: [
                {
                    model: CourseStudent,
                    attributes: [],
                    include: [
                        {
                            model: User,
                            where: { enterprise_id },
                            attributes: []
                        }
                    ],
                    required: true
                }
            ],
            attributes: [
                'course_id',
                'name',
                'description_short',
                'image', // Incluir el atributo 'image'
                [Sequelize.fn('COUNT', Sequelize.col('CourseStudents.user_id')), 'studentCount'],
                [Sequelize.fn('AVG', Sequelize.col('CourseStudents.progress')), 'avgProgress'],
                [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "CourseStudents".progress = 100 THEN 1 ELSE NULL END')), 'completedCount'],
                [Sequelize.fn('COUNT', Sequelize.literal('CASE WHEN "CourseStudents".is_approved = true THEN 1 ELSE NULL END')), 'approvedCount']
            ],
            group: ['Course.course_id']
        });

        console.log('Fetched courses:', courses);  // Agregar este console.log para verificar los datos

        return courses.map(course => {
            const studentCount = parseInt(course.dataValues.studentCount, 10) || 0;
            const avgProgress = parseFloat(course.dataValues.avgProgress) || 0;
            const completedCount = parseInt(course.dataValues.completedCount, 10) || 0;
            const approvedCount = parseInt(course.dataValues.approvedCount, 10) || 0;

            return {
                course_id: course.course_id,
                name: course.name,
                description_short: course.description_short,
                image: course.image, // Incluir el atributo 'image' en el resultado
                studentCount,
                progressPercentage: Math.min(avgProgress, 99),
                completedPercentage: studentCount > 0 ? Math.min((completedCount / studentCount) * 100, 100) : 0,
                approvedPercentage: studentCount > 0 ? Math.min((approvedCount / studentCount) * 100, 100) : 0
            };
        });
    } catch (error) {
        console.error('Error fetching courses by enterprise:', error);
        throw error;
    }
}

async getUsersByEnterpriseWithSessions(enterpriseId, startDate, endDate) {
  try {
    const users = await User.findAll({
      where: { enterprise_id: enterpriseId, role_id: 1 },
      include: [
        {
          model: Profile,
          attributes: ['profile_id', 'first_name', 'last_name', 'email', 'profile_picture'],
          as: 'userProfile'
        },
        {
          model: AppSession,
          as: 'appSessions',
          attributes: [],
          where: {
            start_time: {
              [Op.gte]: startDate,
              [Op.lte]: endDate
            }
          },
          required: false
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('appSessions.appsession_id')), 'loginCount']
        ]
      },
      group: ['User.user_id', 'userProfile.profile_id', 'userProfile.first_name', 'userProfile.last_name', 'userProfile.email', 'userProfile.profile_picture']
    });

    return users.map(user => ({
      id: user.user_id,
      loginCount: user.dataValues.loginCount,
      first_name: user.userProfile?.first_name,
      last_name: user.userProfile?.last_name,
      email: user.userProfile?.email,
      profile_picture: user.userProfile?.profile_picture
    }));
  } catch (error) {
    console.error('Error fetching users by enterprise:', error);
    throw error;
  }
}


  async getStudentsByEnterprise(enterprise_id) {
    try {
        const students = await User.findAll({
            where: { enterprise_id, role_id: 1 },
            include: [
                {
                    model: Profile,
                    attributes: ['first_name', 'last_name', 'email', 'profile_picture'],
                    as: 'userProfile'
                }
            ]
        });

        return students.map(student => ({
            user_id: student.user_id,
            first_name: student.userProfile?.first_name,
            last_name: student.userProfile?.last_name,
            email: student.userProfile?.email,
            profile_picture: student.userProfile?.profile_picture
        }));
    } catch (error) {
        console.error('Error fetching students by enterprise:', error);
        throw error;
    }
}

async getCoursesWithGradesByStudent(user_id) {
  try {
      const courses = await Course.findAll({
          include: [{
              model: CourseStudent,
              where: { user_id },
              attributes: ['progress', 'finished_date', 'is_approved']
          }],
          attributes: ['course_id', 'name', 'description_short', 'image']
      });

      return courses.map(course => ({
          course_id: course.course_id,
          name: course.name,
          description_short: course.description_short,
          image: course.image,  // Asegúrate de incluir la imagen aquí
          progress: course.CourseStudents[0].progress,
          finished_date: course.CourseStudents[0].finished_date,
          is_approved: course.CourseStudents[0].is_approved
      }));
  } catch (error) {
      console.error('Error fetching courses with grades by student:', error);
      throw error;
  }
}

  
  
}

module.exports = new CourseStudentService();
