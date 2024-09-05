

const Course = require('../../models/courseModel');
const Module = require('../../models/moduleModel');
const EvaluationCourse = require('../../models/EvaluationCourseResult');
const EvaluationModule = require('../../models/EvaluationModuleResult');
const User = require('../../models/UserModel');
const Profile = require('../../models/profileModel');
const { Op } = require('sequelize');

exports.getCourseGrades = async (req, res) => {
    const { enterpriseId, courseId } = req.params;
  
    try {
      // Fetch all users by enterprise_id
      const users = await User.findAll({
        attributes: ['user_id', 'enterprise_id' , 'role_id'],
        where: { enterprise_id: enterpriseId  , role_id : 1},
        include: [
          {
            model: Profile, // Get user's name
            attributes: ['first_name', 'last_name'],
            as: 'userProfile'
          },
          {
            model: EvaluationCourse, // Course evaluation by user
            attributes: ['course_id', 'puntaje', 'course_result_id', 'created_at'],
            order: [['created_at', 'ASC']],
            where: { course_id: courseId },
            required: false, // Allow user to appear even without course results
            include: [
              {
                model: Course,
                attributes: ['course_id', 'name'],
              }
            ]
          },
          {
            model: EvaluationModule, // Evaluations for each module
            attributes: ['puntaje', 'created_at', 'module_result_id'],
            order: [['created_at', 'ASC']], // Order by date
            required: false, // Allow user to appear even without module results
            include: [
              {
                model: Module, // Include course modules
                attributes: ['name', 'module_id'],
              }
            ]
          }
        ]
      });
  
      // Process the results to merge module results with the same module_id
      const mergedUsers = users.map(user => {
        const moduleResults = user.ModuleResults.reduce((acc, moduleResult) => {
          const moduleId = moduleResult.Module.module_id;
  
          if (!acc[moduleId]) {
            acc[moduleId] = {
              module_id: moduleId,
              module_name: moduleResult.Module.name,
              results: []
            };
          }
  
          // Push the result with puntaje and created_at into the results array
          acc[moduleId].results.push({
            puntaje: moduleResult.puntaje,
            created_at: moduleResult.created_at
          });
  
          return acc;
        }, {});
  
        // Convert the object back to an array and sort each module's results by created_at
        const mergedModuleResults = Object.values(moduleResults).map(module => {
          module.results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          return module;
        });
  
        // Return the user with the merged and sorted module results
        return {
          ...user.toJSON(),
          ModuleResults: mergedModuleResults
        };
      });
  
      res.json(mergedUsers);
    } catch (error) {
      console.error('Error obteniendo las notas del curso:', error);
      res.status(500).json({ error: 'Error al obtener las notas del curso' });
    }
  };
  


  