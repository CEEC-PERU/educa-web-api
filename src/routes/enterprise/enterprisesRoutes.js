const express = require('express');
const router = express.Router();
const enterpriseController = require('../../controllers/enterprises/enterprisesController');


router.post('/', enterpriseController.create);
router.get('/', enterpriseController.getAll);
router.get('/:id', enterpriseController.getById);
router.put('/:id', enterpriseController.update);
router.delete('/:id', enterpriseController.delete);


module.exports = router;