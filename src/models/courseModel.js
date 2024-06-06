const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./categoryModel');
const Professor = require('./professorModel');  

const Course = sequelize.define('Course', {
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description_short: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description_large: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Category,
            key: 'category_id'
        }
    },
    professor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Professor,
            key: 'professor_id'
        }
    },
    intro_video: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duracion_curso: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    is_finish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    limit_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'courses',
    timestamps: false
});

module.exports = Course;
