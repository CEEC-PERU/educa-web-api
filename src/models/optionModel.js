const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Question = require('./questionModel');

const Option = sequelize.define('Option', {
    option_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Question,
            key: 'question_id'
        },
        allowNull: false
    },
    option_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'options',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Option;
