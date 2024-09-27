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
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true
},
}, {
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Category;
