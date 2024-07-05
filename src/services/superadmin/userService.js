// src/services/superadmin/userService.js
const User = require('../../models/UserModel');

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

module.exports = {
    getSuperAdminEmails
};
