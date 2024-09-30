const ModuleResultService = require('../../services/courses/ModuleResultService.');
const AnswerModuleResult = require('../../models/AnswerModuleResult');
class ModuleResultController {
    async create(req, res) {
        const { user_id, module_id,  evaluation_id, answers  , score } = req.body;d

        try {
            // Crear el resultado principal en la tabla Result
            const result = await AnswerModuleResult.create({
            user_id : user_id,
            evaluation_id : evaluation_id,
            module_id: module_id,  
            cuestionario_id: module_id,  
            puntaje: score, 
            });

            // Guardar cada respuesta en la tabla AnswerResult
            const answerPromises = answers.map(async (answer) => {
                 await AnswerResult.create({
                    module_result_id: result.result_id,
                    question_id: answer.question_id,
                    response: JSON.stringify(answer.response), // Guardar como JSON si es array
                    is_correct: Array.isArray(answer.isCorrect2) ? answer.isCorrect2.every(val => val) : answer.isCorret,
                    response_text: answer.response2  // Guardar el texto adicional (response2)
                });
            });

            await Promise.all(answerPromises);  // Ejecutar todas las promesas de creación
            res.status(201).json(moduleResult);
            return res.status(201).json({ message: 'Respuestas guardadas correctamente' });
          
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
