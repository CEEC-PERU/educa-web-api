const ResultCuestionario = require('../../models/ResultCuestionario');

class ResultCuestionarioService {
  // Crear un nuevo resultado de cuestionario
  async create(data) {
    return await ResultCuestionario.create(data);
  }

  // Obtener todos los resultados de cuestionario
  async findAll() {
    return await ResultCuestionario.findAll();
  }

  // Obtener un resultado por su ID
  async findById(result_id) {
    return await ResultCuestionario.findByPk(result_id);
  }

//Buscar por course_id, user_id y cuestype_id
  async findByCourseUserCuestype(course_id, user_id, cuestype_id) {
    const whereClause = {};
    if (course_id) whereClause.course_id = course_id;
    if (user_id) whereClause.user_id = user_id;
    if (cuestype_id) whereClause.cuestype_id = cuestype_id;

    return await ResultCuestionario.findAll({ where: whereClause });
  }

//Actualizar un resultado de cuestionario
  async update(result_id, data) {
    const result = await ResultCuestionario.findByPk(result_id);
    if (!result) throw new Error('ResultCuestionario no encontrado');
    return await result.update(data);
  }

//Eliminar un resultado de cuestionario
  async delete(result_id) {
    const result = await ResultCuestionario.findByPk(result_id);
    if (!result) throw new Error('ResultCuestionario no encontrado');
    return await result.destroy();
  }
}

module.exports = new ResultCuestionarioService();
