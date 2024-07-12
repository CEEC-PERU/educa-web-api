const express = require('express');
const router = express.Router();
const requirementController = require('../../controllers/superadmin/requirementController');
const upload = require('./uploadMiddleware');

router.post('/', upload, requirementController.createRequirement);
router.get('/', requirementController.getAllRequirements);
router.put('/:id', requirementController.updateRequirement); // Ruta para actualizar
router.delete('/:id', requirementController.deleteRequirement);

module.exports = router;
