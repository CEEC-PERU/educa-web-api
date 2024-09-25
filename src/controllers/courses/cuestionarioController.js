// src/controllers/sessionController.js
const cuestionarioService = require('../../services/courses/CuestionarioService');

exports.createCuestionario = async (req, res) => {
  try {
    const newCuestionario = await  cuestionarioService.createCuestionario(req.body);
    res.status(201).json(newCuestionario);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Error creating session' });
  }
};

exports.getAllCuestionario = async (req, res) => {
  try {
    const cuestionarios = await  cuestionarioService.getAllCuestionario();
    res.json(cuestionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getCuestionarioById = async (req, res) => {
  const id = req.params.id;
  try {
    const cuestionario = await  cuestionarioService.getCuestionarioById(id);
    if (cuestionario) {
      res.json(cuestionario);
    } else {
      res.status(404).json({ error: 'Cuestionario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCuestionario = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCuestionario = await  cuestionarioService.updateCuestionario(id, req.body);
    if (updatedCuestionario) {
      res.json(updatedCuestionario);
    } else {
      res.status(404).json({ error: 'Cuestionario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCuestionario = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCuestionario = await  cuestionarioService.deleteCuestionario(id);
    if (deletedCuestionario) {
      res.json({ message: 'Cuestionario deleted' });
    } else {
      res.status(404).json({ error: 'Cuestionario not found' });
    }
  } catch (error) {
    console.error('Error deleting cuestionario:', error);
    res.status(500).json({ error: 'Error deleting session' });
  }
};


// Obtener Cuestionarios por course_id y cuestype_id desde los parámetros de la URL
exports.getCuestionarioByCourseAndType = async (req, res) => {
    const { course_id, cuestype_id } = req.params; // Los parámetros se extraen de req.params
    try {
      const cuestionarios = await cuestionarioService.getCuestionarioByCourseAndType(course_id, cuestype_id);
      if (cuestionarios.length > 0) {
        res.json(cuestionarios);
      } else {
        res.status(404).json({ error: 'No cuestionarios found for the specified course and type' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  