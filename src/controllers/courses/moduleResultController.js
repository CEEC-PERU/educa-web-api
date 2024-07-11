const ModuleResultService = require('../../services/courses/ModuleResultService.');

class ModuleResultController {
    async create(req, res) {
        try {
            const moduleResult = await ModuleResultService.create(req.body);
            res.status(201).json(moduleResult);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const filters = {};
            if (req.query.module_id) filters.module_id = req.query.module_id;
            if (req.query.user_id) filters.user_id = req.query.user_id;
            const moduleResults = await ModuleResultService.getAll(filters);
            res.status(200).json(moduleResults);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const moduleResult = await ModuleResultService.getById(req.params.id);
            if (moduleResult) {
                res.status(200).json(moduleResult);
            } else {
                res.status(404).json({ error: 'ModuleResult not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const moduleResult = await ModuleResultService.update(req.params.id, req.body);
            if (moduleResult) {
                res.status(200).json(moduleResult);
            } else {
                res.status(404).json({ error: 'ModuleResult not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const success = await ModuleResultService.delete(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'ModuleResult not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // New methods for filtering
    async getByModuleId(req, res) {
        try {
            const moduleResults = await ModuleResultService.getByModuleId(req.params.module_id);
            res.status(200).json(moduleResults);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByUserId(req, res) {
        try {
            const moduleResults = await ModuleResultService.getByUserId(req.params.user_id);
            res.status(200).json(moduleResults);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ModuleResultController();
