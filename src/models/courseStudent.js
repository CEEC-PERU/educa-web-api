const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');
const Course = require('./courseModel');  
const Classroom = require('./Classroom'); 

const courseStudent = sequelize.define('CourseStudent', {
    coursestudent_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    classroom_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Si no hay aula asignada
        references: {
            model: Classroom,
            key: 'classroom_id'
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
    deadline : DataTypes.DATE,
    finished_date: DataTypes.DATE,
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0 
    },
    is_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'coursestudents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

module.exports = courseStudent;
