const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Session = require('./sessionModel');
const User = require('./UserModel');  

const UserSessionProgress = sequelize.define('UserSessionProgress', {
    user_session_progress_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Session,
            key: 'session_id'
        }
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    progress : {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'user_session_progress',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserSessionProgress;
