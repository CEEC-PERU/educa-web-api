const express = require('express');
const courseStudentController = require('../../controllers/courses/courseStudentController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

const router = express.Router();

router.post('/', authenticateToken, courseStudentController.create);
router.get('/',authenticateToken, courseStudentController.getAll);
router.get('/:id',authenticateToken, courseStudentController.getById);
router.put('/:id',authenticateToken, courseStudentController.update);
router.delete('/:id', authenticateToken,courseStudentController.delete);

module.exports = router;
