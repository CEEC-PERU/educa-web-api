const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const QuestionCuestionario = require('./QuestionCuestionario');

const Option = sequelize.define('Option', {
  option_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  cquestion_id: {
    type: DataTypes.INTEGER,
    references: {
        model: QuestionCuestionario,
        key: 'cquestion_id',
    },
    allowNull: false
  },
  option_text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'optionscuestionario',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Option;
