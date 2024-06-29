const express = require('express');
const router = express.Router();
const enterpriseController = require('../../controllers/enterprises/enterprisesController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.post('/', authenticateToken, enterpriseController.create);
router.get('/', enterpriseController.getAll);
router.get('/:id', authenticateToken, enterpriseController.getById);
router.put('/:id', authenticateToken, enterpriseController.update);
router.delete('/:id', authenticateToken, enterpriseController.delete);

module.exports = router;