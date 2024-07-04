const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Module = require('./moduleModel');
const User = require('./UserModel'); 


const UserModuleProgress = sequelize.define('UserModuleProgress', {
    user_module_progress_id: {
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
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Module,
            key: 'module_id'
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
    tableName: 'user_module_progress',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserModuleProgress;
