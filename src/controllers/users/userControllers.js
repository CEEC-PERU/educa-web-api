const userService = require('../../services/users/userService');


async function createUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
}



const createUsersController = async (req, res) => {
  try {
    const users = req.body;
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: 'Invalid user data' });
    }
    
    await userService.createUsers(users);
    res.status(201).json({ message: 'Usuarios creados con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


async function createUserAdmin(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUserAdmin(userData);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const result = await userService.updateUser(userId, userData);
    if (result[0] === 1) {
      res.json({ message: 'Usuario actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    if (result === 1) {
      res.json({ message: 'Usuario eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
}




// Controlador para obtener la información del usuario por user_id
async function getUserInfo(req, res, next) {
  const userId = req.params.userId; 
  try {
    const userInfo = await userService.getUserInfo(userId);
    res.json(userInfo);
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
}


async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
}

async function getCoursesByUser(req, res) {
  const { user_id } = req.params;

  try {
      const result = await userService.getCoursesByUser(user_id);

      return res.status(200).json({
          success: true,
          data: result
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: error.message
      });
  }
}

module.exports = { createUserAdmin, createUser, getUserById, updateUser, deleteUser, getAllUsers , getUserInfo , createUsersController , getCoursesByUser}
