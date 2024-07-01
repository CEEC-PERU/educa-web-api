const UserSessionProgress = require('../../models/UserSessionProgress');

// Crear un nuevo registro de progreso de sesión de usuario
const createUserSessionProgress = async (data) => {
    try {
        return await UserSessionProgress.create(data);
    } catch (error) {
        throw new Error('Error creating UserSessionProgress: ' + error.message);
    }
};

// Obtener un registro de progreso de sesión de usuario por ID
const getUserSessionProgressById = async (id) => {
    try {
        return await UserSessionProgress.findByPk(id);
    } catch (error) {
        throw new Error('Error fetching UserSessionProgress: ' + error.message);
    }
};

// Obtener todos los registros de progreso de sesión de usuario
const getAllUserSessionProgresses = async () => {
    try {
        return await UserSessionProgress.findAll();
    } catch (error) {
        throw new Error('Error fetching UserSessionProgresses: ' + error.message);
    }
};

// Actualizar un registro de progreso de sesión de usuario por ID
const updateUserSessionProgress = async (id, data) => {
    try {
        const progress = await UserSessionProgress.findByPk(id);
        if (progress) {
            return await progress.update(data);
        }
        throw new Error('UserSessionProgress not found');
    } catch (error) {
        throw new Error('Error updating UserSessionProgress: ' + error.message);
    }
};

// Eliminar un registro de progreso de sesión de usuario por ID
const deleteUserSessionProgress = async (id) => {
    try {
        const progress = await UserSessionProgress.findByPk(id);
        if (progress) {
            return await progress.destroy();
        }
        throw new Error('UserSessionProgress not found');
    } catch (error) {
        throw new Error('Error deleting UserSessionProgress: ' + error.message);
    }
};

module.exports = {
    createUserSessionProgress,
    getUserSessionProgressById,
    getAllUserSessionProgresses,
    updateUserSessionProgress,
    deleteUserSessionProgress
};
