// userService.js
const Role = require('../../models/RolModel');
const Profile = require('../../models/profileModel');
const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const Enterprise = require('../../models/EnterpriseModel');

async function createUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return User.create(userData);
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
}

//crea varios ususarios


const createUsers = async (users) => {
  try {
    // Encriptar las contraseñas de todos los usuarios
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    }));

    // Crear usuarios en la base de datos
    return await User.bulkCreate(hashedUsers);
  } catch (error) {
    throw new Error('Error al crear usuarios: ' + error.message);
  }
};

module.exports = { createUsers };

async function createUserAdmin(data) {
  try {
    console.log(data); // Log the data object
    data.password = await bcrypt.hash(data.password, 10);
    data.role_id = 3; 
    return await User.create({
      dni: data.dni,
      password: data.password,
      role_id: data.role_id,
      enterprise_id: data.enterprise_id,
    
    });
  } catch (error) {
    console.error(error); // Log the error object
    throw new Error('Error al crear el usuario');
  }
}

async function getUserById(userId) {
  return User.findByPk(userId);
}

async function updateUser(userId, userData) {
  return User.update(userData, { where: { user_id: userId } });
}

async function deleteUser(userId) {
  return User.destroy({ where: { user_id: userId } });
}

async function getAllUsers() {
  return User.findAll({
    include: [{
      model: Profile,
      attributes: ['first_name', 'last_name', 'phone', 'profile_picture'],
    },
    {
      model: Role,
      attributes: ['description'],
    }],
    attributes: ['email','client_id', 'role_id', 'user_id'],

  });
}

//obtener datos de l usuario con empresa
async function getUserInfo(userId) {
  return User.findOne({
    where: { user_id: userId }, 
    include: [
    {
      model: Enterprise,
      attributes: ['image_log', 'image_fondo', 'name'],
       as: 'enterprise'
    }],
    attributes: ['user_id', 'enterprise_id', 'role_id'],
  });
}



module.exports = { createUserAdmin, createUser, getUserById, updateUser, deleteUser, getAllUsers , getUserInfo , createUsers }
