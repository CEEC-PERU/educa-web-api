const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./UserModel');

const Profile = sequelize.define('Profile', {
  profile_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },

  phone: DataTypes.INTEGER,
  profile_picture: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
}, {
  tableName: 'profiles',
  timestamps: false,
});

module.exports = Profile;