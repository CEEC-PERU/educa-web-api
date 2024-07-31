const professorService = require('../../services/courses/professorService');
const imageService = require('../../services/images/imageService');
const fs = require('fs');

exports.createProfessor = async (req, res) => {
  try {
    const imageFile = req.files['image'][0];
    const imageUrl = await imageService.uploadImage(imageFile.path, 'Profesores');

    const newProfessorData = {
      ...req.body,
      image: imageUrl
    };

    const newProfessor = await professorService.createProfessor(newProfessorData);
    res.status(201).json(newProfessor);
  } catch (error) {
    console.error('Error creating professor:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfessor = async (req, res) => {
  try {
    const imageFile = req.files ? req.files['image'][0] : null;
    const imageUrl = imageFile ? await imageService.uploadImage(imageFile.path, 'Profesores') : req.body.image;
    if (imageFile) fs.unlinkSync(imageFile.path); // Elimina el archivo local después de subirlo

    const updatedProfessorData = { ...req.body, image: imageUrl };
    const updatedProfessor = await professorService.updateProfessor(req.params.id, updatedProfessorData);

    if (updatedProfessor) {
      res.json(updatedProfessor);
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    console.error('Error updating professor:', error);
    res.status(400).json({ error: error.message });
  }
};


exports.getAllProfessors = async (req, res) => {
  try {
    const professors = await professorService.getAllProfessors();
    res.json(professors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessorById = async (req, res) => {
  try {
    const professor = await professorService.getProfessorById(req.params.id);
    if (professor) {
      res.json(professor);
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*exports.updateProfessor = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;
    const imageUrl = imagePath ? await imageService.uploadImage(imagePath, 'Profesores') : req.body.image;
    if (imagePath) fs.unlinkSync(imagePath); // Elimina el archivo local después de subirlo
    const updatedProfessor = await professorService.updateProfessor(req.params.id, { ...req.body, image: imageUrl });
    if (updatedProfessor) {
      res.json(updatedProfessor);
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    console.error('Error updating professor:', error);
    res.status(500).json({ error: 'Error updating professor' });
  }
};*/

exports.deleteProfessor = async (req, res) => {
  try {
    const deleted = await professorService.deleteProfessor(req.params.id);
    if (deleted) {
      res.json({ message: 'Professor deleted' });
    } else {
      res.status(404).json({ error: 'Professor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllLevels = async (req, res) => {
  try {
    const levels = await professorService.getAllLevels();
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
