const moduleService = require('../../services/courses/moduleService');
const SequelizeMock = require('sequelize-mock');

// Definir la conexión mock y el modelo mock dentro del bloque de jest.mock
jest.mock('../../models/moduleModel', () => {
    const DBConnectionMock = new SequelizeMock();
    return DBConnectionMock.define('Module', {
        module_id: 1,
        name: 'Test Module',
        course_id: 1,
        evaluation_id: 1,
        is_finish: false,
        is_active: true
    });
});

describe('Module Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return error if evaluation_id is already assigned', async () => {
        const error = await moduleService.validateCourseAndEvaluation(2, 1);
        expect(error).toBe('La evaluación ya está asignada a otro módulo');
    });

    it('should return null if no conflicts found', async () => {
        const error = await moduleService.validateCourseAndEvaluation(2, 2);
        expect(error).toBeNull();
    });

    it('should create a module if validation passes', async () => {
        const moduleData = {
            course_id: 2,
            evaluation_id: 2,
            name: 'New Module',
            is_finish: false,
            is_active: true
        };
        const newModule = await moduleService.createModule(moduleData);
        expect(newModule.name).toBe('New Module');
    });
});
