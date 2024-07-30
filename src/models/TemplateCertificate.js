const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');
const Course = require('./CourseModel');

const TemplateCertificate= sequelize.define('TemplateCertidicate', {
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        }
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Course,
        key: 'course_id',
    }
  },
 active: {
    type: DataTypes.DATE,
   
  },
  name : {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  template_url : {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = TemplateCertificate;
