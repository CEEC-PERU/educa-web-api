const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Course = require('./courseModel');
const Evaluation = require('./evaluationModel'); // Importación del modelo Evaluation

const Module = sequelize.define('Module', {
    module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'course_id'
        }
    },
    evaluation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Evaluation,
            key: 'evaluation_id'
        }
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'modules',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Module;
