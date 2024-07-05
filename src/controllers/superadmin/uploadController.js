// src/controllers/superadmin/uploadController.js
const xlsx = require('xlsx');
const { sendMail } = require('../../utils/mailer');
const User = require('../../models/UserModel');
const { getSuperAdminEmails } = require('../../services/superadmin/userService');
const bcrypt = require('bcrypt');

const uploadUsers = async (req, res) => {
    try {
        const file = req.file;
        const { enterprise_id } = req.body;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        if (!enterprise_id) {
            return res.status(400).send('Enterprise ID is required.');
        }

        console.log('File uploaded:', file);

        // Read the file using xlsx
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(sheet);

        console.log('Rows:', rows);

        if (!rows.length) {
            return res.status(400).send('Uploaded file is empty.');
        }

        for (const row of rows) {
            const { dni, password } = row;

            if (!dni || !password) {
                console.error('Invalid row:', row);
                continue; // Skip invalid rows
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                dni,
                password: hashedPassword,
                role_id: 1, // Asigna el rol de estudiante por defecto
                enterprise_id
            });
        }

        // Enviar correo a todos los superadministradores
        const superAdminEmails = await getSuperAdminEmails();
        const subject = 'Usuarios Creados desde Excel';
        const text = `Se han creado nuevos usuarios desde un archivo Excel.`;

        superAdminEmails.forEach(email => {
            sendMail(email, subject, text);
        });

        res.status(201).send('Usuarios creados exitosamente.');
    } catch (error) {
        console.error('Error uploading users:', error);
        res.status(500).json({ error: 'Error uploading users' });
    }
};

module.exports = { uploadUsers };
