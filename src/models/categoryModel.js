const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Categories', {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'categories',
  timestamps: false,
});

module.exports = Category;
