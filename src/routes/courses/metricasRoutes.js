const express = require('express');
const { getStudentCount } = require('../../controllers/courses/metricasController');

const router = express.Router();

router.get('/corporate/:enterprise_id', getStudentCount);

module.exports = router;
