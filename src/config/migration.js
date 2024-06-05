const { sequelize } = require('./database');
const Enterprise  = require('../models/EnterpriseModel');
const Role  = require('../models/RolModel');
const  User  = require('../models/UserModel');
// Sincronizar con la base de datos models
async function authenticateDatabase() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();     //await sequelize.sync({ force: true }); //Esto creará las tablas; "force: true" elimina las tablas existentes
      console.log('Conexión a la base de datos establecida con éxito');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }
  module.exports = {
    authenticateDatabase,
  };