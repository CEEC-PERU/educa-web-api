// src/services/courses/sessionService.js
const Cuestionario= require('../../models/cuestionarioModel');
const CuestionarioType = require('../../models/CuestionarioType');
const { Op } = require('sequelize');
exports.getAllCuestionario = async () => {
  try {
    return await Cuestionario.findAll();
  } catch (error) {
    console.error('Error fetching cuestionario:', error);
    throw new Error('Error fetching cuestionario');
  }
};

exports.getCuestionarioById = async (cuestionarioId) => {
  try {
    return await Cuestionario.findByPk(cuestionarioId);
  } catch (error) {
    console.error('Error fetching session by ID:', error);
    throw new Error('Error fetching session by ID');
  }
};

exports.createCuestionario = async (cuestionarionData) => {
  try {
    return await Cuestionario.create(cuestionarionData);
  } catch (error) {
    console.error('Error creating cuestionario:', error);
    throw new Error('Error creating cuestionario');
  }
};

exports.updateCuestionario = async (cuestionarioId, cuestionarioData) => {
  try {
    const cuestionario = await Cuestionario.findByPk(cuestionarioId);
    if (cuestionario) {
      await cuestionario.update(cuestionarioData);
      return cuestionario;
    }
    return null;
  } catch (error) {
    console.error('Error updating cuestionario:', error);
    throw new Error('Error updating cuestionario');
  }
};

exports.deleteCuestionario = async (cuestionarioId) => {
  try {
    const cuestionario = await Cuestionario.findByPk(cuestionarioId);
    if (cuestionario) {
      await cuestionario.destroy();
      return cuestionario;
    }
    return null;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw new Error('Error deleting session');
  }
};


// Obtener Cuestionarios filtrados por course_id y cuestype_id
exports.getCuestionarioByCourseAndType = async (courseId, cuestypeId) => {
    try {
      return await Cuestionario.findAll({
        where: {
          [Op.and]: [
            { course_id: courseId },
            { cuestype_id: cuestypeId }
          ]
        },
        include: [{
          model: CuestionarioType, // Incluir el modelo CuestionarioType
          attributes: ['name'], // Puedes incluir los atributos que desees de CuestionarioType
        }]
      });
    } catch (error) {
      console.error('Error fetching cuestionario by course_id and cuestype_id:', error);
      throw new Error('Error fetching cuestionario by course_id and cuestype_id');
    }
  };