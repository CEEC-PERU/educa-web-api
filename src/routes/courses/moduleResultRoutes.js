const express = require('express');
const router = express.Router();
const ModuleResultController = require('../../controllers/courses/moduleResultController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.post('/',authenticateToken, ModuleResultController.create);
router.get('/', authenticateToken, ModuleResultController.getAll);
router.get('/:id',authenticateToken,  ModuleResultController.getById);
router.put('/:id',authenticateToken,  ModuleResultController.update);
router.delete('/:id', authenticateToken, ModuleResultController.delete);
// New routes for filtering
router.get('/module/:module_id',authenticateToken, ModuleResultController.getByModuleId);
router.get('/user/:user_id',authenticateToken,  ModuleResultController.getByUserId);




module.exports = router;





