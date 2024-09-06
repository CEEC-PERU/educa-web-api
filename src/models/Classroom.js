const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Enterprise = require('./EnterpriseModel'); 
const Shift= require('./ShiftModel'); 
const Classroom = sequelize.define('Classroom', {
    classroom_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    enterprise_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Enterprise,
            key: 'enterprise_id'
        }
    },
    shift_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Shift,
            key: 'shift_id'
        }
    },
}, {
    tableName: 'classrooms',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Classroom;
