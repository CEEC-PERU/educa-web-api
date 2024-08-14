const express = require('express');
const { getStudentCount } = require('../../controllers/courses/metricasController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

const router = express.Router();

router.get('/corporate/:enterprise_id',authenticateToken, getStudentCount);

module.exports = router;
