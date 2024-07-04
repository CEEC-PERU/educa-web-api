const userModuleProgressService = require('../../services/users/UserModuleProgress');

// Crear un nuevo registro de progreso de módulo de usuario
const createUserModuleProgress = async (req, res) => {
    try {
        const progress = await userModuleProgressService.createUserModuleProgress(req.body);
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un registro de progreso de módulo de usuario por ID
const getUserModuleProgressById = async (req, res) => {
    try {
        const progress = await userModuleProgressService.getUserModuleProgressById(req.params.id);
        if (progress) {
            res.status(200).json(progress);
        } else {
            res.status(404).json({ message: 'UserModuleProgress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Obtener todos los registros de progreso de módulo de usuario
const getAllUserModuleProgresses = async (req, res) => {
    try {
        const progresses = await userModuleProgressService.getAllUserModuleProgresses();
        res.status(200).json(progresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro de progreso de módulo de usuario por ID
const updateUserModuleProgress = async (req, res) => {
    try {
        const progress = await userModuleProgressService.updateUserModuleProgress(req.params.id, req.body);
        if (progress) {
            res.status(200).json(progress);
        } else {
            res.status(404).json({ message: 'UserModuleProgress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un registro de progreso de módulo de usuario por ID
const deleteUserModuleProgress = async (req, res) => {
    try {
        const progress = await userModuleProgressService.deleteUserModuleProgress(req.params.id);
        if (progress) {
            res.status(200).json({ message: 'UserModuleProgress deleted' });
        } else {
            res.status(404).json({ message: 'UserModuleProgress not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un registro de progreso de módulo de usuario por module_id y user_id
 const getByModuleAndUser = async (req, res) => {
    try {
        const { module_id, user_id } = req.params;
        const progress = await userModuleProgressService.getUserModuleProgressByModuleAndUser(module_id, user_id);
        if (progress) {
            res.status(200).json(progress);
        } else {
            res.status(404).json({ error: 'UserModuleProgress not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Actualizar un registro de progreso de módulo de usuario por module_id y user_id
const updateByModuleAndUser = async (req, res) => {
    try {
        const { module_id, user_id } = req.params;
        const data = req.body;
        const updatedProgress = await userModuleProgressService.updateUserModuleProgressByModuleAndUser(module_id, user_id, data);
        if (updatedProgress) {
            res.status(200).json(updatedProgress);
        } else {
            res.status(404).json({ error: 'UserModuleProgress not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getByModuleAndUser,
    getAllUserModuleProgresses,
    updateByModuleAndUser,
    createUserModuleProgress,
    getUserModuleProgressById,
    getAllUserModuleProgresses,
    updateUserModuleProgress,
    deleteUserModuleProgress
};
