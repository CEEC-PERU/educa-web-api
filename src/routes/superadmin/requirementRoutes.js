const express = require('express');
const router = express.Router();
const requirementController = require('../../controllers/superadmin/requirementController');

router.post('/', requirementController.createRequirement);
router.get('/', requirementController.getAllRequirements);
router.delete('/:id', requirementController.deleteRequirement);

module.exports = router;
