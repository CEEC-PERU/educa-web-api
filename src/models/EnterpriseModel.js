const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const Rol = require('./RolModel');

const Enterprise = sequelize.define('Enterprise', {
    enterprise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_count:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    image_log: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image_fondo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
}, {
    tableName: 'enterprises',
    timestamps: false
});


module.exports = Enterprise;
