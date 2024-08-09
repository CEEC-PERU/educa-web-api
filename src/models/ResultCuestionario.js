const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');
const Cuestionario = require('./cuestionarioModel');
//modificar
const Result = sequelize.define('Result', {
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
  cuestionario_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Cuestionario,
        key: 'cuestionario_id',
    },
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER, // o cualquier otro tipo según tus necesidades
    allowNull: true
  }
}, {
  tableName: 'resultcuestionario',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Result;
