
const express = require('express');
const router = express.Router();
const classroomController = require('../../controllers/enterprises/classromController');

router.get('/', classroomController.getAllClassroom);
router.get('/', classroomController.createClassroom);



module.exports = router;