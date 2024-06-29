const User = require('../../models/UserModel');
const { getSuperAdminEmails } = require('../../services/superadmin/userService');
const { importUsersFromExcel } = require('../../services/excelService');
const { sendMail } = require('../../utils/mailer');

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
 

module.exports = {
    createUser,
    importUsers
};
