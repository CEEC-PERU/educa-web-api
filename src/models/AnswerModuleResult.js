const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const ModuleResult = require('./EvaluationModuleResult');
const Question = require('./questionModel');

const AnswerResultModule = sequelize.define('AnswerResult', {
  answer_module_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  module_result_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ModuleResult,
      key: 'module_result_id'
    },
    allowNull: false
  },
  question_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'question_id'
    },
    allowNull: false
  },
  response: {
    type: DataTypes.JSON,  // Para almacenar respuestas múltiples (arreglos)
    allowNull: false
  },
  is_correct: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  // Almacena texto extra si es necesario (response2)
  response_text: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'answer_moduleresults',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = AnswerResultModule;