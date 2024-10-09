const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');// Importa el modelo User
const Course = require('./courseModel');// Importa el modelo Course
const CuestionarioType = require('./CuestionarioType'); // Importa el modelo CuestionarioType

const ResultCuestionario = sequelize.define('ResultCuestionario', {
  result_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
        model: User,
        key: 'user_id',
    },
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER, // o cualquier otro tipo según tus necesidades , evaluaciones
    allowNull: true
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Course,
        key: 'course_id',
    }
  },
  cuestype_id: {
 // 'NPS', 'Effort', 'Satisfaction', VPE(valoracion estrellas) etc. //colocar en frontend definidos
    type: DataTypes.INTEGER,
    references: {
        model: CuestionarioType,
        key: 'cuestype_id',
    },
    allowNull: false
  },
}, {
  tableName: 'resultcuestionario',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ResultCuestionario;
