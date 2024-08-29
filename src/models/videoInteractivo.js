const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./sessionModel');

//videos interactivos que pertenecen a una sesion
const VideoInteractivo = sequelize.define('VideoInteractivo', {
    interactivo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url_enlace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    session_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Session,
            key: 'session_id'
        },
        allowNull: true
    },  
}, {
    tableName: 'videosinteractivo',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = VideoInteractivo;