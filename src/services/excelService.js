// src/services/excelService.js
const xlsx = require('xlsx');
const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const { sendMail } = require('../utils/mailer');
const { getSuperAdminEmails } = require('../services/superadmin/userService');

const importUsersFromExcel = async (filePath, enterprise_id) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        for (const row of data) {
            const { dni, password } = row;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ dni, password: hashedPassword, role_id: 1, enterprise_id });
        }

        fs.unlinkSync(filePath); // Eliminar el archivo temporal

        // Enviar correo a todos los superadministradores
        const superAdminEmails = await getSuperAdminEmails();
        const subject = 'Usuarios Importados';
        const text = 'Los usuarios han sido importados exitosamente.';

        superAdminEmails.forEach(email => {
            sendMail(email, subject, text);
        });

    } catch (error) {
        console.error('Error importing users:', error);
        throw new Error('Error importing users');
    }
};

module.exports = { importUsersFromExcel };
