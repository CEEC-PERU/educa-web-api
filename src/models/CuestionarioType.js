const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Course = require('./courseModel');

const CuestionarioType = sequelize.define('CuestionarioType', {
  cuestype_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'cuestionariostypes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = CuestionarioType;
