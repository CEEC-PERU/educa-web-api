// src/models/sessionModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./sessionModel');

//varios videos pertenecen a un session

const Video = sequelize.define('Video', {
    video_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orden: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    video_enlace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    question :{
        type: DataTypes.STRING,
        allowNull: false
    },
    correct_answer:{
        type: DataTypes.TEXT, 
    },
    incorrect_answer:{
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
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
    },
    
    
}, {
    tableName: 'videos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Video;