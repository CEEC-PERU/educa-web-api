const userSessionProgressService = require('../../services/users/UserSessionProgress');

// Crear un nuevo registro de progreso de sesión de usuario
const createUserSessionProgress = async (req, res) => {
    try {
        const progress = await userSessionProgressService.createUserSessionProgress(req.body);
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un registro de progreso de sesión de usuario por ID
const getUserSessionProgressById = async (req, res) => {
    try {
        const progress = await userSessionProgressService.getUserSessionProgressById(req.params.id);
        if (progress) {
            res.status(200).json(progress);
        } else {
            res.status(404).json({ message: 'UserSessionProgress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los registros de progreso de sesión de usuario
const getAllUserSessionProgresses = async (req, res) => {
    try {
        const progresses = await userSessionProgressService.getAllUserSessionProgresses();
        res.status(200).json(progresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro de progreso de sesión de usuario por ID
const updateUserSessionProgress = async (req, res) => {
    try {
        const progress = await userSessionProgressService.updateUserSessionProgress(req.params.id, req.body);
        if (progress) {
            res.status(200).json(progress);
        } else {
            res.status(404).json({ message: 'UserSessionProgress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un registro de progreso de sesión de usuario por ID
const deleteUserSessionProgress = async (req, res) => {
    try {
        const progress = await userSessionProgressService.deleteUserSessionProgress(req.params.id);
        if (progress) {
            res.status(200).json({ message: 'UserSessionProgress deleted' });
        } else {
            res.status(404).json({ message: 'UserSessionProgress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUserSessionProgress,
    getUserSessionProgressById,
    getAllUserSessionProgresses,
    updateUserSessionProgress,
    deleteUserSessionProgress
};
