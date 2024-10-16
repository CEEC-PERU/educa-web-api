const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./categoryModel');
const Professor = require('./professorModel');  
const Evaluation = require('./evaluationModel'); // Importa el modelo Evaluation
const Content = require('./ContenidoModel');

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
        allowNull: false
    },
    description_large: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id'
        }
    },
    content_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Content,
            key: 'content_id'
        }
    },
    professor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Professor,
            key: 'professor_id'
        }
    },
    evaluation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Evaluation,
            key: 'evaluation_id'
        }
    },
    intro_video: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration_video: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration_course: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    evaluation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Evaluation,
            key: 'evaluation_id'
        },
    }
}, {
    tableName: 'courses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Course;
