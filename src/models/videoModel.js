// src/models/sessionModel.js
/*const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./sessionModel');

//varios videos pertenecen a un session
const Video = sequelize.define('Video', {
    video_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    video_enlace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    session_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Session,
            key: 'session_id'
        },
        allowNull: false
    }  
}, {
    tableName: 'videos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Video;
*/