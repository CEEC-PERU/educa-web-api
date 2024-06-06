const courseService = require('../../services/courseService');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
  const { name, description_short, description_large, category_id, professor_id, intro_video, image, duracion_curso, is_active, limit_date } = req.body;
  try {
    const newCourse = await courseService.createCourse({ name, description_short, description_large, category_id, professor_id, intro_video, image, duracion_curso, is_active, limit_date });
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
  const { name, description_short, description_large, category_id, professor_id, intro_video, image, duracion_curso, is_active, limit_date } = req.body;
  try {
    const updatedCourse = await courseService.updateCourse(courseId, { name, description_short, description_large, category_id, professor_id, intro_video, image, duracion_curso, is_active, limit_date });
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

exports.getCoursesWithModules = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const coursesWithModules = await courseService.getCoursesWithModules(campaign_id);
    res.json(coursesWithModules);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
