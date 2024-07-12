const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');

const Requirement = sequelize.define('Requirement', {
  requirement_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  proposed_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  course_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  materials: {
    type: DataTypes.ARRAY(DataTypes.TEXT), // Cambiado a ARRAY de TEXT para almacenar múltiples enlaces
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  course_duration: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'requirements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Requirement;
