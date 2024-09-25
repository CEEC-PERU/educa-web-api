const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Course = require('./courseModel');
const CuestionarioType = require('./CuestionarioType');

const Cuestionario = sequelize.define('Cuestionario', {
  cuestionario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Course,
        key: 'course_id',
    }
  },
  cuestype_id: {
 // 'NPS', 'Effort', 'Satisfaction', VPE(valoracion estrellas) etc.//colocar en frontend definidos
    type: DataTypes.INTEGER,
    references: {
        model: CuestionarioType,
        key: 'cuestype_id',
    },
    allowNull: false
  },
}, {
  tableName: 'cuestionarios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Cuestionario;
