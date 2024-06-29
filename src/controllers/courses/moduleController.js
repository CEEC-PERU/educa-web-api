const moduleService = require('../../services/courses/moduleService');

const getAllModules = async (req, res) => {
    try {
        const modules = await moduleService.getAllModules();
        res.status(200).json(modules);
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({ error: 'Error fetching modules' });
    }
};

const getModuleById = async (req, res) => {
    try {
        const module = await moduleService.getModuleById(req.params.id);
        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }
        res.status(200).json(module);
    } catch (error) {
        console.error('Error fetching module:', error);
        res.status(500).json({ error: 'Error fetching module' });
    }
};

const createModule = async (req, res) => {
    try {
        const { course_id, evaluation_id, name, is_finish, is_active } = req.body;

        const validationError = await moduleService.validateCourseAndEvaluation(course_id, evaluation_id);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const newModule = await moduleService.createModule({ course_id, evaluation_id, name, is_finish, is_active });
        res.status(201).json(newModule);
    } catch (error) {
        console.error('Error creating module:', error);
        res.status(500).json({ error: 'Error creating module' });
    }
};

const updateModule = async (req, res) => {
    const { id } = req.params;
    const { name, course_id, evaluation_id, is_finish, is_active } = req.body;

    try {
        const module = await moduleService.getModuleById(id);
        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }

        const validationError = await moduleService.validateCourseAndEvaluation(course_id, evaluation_id, id);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const updatedModule = await moduleService.updateModule(id, { course_id, evaluation_id, name, is_finish, is_active });
        res.status(200).json(updatedModule);
    } catch (error) {
        console.error('Error updating module:', error);
        res.status(500).json({ error: 'Error updating module' });
    }
};


const deleteModule = async (req, res) => {
    try {
        await moduleService.deleteModule(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting module:', error);
        res.status(500).json({ error: 'Error deleting module' });
    }
};

module.exports = {
    getAllModules,
    getModuleById,
    createModule,
    updateModule,
    deleteModule
};
