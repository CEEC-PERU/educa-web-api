const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Cuestionario = require('./cuestionarioModel');

const QuestionCuestionario = sequelize.define('QuestionCuestionario', {
  cquestion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  cuestionario_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Cuestionario,
        key: 'cuestionario_id',
    },
    allowNull: false
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'questionscuestionario',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = QuestionCuestionario;
