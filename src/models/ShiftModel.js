const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Shift = sequelize.define('Shift', {
    shift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'shifts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Shift;
