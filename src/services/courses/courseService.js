const Course = require('../../models/courseModel');
const Professor = require('../../models/professorModel');

const sequelize = require('sequelize');

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

exports.getCursoDetalleById = async (courseId) => {
  try {
    return await Course.findByPk(courseId);
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching course details');
  }
};

exports.getCourseById = async (courseId) => {
  try {
    return await Course.findByPk(courseId);
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

exports.authService = async function({ dni, password }) {
  try {
      const userFound = await User.findOne({ where: { dni } });
      if (!userFound)
          return { code: 401, msg: "Usuario ó Contraseña inválida" };

      if (userFound.is_blocked) {
          return { code: 401, msg: 'Cuenta bloqueada' };
      }

      const matchPassword = await User.comparePassword(password, userFound.password);

      if (!matchPassword) {
          await handleFailedLoginAttempt(userFound);
          let attemptsRestant = 5 - userFound.failed_login_attempts;
          return { code: 401, msg: "Usuario ó Contraseña inválida", possibleAttemps: attemptsRestant };
      }

      await resetFailedLoginAttempts(userFound);

      const token = jwt.sign(
          {
              id: userFound.user_id,
              role: userFound.role_id, // Incluir el rol del usuario en el token
              dni: userFound.dni,
              enterprise_id: userFound.enterprise_id,
              loginTime: new Date()
          },
          JWT_SECRET,
          { expiresIn: '24h' }
      );

      return { token };

  } catch (error) {
      console.log(error);
  }
};

exports.getAllProfessors = async () => {
  try {
    return await Professor.findAll({
      attributes: ['professor_id', 'image', 'especialitation', 'full_name', 'description'],
    });
  } catch (error) {
    console.error('Error fetching professors:', error);
    throw new Error('Error fetching professors');
  }
};