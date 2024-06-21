const courseStudentService = require('../../services/courses/courseStudentService');

class CourseStudentController {
    async create(req, res) {
        try {
            const courseStudent = await courseStudentService.create(req.body);
            res.status(201).json(courseStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const courseStudents = await courseStudentService.getAll();
            res.status(200).json(courseStudents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const courseStudent = await courseStudentService.getById(req.params.id);
            if (!courseStudent) {
                return res.status(404).json({ error: 'CourseStudent not found' });
            }
            res.status(200).json(courseStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const courseStudent = await courseStudentService.update(req.params.id, req.body);
            res.status(200).json(courseStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await courseStudentService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async getCourseStudentsByUserId(req, res) {
        const { user_id } = req.params;
        try {
            const courseStudent = await courseStudentService.getCourseStudentsByUserId(user_id);
            if (!courseStudent) {
                return res.status(404).json({ error: 'CourseStudent not found' });
            }
            res.status(200).json(courseStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCourseDetailByCourseId(req, res) {
        const { course_id } = req.params;
        try {
            const courseStudent = await courseStudentService.getCourseDetailByCourseId(course_id);
            if (!courseStudent) {
                return res.status(404).json({ error: 'CourseStudent not found' });
            }
            res.status(200).json(courseStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getModulesByCourseId(req, res) {
        const { course_id } = req.params;
        try {
            const courseStudent = await courseStudentService.getModulesByCourseId(course_id);
            if (!courseStudent) {
                return res.status(404).json({ error: 'CourseStudent not found' });
            }
            res.status(200).json(courseStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}

module.exports = new CourseStudentController();
