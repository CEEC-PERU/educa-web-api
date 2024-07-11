const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const Enterprise = require('./EnterpriseModel'); // Importar el modelo Enterprise
const Role = require('./RolModel'); // Importar el modelo Role

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    dni: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    enterprise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Enterprise,
            key: 'enterprise_id'
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'role_id'
        }
    },
    expired_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    failed_login_attempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    last_failed_login: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


module.exports = User;

User.comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch
  }