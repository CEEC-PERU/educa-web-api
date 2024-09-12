

const Course = require('../../models/courseModel');
const Module = require('../../models/moduleModel');
const EvaluationCourse = require('../../models/EvaluationCourseResult');
const EvaluationModule = require('../../models/EvaluationModuleResult');
const User = require('../../models/UserModel');
const CourseStudent = require('../../models/courseStudent');
const AppSession = require('../../models/appSessionModel');
const Profile = require('../../models/profileModel');
const { sequelize } = require('../../config/database');
const { Op } = require('sequelize');
const ExcelJS = require('exceljs');

const { DataTypes } = require('sequelize');


exports.getCourseGrades = async (req, res) => {
    const { enterpriseId, courseId } = req.params;

    try {
        // Fecha de inicio y fin del curso
        const courseStartDate = new Date('2024-09-11');
        const courseEndDate = new Date('2024-09-13');

        // Obtener los usuarios asignados a este curso
        const users = await User.findAll({
            attributes: ['user_id', 'enterprise_id', 'role_id'],
            where: { enterprise_id: enterpriseId, role_id: 1, is_active: true },
            include: [
                {
                    model: Profile, // Datos del perfil del usuario
                    attributes: ['first_name', 'last_name', 'email', 'phone'],
                    as: 'userProfile',
                    required: true
                },
                {
                    model: CourseStudent, // Asegurar que el usuario esté inscrito en el curso
                    attributes: ['course_id', 'user_id', 'created_at', 'finished_date'],
                    where: { course_id: courseId },
                    required: true
                },
                {
                    model: EvaluationCourse, // Evaluación del curso (examen final)
                    attributes: ['course_id', 'puntaje', 'course_result_id', 'created_at'],
                    order: [['created_at', 'ASC']],
                    where: { course_id: courseId },
                    required: false,
                    include: [
                        {
                            model: Course,
                            attributes: ['course_id', 'name'],
                        }
                    ]
                },
                {
                    model: EvaluationModule, // Evaluaciones de cada módulo
                    attributes: ['puntaje', 'created_at', 'module_result_id'],
                    order: [['created_at', 'ASC']],
                    required: false,
                    include: [
                        {
                            model: Module, // Incluir módulos del curso
                            attributes: ['name', 'module_id'],
                        }
                    ]
                },
                {
                    model: AppSession, // Número de sesiones en el rango de fechas del curso
                    attributes: ['start_time', 'end_time'],
                    as: 'appSessions',
                    where: {
                        start_time: {
                            [Op.between]: [courseStartDate, courseEndDate]
                        }
                    },
                    required: false
                }
            ]
        });

        // Procesar resultados
        const mergedUsers = users.map(user => {
            // Verificar si hay evaluaciones modulares antes de usar reduce
            const moduleResults = user.ModuleResults.reduce((acc, moduleResult) => {
                const moduleId = moduleResult.Module.module_id;
  
                if (!acc[moduleId]) {
                    acc[moduleId] = {
                        module_id: moduleId,
                        module_name: moduleResult.Module.name,
                        results: []
                    };
                }
  
                acc[moduleId].results.push({
                    puntaje: moduleResult.puntaje,
                    created_at: moduleResult.created_at
                });
  
                return acc;
            }, {});


            

             const mergedUsers = users.map(user => {
            const moduleResults = user.ModuleResults.reduce((acc, moduleResult) => {
                const moduleId = moduleResult.Module.module_id;
  
                if (!acc[moduleId]) {
                    acc[moduleId] = {
                        module_id: moduleId,
                        module_name: moduleResult.Module.name,
                        results: []
                    };
                }
  
                acc[moduleId].results.push({
                    puntaje: moduleResult.puntaje,
                    created_at: moduleResult.created_at
                });
  
                return acc;
            }, {});
  
            const mergedModuleResults = Object.values(moduleResults).map(module => {
                module.results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                return module;
            });
  
            const completeModulesCount = mergedModuleResults.length;
  
            return {
                ...user.toJSON(),
                ModuleResults: mergedModuleResults,
                completeModulesCount
            };
        });

            // Convertir a array y ordenar resultados de cada módulo por fecha de creación
            const mergedModuleResults = Object.values(moduleResults).map(module => {
                module.results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

                // Obtener la nota más alta y el primer intento
                const highestScore = Math.max(...module.results.map(result => parseFloat(result.puntaje) || 0));
                const firstAttemptScore = parseFloat(module.results[0]?.puntaje || 0);

                // Asignar estado según las reglas
                let status = '';
                if (highestScore >= 18) status = 'Notable';
                else if (highestScore >= 16) status = 'Aprobado';
                else if (highestScore >= 13) status = 'Refuerzo';
                else status = 'Desaprobado';

                // Guardar estado y nota máxima
                return {
                    ...module,
                    highest_score: highestScore,
                    first_attempt_score: firstAttemptScore,
                    status
                };
            });

            // Contar módulos completos y calcular intentos de examen
            const completeModulesCount = mergedModuleResults.length;
            const examAttempts = user.EvaluationCourses ? user.EvaluationCourses.length > 1 ? 2 : 1 : 0;

            // Información final del usuario
            return {
                ...user.toJSON(),
                ModuleResults: mergedModuleResults,
                completeModulesCount,
                examAttempts,
                totalSessions: user.appSessions ? user.appSessions.length : 0  // Número de sesiones en el rango
            };
        });

        // Ordenar usuarios: módulos completos y puntaje máximo
        mergedUsers.sort((a, b) => {
            if (b.completeModulesCount !== a.completeModulesCount) {
                return b.completeModulesCount - a.completeModulesCount;
            }

            const maxScoreA = Math.max(...a.ModuleResults.flatMap(module => module.results.map(result => parseFloat(result.puntaje) || 0)));
            const maxScoreB = Math.max(...b.ModuleResults.flatMap(module => module.results.map(result => parseFloat(result.puntaje) || 0)));

            return maxScoreB - maxScoreA;
        });

        res.json(mergedUsers);
    } catch (error) {
        console.error('Error obteniendo las notas del curso:', error);
        res.status(500).json({ error: 'Error al obtener las notas del curso' });
    }
};


exports.getCourseGradesbyUserId = async (req, res) => {
    const { enterpriseId, courseId , userId } = req.params;

    try {
        // Fetch all users who are assigned to the specific course
        const users = await User.findAll({
            attributes: ['user_id', 'enterprise_id', 'role_id' ],
            where: { enterprise_id: enterpriseId, role_id: 1, is_active: true  , user_id : userId},
            include: [
                {
                    model: Profile, // Get user's name
                    attributes: ['first_name', 'last_name', 'email'  , 'phone'],
                    as: 'userProfile',
                    required: true
                },
                {
                    model: CourseStudent, // Ensure that the user is part of the course
                    attributes: ['course_id', 'user_id'],
                    where: { course_id: courseId },
                    required: true // This makes sure only users enrolled in this course are included
                },
                {
                    model: EvaluationCourse, // Course evaluation by user
                    attributes: ['course_id', 'puntaje', 'course_result_id', 'created_at'],
                    order: [['created_at', 'ASC']],
                    where: { course_id: courseId },
                    required: false, // Allow user to appear even without course results
                    include: [
                        {
                            model: Course,
                            attributes: ['course_id', 'name'],
                        }
                    ]
                },
                {
                    model: EvaluationModule, // Evaluations for each module
                    attributes: ['puntaje', 'created_at', 'module_result_id'],
                    order: [['created_at', 'ASC']], // Order by date
                    required: false, // Allow user to appear even without module results
                    include: [
                        {
                            model: Module, // Include course modules
                            attributes: ['name', 'module_id'],
                        }
                    ]
                }
            ]
        });

        // Process the results to merge module results with the same module_id
        const mergedUsers = users.map(user => {
            const moduleResults = user.ModuleResults.reduce((acc, moduleResult) => {
                const moduleId = moduleResult.Module.module_id;

                if (!acc[moduleId]) {
                    acc[moduleId] = {
                        module_id: moduleId,
                        module_name: moduleResult.Module.name,
                        results: []
                    };
                }

                // Push the result with puntaje and created_at into the results array
                acc[moduleId].results.push({
                    puntaje: moduleResult.puntaje,
                    created_at: moduleResult.created_at
                });

                return acc;
            }, {});

            // Convert the object back to an array and sort each module's results by created_at
            const mergedModuleResults = Object.values(moduleResults).map(module => {
                module.results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                return module;
            });

            // Count the number of complete modules
            const completeModulesCount = mergedModuleResults.length;

            // Return the user with the merged and sorted module results and complete module count
            return {
                ...user.toJSON(),
                ModuleResults: mergedModuleResults,
                completeModulesCount // Add the count of complete modules
            };
        });

        // Sort users by the number of complete modules and then by their highest score
        mergedUsers.sort((a, b) => {
            // First, sort by number of complete modules (descending)
            if (b.completeModulesCount !== a.completeModulesCount) {
                return b.completeModulesCount - a.completeModulesCount;
            }

            // If the number of complete modules is the same, sort by the highest score (descending)
            const maxScoreA = Math.max(...a.ModuleResults.flatMap(module => module.results.map(result => parseFloat(result.puntaje) || 0)));
            const maxScoreB = Math.max(...b.ModuleResults.flatMap(module => module.results.map(result => parseFloat(result.puntaje) || 0)));

            return maxScoreB - maxScoreA;
        });

        res.json(mergedUsers);
    } catch (error) {
        console.error('Error obteniendo las notas del curso:', error);
        res.status(500).json({ error: 'Error al obtener las notas del curso' });
    }
};

exports.downloadCourseGradesExcel = async (req, res) => {
    const { enterpriseId, courseId } = req.params;
  
    try {
        const users = await User.findAll({
            attributes: ['user_id', 'enterprise_id', 'role_id'],
            where: { enterprise_id: enterpriseId, role_id: 1, is_active: true },
            include: [
                {
                    model: Profile,
                    attributes: ['first_name', 'last_name', 'email', 'phone'],
                    as: 'userProfile',
                    required: true
                },
                {
                  model: CourseStudent, // Ensure that the user is part of the course
                  attributes: ['course_id', 'user_id'],
                  where: { course_id: courseId },
                  required: true // This makes sure only users enrolled in this course are included
              },
                {
                    model: EvaluationCourse,
                    attributes: ['course_id', 'puntaje', 'course_result_id', 'created_at'],
                    order: [['created_at', 'ASC']],
                    where: { course_id: courseId },
                    required: false,
                    include: [
                        {
                            model: Course,
                            attributes: ['course_id', 'name'],
                        }
                    ]
                },
                {
                    model: EvaluationModule,
                    attributes: ['puntaje', 'created_at', 'module_result_id'],
                    order: [['created_at', 'ASC']],
                    required: false,
                    include: [
                        {
                            model: Module,
                            attributes: ['name', 'module_id'],
                        }
                    ]
                }
            ]
        });
  
        const mergedUsers = users.map(user => {
            const moduleResults = user.ModuleResults.reduce((acc, moduleResult) => {
                const moduleId = moduleResult.Module.module_id;
  
                if (!acc[moduleId]) {
                    acc[moduleId] = {
                        module_id: moduleId,
                        module_name: moduleResult.Module.name,
                        results: []
                    };
                }
  
                acc[moduleId].results.push({
                    puntaje: moduleResult.puntaje,
                    created_at: moduleResult.created_at
                });
  
                return acc;
            }, {});
  
            const mergedModuleResults = Object.values(moduleResults).map(module => {
                module.results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                return module;
            });
  
            const completeModulesCount = mergedModuleResults.length;
  
            return {
                ...user.toJSON(),
                ModuleResults: mergedModuleResults,
                completeModulesCount
            };
        });
  
        mergedUsers.sort((a, b) => {
            if (b.completeModulesCount !== a.completeModulesCount) {
                return b.completeModulesCount - a.completeModulesCount;
            }
  
            const maxScoreA = Math.max(...a.ModuleResults.flatMap(module => module.results.map(result => parseFloat(result.puntaje) || 0)));
            const maxScoreB = Math.max(...b.ModuleResults.flatMap(module => module.results.map(result => parseFloat(result.puntaje) || 0)));
  
            return maxScoreB - maxScoreA;
        });
  
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Notas del Curso');
  
        // Determine maximum number of attempts for modules and exams
        const maxModuleAttempts = Math.max(...mergedUsers.flatMap(user => user.ModuleResults.map(module => module.results.length)));
        const maxExamAttempts = Math.max(...mergedUsers.flatMap(user => user.CourseResults.length));
  
        // Create header row with email and phone
        worksheet.addRow([
            'Nombre del Estudiante', 
            'Email', 
            'Teléfono', 
            ...mergedUsers[0]?.ModuleResults.flatMap(module => 
                Array.from({ length: maxModuleAttempts }).map((_, i) => `Módulo: ${module.module_name} Intento ${i + 1}`)), 
            ...Array.from({ length: maxExamAttempts }).map((_, i) => `Examen Final Nota ${i + 1}`)
        ]);
  
        mergedUsers.forEach(user => {
            // Create data row for each user including email and phone
            const row = [
                `${user.userProfile.first_name} ${user.userProfile.last_name}`,
                user.userProfile.email,
                user.userProfile.phone,
                ...user.ModuleResults.flatMap(module => {
                    const results = module.results.map(result => result.puntaje);
                    return [...results, ...Array(maxModuleAttempts - results.length).fill('-')];
                }),
                ...user.CourseResults.map(result => result.puntaje || '-')
            ];
  
            worksheet.addRow(row);
        });
  
        res.setHeader('Content-Disposition', 'attachment; filename=course_grades.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error generando el archivo Excel:', error);
        res.status(500).json({ error: 'Error al generar el archivo Excel' });
    }
  };
  