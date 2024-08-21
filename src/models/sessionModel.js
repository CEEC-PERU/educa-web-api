// src/models/sessionModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Module = require('./moduleModel');

//una session tiene varios videos
const Session = sequelize.define('Session', {
    session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    duracion_minutos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    video_enlace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    module_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Module,
            key: 'module_id'
        },
        allowNull: false
    },
}, {
    tableName: 'sessions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Session;
