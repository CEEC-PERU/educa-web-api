const courseService = require('../../services/courses/courseService');
const Course = require('../../models/courseModel');
const Professor = require('../../models/professorModel');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCursoDetalleById = async (req, res) => {
  const courseId = req.params.id;
  try {
    const curso = await courseService.getCourseById(courseId);
    if (curso) {
      res.json(curso);
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getCourseById = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await courseService.getCourseById(courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await courseService.createCourse(req.body);
    res.status(201).json({
      message: "Curso creado exitosamente",
      newCourse
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const updatedCourse = await courseService.updateCourse(courseId, req.body);
    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const deletedCourse = await courseService.deleteCourse(courseId);
    if (deletedCourse) {
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllProfessors = async (req, res) => {
  try {
    const professors = await professorService.getAllProfessors();
    res.json(professors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
