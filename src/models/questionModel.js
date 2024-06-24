const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Evaluation = require('./evaluationModel');
const QuestionType = require('./questionTypeModel');

const Question = sequelize.define('Question', {
    question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    evaluation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Evaluation,
            key: 'evaluation_id'
        },
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER
    },
    question_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: QuestionType,
            key: 'type_id'
        },
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'questions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Question;
