const request = require('supertest');
const express = require('express');
const moduleRouter = require('../../routes/courses/moduleRoutes'); // Corrige aquí
const moduleService = require('../../services/courses/moduleService');
const app = express();

app.use(express.json());
app.use('/api/modules', moduleRouter); // Usa el router aquí

jest.mock('../../services/courses/moduleService');

describe('Module Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return error if course_id is already assigned on create', async () => {
        moduleService.validateCourseAndEvaluation.mockResolvedValue('El curso ya está asignado a otro módulo');
        const response = await request(app)
            .post('/api/modules')
            .send({ course_id: 1, evaluation_id: 1, name: 'Test Module', is_finish: false, is_active: true });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('El curso ya está asignado a otro módulo');
    });

    it('should return error if evaluation_id is already assigned on create', async () => {
        moduleService.validateCourseAndEvaluation.mockResolvedValue('La evaluación ya está asignada a otro módulo');
        const response = await request(app)
            .post('/api/modules')
            .send({ course_id: 1, evaluation_id: 1, name: 'Test Module', is_finish: false, is_active: true });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('La evaluación ya está asignada a otro módulo');
    });

    it('should create module if no conflicts found', async () => {
        moduleService.validateCourseAndEvaluation.mockResolvedValue(null);
        moduleService.createModule.mockResolvedValue({ name: 'New Module' });
        const response = await request(app)
            .post('/api/modules')
            .send({ course_id: 2, evaluation_id: 2, name: 'New Module', is_finish: false, is_active: true });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('New Module');
    });
});
