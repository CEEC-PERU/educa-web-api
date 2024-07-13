// src/routes/superadmin/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../../controllers/superadmin/userController');
const uploadController = require('../../controllers/superadmin/uploadController');
const { getRoles, getUsersByRoleId, getCompanies, getUsersByCompanyAndRoleId, createIndividualUserController } = require('../../controllers/superadmin/userController');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', createIndividualUserController);

router.post('/', userController.createUser);
router.post('/import', upload.single('file'), uploadController.uploadUsers);
router.get('/enterprise/:enterpriseId', userController.getUsersByEnterprise);

router.get('/roles', getRoles);
router.get('/users/role/:roleId', getUsersByRoleId);
router.get('/companies', getCompanies);
router.get('/users/company/:companyId/role/:roleId', getUsersByCompanyAndRoleId);
router.get('/users/:userId', userController.getUserById);
router.put('/update/:userId', userController.updateUser);

module.exports = router;
