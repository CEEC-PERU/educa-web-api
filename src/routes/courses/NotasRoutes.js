// src/routes/optionRoutes.js
const express = require('express');
const router = express.Router();
const notaController = require('../../controllers/courses/NotaController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');
// Ruta para obtener las notas de los cursos filtrado por enterpriseId y courseId
router.get('/courses/:enterpriseId/:courseId',authenticateToken, notaController.getCourseGrades );

//Obtener notas por user_id
router.get('/course/:enterpriseId/:courseId/user/:userId',authenticateToken, notaController.getCourseGradesbyUserId );
router.get('/excel/:enterpriseId/:courseId', notaController.downloadCourseGradesExcel);
module.exports = router;