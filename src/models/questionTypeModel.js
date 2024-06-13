const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const QuestionType = sequelize.define('QuestionType', {
    type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'questionsType',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = QuestionType;
