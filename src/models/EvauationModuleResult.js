const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Evaluation = require('./evaluationModel');  
const Module = require('./moduleModel');

const ModuleResult = sequelize.define('ModuleResult', {
    module_result_id: {
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
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Module,
            key: 'module_id'
        }
    },
    puntaje: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'moduleresults',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = ModuleResult;
