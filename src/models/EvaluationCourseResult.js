const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Evaluation = require('./evaluationModel');  
const Course = require('./courseModel');
const User = require('./UserModel');

const CourseResult = sequelize.define('CourseResult', {
    course_result_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    evaluation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Evaluation,
            key: 'evaluation_id'
        }
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'course_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    puntaje: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'coursesresults',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = CourseResult;
