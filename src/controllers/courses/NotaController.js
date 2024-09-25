

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
    const { enterpriseId, courseId, userId } = req.params;

    try {
        // Buscar usuarios asignados al curso específico
        const users = await User.findAll({
            attributes: ['user_id', 'enterprise_id', 'role_id'], // Solo los campos necesarios
            where: {
                enterprise_id: enterpriseId,
                role_id: 1, // Solo usuarios con role_id 1
                is_active: true, // Solo usuarios activos
                user_id: userId // Filtrar por userId
            },
            include: [
                {
                    model: Profile, // Relación con el perfil del usuario
                    attributes: ['first_name', 'last_name', 'email', 'phone'],
                    as: 'userProfile',
                    required: true // Debe haber un perfil
                },
                {
                    model: CourseStudent, // Verificar si el usuario está inscrito en el curso
                    attributes: ['course_id', 'user_id'],
                    where: { course_id: courseId }, // Filtrar por curso
                    required: true // El usuario debe estar inscrito
                },
                {
                    model: EvaluationCourse, // Evaluaciones del curso realizadas por el usuario
                    attributes: ['course_id', 'puntaje', 'course_result_id', 'created_at'],
                    order: [['created_at', 'ASC']],
                    where: { course_id: courseId }, // Solo evaluaciones del curso específico
                    required: false,
                    include: [
                        {
                            model: Course, // Información adicional del curso
                            attributes: ['course_id', 'name'],
                        }
                    ]
                },
                {
                    model: EvaluationModule, // Evaluaciones por módulo
                    attributes: ['puntaje', 'created_at', 'module_result_id'],
                    order: [['created_at', 'ASC']],
                    required: false, // La evaluación del módulo es opcional
                    include: [
                        {
                            model: Module, // Detalles del módulo
                            attributes: ['name', 'module_id'],
                            include: [
                                {
                                    model: Course, // Relación con el curso
                                    attributes: ['course_id', 'name'],
                                    as: 'moduleCourse',
                                    where: { course_id: courseId }, // Solo módulos de este curso
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        // Procesar los resultados para combinar evaluaciones por módulos
        const mergedUsers = users.map(user => {
            const moduleResults = user.ModuleResults.reduce((acc, moduleResult) => {
                // Verificar si el moduleResult.Module existe y tiene module_id válido
                const moduleId = moduleResult?.Module?.module_id;
                if (!moduleId) return acc; // Ignorar si no tiene module_id

                // Si no existe el módulo en el acumulador, lo agregamos
                if (!acc[moduleId]) {
                    acc[moduleId] = {
                        module_id: moduleId,
                        module_name: moduleResult.Module.name,
                        results: [] // Inicializamos los resultados
                    };
                }

                // Añadimos el resultado con el puntaje y la fecha
                acc[moduleId].results.push({
                    puntaje: moduleResult.puntaje,
                    created_at: moduleResult.created_at
                });

                return acc;
            }, {});

            // Convertir los resultados del módulo en un array y ordenarlos por fecha
            const mergedModuleResults = Object.values(moduleResults).map(module => {
                module.results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                return module;
            });

            // Contar el número de módulos completados
            const completeModulesCount = mergedModuleResults.length;

            // Devolver el usuario con los resultados procesados y el conteo de módulos completados
            return {
                ...user.toJSON(),
                ModuleResults: mergedModuleResults,
                completeModulesCount
            };
        });

        // Ordenar usuarios por número de módulos completados y puntaje más alto
        mergedUsers.sort((a, b) => {
            // Ordenar por módulos completados en orden descendente
            if (b.completeModulesCount !== a.completeModulesCount) {
                return b.completeModulesCount - a.completeModulesCount;
            }

            // Si tienen el mismo número de módulos, ordenar por el puntaje más alto
            const maxScoreA = Math.max(...a.ModuleResults.flatMap(module => module.results.map(result => parseFloat(result.puntaje) || 0)));
            const maxScoreB = Math.max(...b.ModuleResults.flatMap(module => module.results.map(result => parseFloat(result.puntaje) || 0)));

            return maxScoreB - maxScoreA;
        });

        // Responder con los usuarios procesados
        res.json(mergedUsers);
    } catch (error) {
        // En caso de error, registrarlo en consola y devolver un estado 500
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
  