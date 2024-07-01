const ModuleResult = require('../../models/EvaluationModuleResult');

class ModuleResultService {
    async create(data) {
        return await ModuleResult.create(data);
    }

    async getAll(filters = {}) {
        return await ModuleResult.findAll({ where: filters });
    }

    async getById(id) {
        return await ModuleResult.findByPk(id);
    }

    async update(id, data) {
        const moduleResult = await ModuleResult.findByPk(id);
        if (moduleResult) {
            return await moduleResult.update(data);
        }
        return null;
    }

    async delete(id) {
        const moduleResult = await ModuleResult.findByPk(id);
        if (moduleResult) {
            await moduleResult.destroy();
            return true;
        }
        return false;
    }

    // New methods for filtering
    async getByModuleId(module_id) {
        return await ModuleResult.findAll({ where: { module_id } });
    }

    async getByUserId(user_id) {
        return await ModuleResult.findAll({ where: { user_id } });
    }
}

module.exports = new ModuleResultService();
