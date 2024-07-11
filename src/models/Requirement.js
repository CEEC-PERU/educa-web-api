const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel'); // Importar el modelo Role

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
  material: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  course_duration: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
}, {
  tableName: 'requirements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Requirement.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Requirement;
