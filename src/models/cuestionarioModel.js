const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Course = require('./courseModel');

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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // 'NPS', 'Effort', 'Satisfaction', etc.//colocar en frontend definidos
    allowNull: false
  },
}, {
  tableName: 'cuestionarios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Cuestionario;
