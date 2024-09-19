const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const User = require('./UserModel');

const UserInfo = sequelize.define('UserInfo', {
    userinfo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    foto_image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    firma_image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    documento_pdf: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
}, {
    tableName: 'usersinfo',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


module.exports = UserInfo;
