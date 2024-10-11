const express = require('express');
const courseResultController = require('../../controllers/courses/courseResultController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const router = express.Router();


router.post('/', authenticateToken, courseResultController.createCourseResult);
router.get('/',authenticateToken, courseResultController.getAllCourseResults);
router.get('/cursos/:userId',authenticateToken, courseResultController.getCourseResultsByUserId);
router.put('/:id',authenticateToken, courseResultController.updateCourseResult);
router.delete('/:id', authenticateToken,courseResultController.deleteCourseResult);

module.exports = router;
