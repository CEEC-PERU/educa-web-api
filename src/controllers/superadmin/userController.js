const { Op } = require('sequelize');
const User = require('../../models/UserModel');
const Profile = require('../../models/profileModel');
const Role = require('../../models/RolModel');
const AppSession = require("../../models/appSessionModel");
const Enterprise = require('../../models/EnterpriseModel');
const { sequelize } = require('../../config/database');
const { getSuperAdminEmails, createIndividualUser } = require('../../services/superadmin/userService');
const { importUsersFromExcel } = require('../../services/excelService');
const { sendMail } = require('../../utils/mailer');

const createIndividualUserController = async (req, res) => {
  try {
      console.log('Datos recibidos para crear usuario:', req.body);
      const newUser = await createIndividualUser(req.body);
      res.status(201).json(newUser);
  } catch (error) {
      console.error('Error creando el usuario:', error);
      res.status(500).json({ error: 'Error creando el usuario' });
  }
};

const createUser = async (req, res) => {
    try {
        const { dni, password, role_id, enterprise_id } = req.body;

        const newUser = await User.create({
            dni,
            password,
            role_id,
            enterprise_id
        });

        // Enviar correo a todos los superadministradores
        const superAdminEmails = await getSuperAdminEmails();
        const subject = 'Nuevos Usuarios Creados';
        const text = `Se han creado nuevos usuarios en el sistema.`;

        superAdminEmails.forEach(email => {
            sendMail(email, subject, text);
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
};
const importUsers = async (req, res) => {
    try {
      const file = req.file;
      const { enterprise_id } = req.body;
  
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      await importUsersFromExcel(file.path, enterprise_id);
      res.status(201).json({ message: 'Usuarios importados exitosamente' });
    } catch (error) {
      console.error('Error importing users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getUsersByEnterprise = async (req, res) => {
    try {
      const { enterpriseId } = req.params;
      const users = await User.findAll({
        where: {
          enterprise_id: enterpriseId,
          role_id: 1 // Suponiendo que 1 es el role_id para estudiantes
        }
      });
      const totalUsers = users.length;
  
      res.status(200).json({
        totalUsers
      });
    } catch (error) {
      console.error('Error fetching users by enterprise:', error);
      res.status(500).json({ error: 'Error fetching users by enterprise' });
    }
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { userProfile, ...userData } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Actualizar los datos del usuario
      await user.update(userData);
  
      // Actualizar el perfil del usuario
      if (userProfile) {
        const profile = await Profile.findOne({ where: { user_id: userId } });
        if (profile) {
          await profile.update(userProfile);
        } else {
          await Profile.create({ ...userProfile, user_id: userId });
        }
      }
  
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  };
  

// Obtener todos los roles
const getRoles = async (req, res) => {
  try {
      const roles = await Role.findAll();
      res.status(200).json(roles);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching roles' });
  }
};

// Obtener usuarios por rol ID
const getUsersByRoleId = async (req, res) => {
  const { roleId } = req.params;
  try {
      console.log('Fetching users for role ID:', roleId); // Debugging line
      const users = await User.findAll({
        attributes: ['user_id', 'dni', 'role_id', 'enterprise_id', , 'user_name' , 'created_at' ],
          where: { role_id: roleId },
          include: [
              { model: Profile, as: 'userProfile' },
              { model: Enterprise, as: 'enterprise' } // Incluir la relación con Enterprise
          ]
      });
      res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users by role:', error); // Debugging line
      res.status(500).json({ error: 'Error fetching users by role' });
  }
};


// Obtener todas las empresas
const getCompanies = async (req, res) => {
  try {
      const companies = await Enterprise.findAll();
      res.status(200).json(companies);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching companies' });
  }
};

// Obtener usuarios por empresa y rol ID
const getUsersByCompanyAndRoleId = async (req, res) => {
  const { companyId, roleId } = req.params;
  try {
    console.log('Fetching users for company ID:', companyId, 'and role ID:', roleId);
    const users = await User.findAll({
     attributes: ['user_id', 'dni', 'role_id', 'enterprise_id', , 'user_name' , 'created_at' ],
      where: { enterprise_id: companyId, role_id: roleId },
      attributes: {
        include: [
          [
            sequelize.fn('COUNT', sequelize.col('appSessions.appsession_id')),
            'session_count'
          ]
        ]
      },
      include: [
        { model: Profile, as: 'userProfile' },
        {
          model: AppSession,
          as: 'appSessions',
          attributes: [],  // No necesitamos atributos adicionales de AppSession aquí
          where: {
            start_time: {
              [Op.gte]: sequelize.fn('date_trunc', 'month', sequelize.fn('NOW'))
            }
          },
          required: false
        },
        { model: Enterprise, as: 'enterprise', attributes: ['name'] }
      ],
      group: ['User.user_id', 'userProfile.profile_id', 'enterprise.enterprise_id']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by company and role:', error);
    res.status(500).json({ error: 'Error fetching users by company and role' });
  }
};



const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Profile, as: 'userProfile' }]
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};

module.exports = {
    createIndividualUserController,
    createUser,
    getUserById,
    importUsers,
    getUsersByEnterprise,
    getRoles,
    getUsersByRoleId,
    getCompanies,
    getUsersByCompanyAndRoleId,
    updateUser
};