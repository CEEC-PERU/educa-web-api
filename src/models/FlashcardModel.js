const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Course = require('./courseModel');

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
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'course_id',
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