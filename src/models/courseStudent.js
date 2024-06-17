const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');
const Course = require('./courseModel');  

const courseStudent = sequelize.define('CourseStudent', {
    coursestudent_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    deadline : DataTypes.DATE,
    finished_date: DataTypes.DATE,
    progress : DataTypes.INTEGER,
    is_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'coursestudents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

module.exports = courseStudent;
