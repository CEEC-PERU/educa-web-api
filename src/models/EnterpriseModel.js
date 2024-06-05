const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const Enterprise = sequelize.define('Enterprise', {
    enterprise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    image_log: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'enterprises',
    timestamps: false
});


module.exports = Enterprise;
