

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const ModuleResult = require('./EvaluationModuleResult');
const Question = require('./questionModel');

// Definición del modelo de respuestas de módulos
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
  //Almacena los option_id seleccionado , en caso multiple en array
  response: {
    type: DataTypes.JSON,  // JSON para manejar tanto un valor simple como un arreglo
    allowNull: true
  },
  // Almacena todo los textos de la respuesta seleccionada
  response_text: {
    type: DataTypes.JSON, // Cambio de TEXT a JSON para manejar posibles arreglos
    allowNull: false
  },
  //Define si la repsuesta es correcta 
  is_correct: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  // campo para opciones multiples , ver si resultado de isCorrect de cada selección
  is_correct2: {
    type: DataTypes.JSON, // JSON para manejar tanto valores booleanos como arreglos de booleanos
    allowNull: true
  },
  // Puntaje valorizado del quetion_id
  score: {
    type: DataTypes.INTEGER
},
}, {
  tableName: 'answer_moduleresults',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = AnswerResultModule;