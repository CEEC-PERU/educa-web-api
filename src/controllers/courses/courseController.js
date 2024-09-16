const videoService = require('../../services/videos/videoService');
const imageService = require('../../services/images/imageService');
const courseService = require('../../services/courses/courseService');
const moduleService = require('../../services/courses/moduleService'); // Añadir el servicio de módulos
const fs = require('fs');

exports.createCourse = async (req, res) => {
  try {
    const videoFile = req.files['video'][0];
    const imageFile = req.files['image'][0];

    const videoUrl = await videoService.uploadVideo(videoFile.path, 'WEB-EDUCA/videos');
    const imageUrl = await imageService.uploadImage(imageFile.path, 'WEB-EDUCA');

    const newCourseData = {
      ...req.body,
      intro_video: videoUrl,
      image: imageUrl
    };

    const newCourse = await courseService.createCourse(newCourseData);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({ error: error.message });
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
  try {
    const imageFile = req.files ? req.files['image'][0] : null;
    const videoFile = req.files ? req.files['video'][0] : null;

    let imageUrl = req.body.image;
    let videoUrl = req.body.intro_video;

    if (imageFile) {
      imageUrl = await imageService.uploadImage(imageFile.path, 'Cursos/Images');
      fs.unlinkSync(imageFile.path);
    }

    if (videoFile) {
      videoUrl = await videoService.uploadVideo(videoFile.path, 'Cursos/Videos');
      fs.unlinkSync(videoFile.path);
    }

    const updatedCourseData = { ...req.body, image: imageUrl, intro_video: videoUrl };
    const updatedCourse = await courseService.updateCourse(req.params.id, updatedCourseData);

    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(400).json({ error: error.message });
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

exports.getModulesWithSessionsByCourse = async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  console.log(`Fetching modules for course ID: ${courseId}`); // Agregar mensaje de depuración
  try {
    const modules = await moduleService.getModulesByCourseId(courseId);
    console.log(`Modules fetched: ${JSON.stringify(modules)}`); // Agregar mensaje de depuración
    res.json(modules);
  } catch (error) {
    console.error('Error fetching modules by course ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};