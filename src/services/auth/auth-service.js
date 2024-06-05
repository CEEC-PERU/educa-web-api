const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env.js");
const User = require("../../models/UserModel.js");
const { handleFailedLoginAttempt, resetFailedLoginAttempts } = require("../../utils/limitAttempts.js");

exports.authService = async function({ dni, password }) {
    try {
        const userFound = await User.findOne({ where: { dni } });
        if (!userFound)
            return { code: 401, msg: "Usuario ó Contraseña inválida" };

        if (userFound.is_blocked) {
            return { code: 401, msg: 'Cuenta bloqueada' };
        }

        const matchPassword = await User.comparePassword(
            password,
            userFound.password
        );

        if (!matchPassword) {
            await handleFailedLoginAttempt(userFound);
            let attemptsRestant = 5 - userFound.failed_login_attempts;
            return { code: 401, msg: "Usuario ó Contraseña inválida", possibleAttemps: attemptsRestant };
        }

        await resetFailedLoginAttempts(userFound);

        const token = jwt.sign(
            {
                id: userFound.user_id,
                role: userFound.role_id,
                dni: userFound.dni,
                enterprise_id: userFound.enterprise_id,
                loginTime: new Date()
            },
            JWT_SECRET,
            { expiresIn: '2d' }
        );

        return { token };

    } catch (error) {
        console.log(error);
    }
};
