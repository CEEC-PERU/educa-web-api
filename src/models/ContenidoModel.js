const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const Content= sequelize.define('Contenido', {
  content_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  tableName: 'contents',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Content;