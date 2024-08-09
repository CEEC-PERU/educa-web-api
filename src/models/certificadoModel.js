const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');
const Course = require('./courseModel');

const Certificado = sequelize.define('Certificado', {
  certificado_id: {
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
  issued_date: {
    type: DataTypes.DATE,
   
  },
  certificate_url : {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  status : {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  tableName: 'certificados',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Certificado;
