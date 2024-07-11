// src/services/superadmin/userService.js
const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');

const getSuperAdminEmails = async () => {
    try {
        const superAdmins = await User.findAll({
            where: { role_id: 4 },
            attributes: ['dni']
        });
        return superAdmins.map(admin => `${admin.dni}`);
    } catch (error) {
        console.error('Error fetching super admin emails:', error);
        throw new Error('Error fetching super admin emails');
    }
};

async function createIndividualUser(userData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const newUser = await User.create(userData);

        return newUser;
    } catch (error) {
        console.error('Error en createIndividualUser:', error);
        throw new Error('Error al crear el usuario');
    }
};

module.exports = {
    getSuperAdminEmails,
    createIndividualUser
};
