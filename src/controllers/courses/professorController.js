const professorService = require('../../services/courses/professorService');
const imageService = require('../../services/images/imageService');
const fs = require('fs');

exports.uploadProfessorImage = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageUrl = await imageService.uploadImage(imagePath, 'Profesores');
    
    fs.unlinkSync(imagePath); // Elimina el archivo local después de subirlo a Cloudinary
    
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(400).json({ error: 'Error uploading image' });
  }
};

exports.createProfessor = async (req, res) => {
  try {
    const { full_name, especialitation, description, level_id } = req.body;
    let imageUrl = req.body.image; // URL de la imagen cargada

    if (req.file) {
      const imagePath = req.file.path;
      imageUrl = await imageService.uploadImage(imagePath, 'Profesores');
      fs.unlinkSync(imagePath); // Elimina el archivo local después de subirlo
    }

    const newProfessor = await professorService.createProfessor({
      full_name,
      especialitation,
      description,
      level_id,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Profesor creado exitosamente",
      newProfessor
    });
  } catch (error) {
    console.error('Error creating professor:', error);
    res.status(500).json({ error: 'Error creating professor' });
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

exports.updateProfessor = async (req, res) => {
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
};

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
