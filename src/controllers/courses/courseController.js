const videoService = require('../../services/videos/videoService');
const imageService = require('../../services/images/imageService');
const courseService = require('../../services/courses/courseService');
const { createCourse, updateCourse } = require('../../services/courses/courseService');
const moduleService = require('../../services/courses/moduleService'); // Añadir el servicio de módulos
const fs = require('fs');

// Otros controladores...

exports.uploadCourseVideo = async (req, res) => {
  try {
    const videoPath = req.file.path;
    const videoUrl = await videoService.uploadVideo(videoPath, 'Cursos/Videos');
    
    fs.unlinkSync(videoPath); // Elimina el archivo local después de subirlo a Cloudinary
    
    res.json({ url: videoUrl });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(400).json({ error: 'Error uploading video' });
  }
};

exports.uploadCourseImage = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageUrl = await imageService.uploadImage(imagePath, 'Cursos/Images');
    
    fs.unlinkSync(imagePath); // Elimina el archivo local después de subirlo a Cloudinary
    
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(400).json({ error: 'Error uploading image' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await createCourse(req.body);
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
    const updatedCourse = await updateCourse(req.params.id, req.body);
    res.status(200).json(updatedCourse);
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