const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Module = require('./moduleModel');

const FlashCard = sequelize.define('FlashCard', {
  flashcard_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.TEXT,
  },
  correct_answer: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  incorrect_answer: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Module,
      key: 'module_id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'flashcards',
  timestamps: false,
});


module.exports = FlashCard;