const express = require('express');
const router = express.Router();
const professorController = require('../../controllers/courses/professorController');

router.get('/', professorController.getAllProfessors);

module.exports = router;
