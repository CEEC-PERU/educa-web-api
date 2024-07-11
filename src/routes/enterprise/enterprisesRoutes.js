const express = require('express');
const router = express.Router();
const enterprisesController = require('../../controllers/enterprises/enterprisesController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/uploadImage', upload.fields([{ name: 'image_log' }, { name: 'image_fondo' }]), enterprisesController.uploadEnterpriseImage);
router.post('/', upload.fields([{ name: 'image_log' }, { name: 'image_fondo' }]), enterprisesController.createEnterprise);
router.get('/', enterprisesController.getAllEnterprises);
router.get('/:id', enterprisesController.getEnterpriseById);
router.put('/:id', upload.fields([{ name: 'image_log' }, { name: 'image_fondo' }]), enterprisesController.updateEnterprise);
router.delete('/:id', enterprisesController.deleteEnterprise);


module.exports = router;