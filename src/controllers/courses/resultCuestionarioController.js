const ResultCuestionarioService = require('../../services/courses/resultcuestionarioService');

class ResultCuestionarioController {
  // Crear un nuevo resultado
  async create(req, res) {
    try {
      const result = await ResultCuestionarioService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Obtener todos los resultados
  async findAll(req, res) {
    try {
      const results = await ResultCuestionarioService.findAll();
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Obtener un resultado por ID
  async findById(req, res) {
    try {
      const result = await ResultCuestionarioService.findById(req.params.id);
      if (!result) return res.status(404).json({ message: 'Resultado no encontrado' });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //Buscar por course_id, user_id y cuestype_id
  async findByCourseUserCuestype(req, res) {
    try {
      const { course_id, user_id, cuestype_id } = req.params;
      const results = await ResultCuestionarioService.findByCourseUserCuestype(course_id, user_id, cuestype_id);
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Actualizar un resultado
  async update(req, res) {
    try {
      const result = await ResultCuestionarioService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Eliminar un resultado
  async delete(req, res) {
    try {
      await ResultCuestionarioService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ResultCuestionarioController();
