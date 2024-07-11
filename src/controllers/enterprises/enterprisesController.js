const enterpriseService = require('../../services/enterprise/enterprisesService');
const imageService = require('../../services/images/imageService');
const fs = require('fs');

exports.uploadEnterpriseImage = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageUrl = await imageService.uploadImage(imagePath, 'Enterprises');
    fs.unlinkSync(imagePath);
    res.status(201).json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
};

exports.createEnterprise = async (req, res) => {
  try {
    const { name, image_log, image_fondo } = req.body;
    let imageLogUrl = image_log;
    let imageFondoUrl = image_fondo;

    if (req.files) {
      if (req.files.image_log) {
        const imagePath = req.files.image_log[0].path;
        imageLogUrl = await imageService.uploadImage(imagePath, 'Enterprises/Logos');
        fs.unlinkSync(imagePath);
      }

      if (req.files.image_fondo) {
        const imagePath = req.files.image_fondo[0].path;
        imageFondoUrl = await imageService.uploadImage(imagePath, 'Enterprises/Fondos');
        fs.unlinkSync(imagePath);
      }
    }

    const newEnterprise = await enterpriseService.createEnterprise({
      name,
      image_log: imageLogUrl,
      image_fondo: imageFondoUrl,
    });

    res.status(201).json({
      message: "Enterprise created successfully",
      newEnterprise
    });
  } catch (error) {
    console.error('Error creating enterprise:', error);
    res.status(500).json({ error: 'Error creating enterprise' });
  }
};

exports.getAllEnterprises = async (req, res) => {
  try {
    const enterprises = await enterpriseService.getAllEnterprises();
    res.json(enterprises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEnterpriseById = async (req, res) => {
  try {
    const enterprise = await enterpriseService.getEnterpriseById(req.params.id);
    if (enterprise) {
      res.json(enterprise);
    } else {
      res.status(404).json({ error: 'Enterprise not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEnterprise = async (req, res) => {
  try {
    const { name, image_log, image_fondo } = req.body;
    let imageLogUrl = image_log;
    let imageFondoUrl = image_fondo;

    if (req.files) {
      if (req.files.image_log) {
        const imagePath = req.files.image_log[0].path;
        imageLogUrl = await imageService.uploadImage(imagePath, 'Enterprises/Logos');
        fs.unlinkSync(imagePath);
      }

      if (req.files.image_fondo) {
        const imagePath = req.files.image_fondo[0].path;
        imageFondoUrl = await imageService.uploadImage(imagePath, 'Enterprises/Fondos');
        fs.unlinkSync(imagePath);
      }
    }

    const updatedEnterprise = await enterpriseService.updateEnterprise(req.params.id, {
      name,
      image_log: imageLogUrl,
      image_fondo: imageFondoUrl,
    });

    if (updatedEnterprise) {
      res.json(updatedEnterprise);
    } else {
      res.status(404).json({ error: 'Enterprise not found' });
    }
  } catch (error) {
    console.error('Error updating enterprise:', error);
    res.status(500).json({ error: 'Error updating enterprise' });
  }
};

exports.deleteEnterprise = async (req, res) => {
  try {
    const deleted = await enterpriseService.deleteEnterprise(req.params.id);
    if (deleted) {
      res.json({ message: 'Enterprise deleted' });
    } else {
      res.status(404).json({ error: 'Enterprise not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
