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
        const { course_id , user_id} = req.params;
        try {
            const courseStudent = await courseStudentService.getModulesByCourseId(course_id, user_id);
            if (!courseStudent) {
                return res.status(404).json({ error: 'CourseStudent not found' });
            }
            res.status(200).json(courseStudent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getModulesByCourseId2(req, res) {
        const { course_id, user_id } = req.params;
        try {
          const courseStudent = await courseStudentService.getModulesByCourseId2(course_id, user_id);
          if (!courseStudent) {
            return res.status(404).json({ error: 'CourseStudent not found' });
          }
          res.status(200).json(courseStudent);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

    async assignStudentsToCourseByEnterprise(req, res) {
        const { enterprise_id, course_id } = req.body;
        try {
            const courseStudents = await courseStudentService.assignStudentsToCourseByEnterprise(enterprise_id, course_id);
            res.status(201).json(courseStudents);
        } catch (error) {
            console.error('Error assigning students to course:', error);
            res.status(500).json({ error: error.message });
        }
    }
    async getAssignedStudents(req, res) {
        const { course_id } = req.params;
        try {
            const assignedStudents = await courseStudentService.getAssignedStudentsByCourseId(course_id);
            res.status(200).json(assignedStudents);
        } catch (error) {
            console.error('Error fetching assigned students:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getUnassignedStudents(req, res) {
        const { course_id, enterprise_id } = req.params;
        try {
          const unassignedStudents = await courseStudentService.getUnassignedStudents(course_id, enterprise_id);
          res.status(200).json(unassignedStudents);
        } catch (error) {
          console.error('Error fetching unassigned students:', error);
          res.status(500).json({ error: error.message });
        }
    }
    async getCoursesByEnterprise(req, res) {
        const { enterprise_id } = req.params;
        try {
          const courses = await courseStudentService.getCoursesByEnterprise(enterprise_id);
          res.status(200).json(courses);
        } catch (error) {
          console.error('Error fetching courses by enterprise:', error);
          res.status(500).json({ error: 'Error fetching courses by enterprise' });
        }
      }

      async getUsersByEnterpriseWithSessions(req, res) {
        try {
          const { startDate, endDate, enterpriseId } = req.query;
      
          console.log('Received query parameters:', { startDate, endDate, enterpriseId });
      
          if (!startDate || !endDate || !enterpriseId) {
            return res.status(400).json({ error: 'Start date, end date, and enterprise ID are required' });
          }
      
          const usersWithSessions = await courseStudentService.getUsersByEnterpriseWithSessions(parseInt(enterpriseId), new Date(startDate), new Date(endDate));
      
          res.status(200).json(usersWithSessions);
        } catch (error) {
          console.error('Error fetching users by enterprise:', error);
          res.status(500).json({ error: error.message });
        }
      }
      
    
    async getStudentsByEnterprise(req, res) {
        const { enterprise_id } = req.params;
        try {
            const students = await courseStudentService.getStudentsByEnterprise(enterprise_id);
            res.status(200).json(students);
        } catch (error) {
            console.error('Error fetching students by enterprise:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getCoursesWithGradesByStudent(req, res) {
        const { user_id } = req.params;
        try {
            const courses = await courseStudentService.getCoursesWithGradesByStudent(user_id);
            res.status(200).json(courses);
        } catch (error) {
            console.error('Error fetching courses with grades by student:', error);
            res.status(500).json({ error: error.message });
        }
    }
    
}

module.exports = new CourseStudentController();
