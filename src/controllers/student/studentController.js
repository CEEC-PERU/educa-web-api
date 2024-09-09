const { Op } = require('sequelize');
const Module = require('./../../models/moduleModel');
const UserModuleProgress = require('./../../models/UserModuleProgress');
const CourseStudent = require('./../../models/courseStudent'); // Modelo del curso-estudiante


const actualizarProgresoCurso = async (userId, courseId) => {
    try {
        // Obtener todos los módulos del curso
        const modulosCurso = await Module.findAll({
            where: { course_id: courseId },
            attributes: ['module_id'],
        });

        const totalModulos = modulosCurso.length;

        if (totalModulos === 0) {
            console.log(`El curso con ID ${courseId} no tiene módulos asignados.`);
            return; // Salir de la función si el curso no tiene módulos
        }

        // Obtener el progreso del usuario en cada módulo del curso
        const progresoModulos = await UserModuleProgress.findAll({
            where: {
                user_id: userId,
                module_id: modulosCurso.map(modulo => modulo.module_id),
            },
            attributes: ['progress'], // Solo nos interesa el progreso de cada módulo
        });

        // Sumar el progreso total
        const progresoTotal = progresoModulos.reduce((total, item) => {
            return total + item.progress;
        }, 0);

        // Calcular el promedio de progreso y redondear a entero
        const progresoPromedio = Math.round(progresoTotal / totalModulos);

        // Actualizar el progreso en la tabla CourseStudent
        await CourseStudent.update(
            { progress: progresoPromedio },
            {
                where: {
                    user_id: userId,
                    course_id: courseId,
                },
            }
        );

        console.log(`Progreso del curso ${courseId} para el usuario ${userId} actualizado a ${progresoPromedio}%`);
    } catch (error) {
        console.error('Error al actualizar el progreso del curso:', error);
    }
};


const actualizarProgresoTodos = async () => {
    try {
        // Obtener todas las combinaciones de user_id y course_id de la tabla CourseStudent
        const cursosEstudiantes = await CourseStudent.findAll({
            attributes: ['user_id', 'course_id'],
        });

        if (cursosEstudiantes.length === 0) {
            console.log('No hay usuarios registrados en cursos.');
            return;
        }

        // Iterar sobre cada combinación de usuario y curso y actualizar su progreso
        for (const cursoEstudiante of cursosEstudiantes) {
            const { user_id, course_id } = cursoEstudiante;
            await actualizarProgresoCurso(user_id, course_id); // Actualizamos el progreso del curso para este usuario
        }

        console.log('Progreso de todos los usuarios en sus cursos actualizado.');
    } catch (error) {
        console.error('Error al actualizar el progreso de los usuarios en sus cursos:', error);
    }
};



module.exports = {
   actualizarProgresoCurso,
   actualizarProgresoTodos
  };
