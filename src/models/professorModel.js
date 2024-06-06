const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Professor = sequelize.define('Professor', {
    professor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    especialitation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'professors',
    timestamps: false
});

module.exports = Professor;
