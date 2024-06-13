const videoService = require('../../services/videos/videoService');
const courseService = require('../../services/courses/courseService');

const fs = require('fs');

exports.uploadCourseVideo = async (req, res) => {
  try {
    const videoPath = req.file.path;
    const videoUrl = await videoService.uploadVideo(videoPath);
    
    // Elimina el archivo local después de subirlo a Cloudinary
    fs.unlinkSync(videoPath);
    
    res.json({ url: videoUrl });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(400).json({ error: 'Error uploading video' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { name, description_short, description_large, category_id, professor_id, duration_video, image, duration_course, is_active } = req.body;
    const intro_video = req.body.intro_video; // URL del video cargado

    const newCourse = await courseService.createCourse({
      name,
      description_short,
      description_large,
      category_id,
      professor_id,
      intro_video,
      duration_video,
      image,
      duration_course,
      is_active
    });

    res.status(201).json({
      message: "Curso creado exitosamente",
      newCourse
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


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
