const UserModuleProgress = require('../../models/UserModuleProgress');

// Crear un nuevo registro de progreso de módulo de usuario
const createUserModuleProgress = async (data) => {
    try {
        return await UserModuleProgress.create(data);
    } catch (error) {
        throw new Error('Error creating UserModuleProgress: ' + error.message);
    }
};

// Obtener un registro de progreso de módulo de usuario por ID
const getUserModuleProgressById = async (id) => {
    try {
        return await UserModuleProgress.findByPk(id);
    } catch (error) {
        throw new Error('Error fetching UserModuleProgress: ' + error.message);
    }
};

// Obtener todos los registros de progreso de módulo de usuario
const getAllUserModuleProgresses = async () => {
    try {
        return await UserModuleProgress.findAll();
    } catch (error) {
        throw new Error('Error fetching UserModuleProgresses: ' + error.message);
    }
};

// Actualizar un registro de progreso de módulo de usuario por ID
const updateUserModuleProgress = async (id, data) => {
    try {
        const progress = await UserModuleProgress.findByPk(id);
        if (progress) {
            return await progress.update(data);
        }
        throw new Error('UserModuleProgress not found');
    } catch (error) {
        throw new Error('Error updating UserModuleProgress: ' + error.message);
    }
};

// Eliminar un registro de progreso de módulo de usuario por ID
const deleteUserModuleProgress = async (id) => {
    try {
        const progress = await UserModuleProgress.findByPk(id);
        if (progress) {
            return await progress.destroy();
        }
        throw new Error('UserModuleProgress not found');
    } catch (error) {
        throw new Error('Error deleting UserModuleProgress: ' + error.message);
    }
};

module.exports = {
    createUserModuleProgress,
    getUserModuleProgressById,
    getAllUserModuleProgresses,
    updateUserModuleProgress,
    deleteUserModuleProgress
};
