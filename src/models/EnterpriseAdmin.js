const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');
const Enterprise = require('./EnterpriseModel');

const EnterpriseAdmin = sequelize.define('EnterpriseAdmin', {
    enterprise_admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        },
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    enterprise_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Enterprise,
            key: 'enterprise_id'
        },
        allowNull: true // Ahora puede ser null si el usuario es un admincorporativo
    }
}, {
    tableName: 'enterprise_admins',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = EnterpriseAdmin;
