const express = require('express');
const router = express.Router();
const moduleController = require('../../controllers/courses/moduleController');

router.get('/', moduleController.getAllModules);
router.get('/:id', moduleController.getModuleById);
router.post('/', moduleController.createModule);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);
router.put('/:moduleId/status', moduleController.updateModuleStatus);


module.exports = router;
